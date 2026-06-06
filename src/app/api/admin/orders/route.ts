import { NextResponse } from "next/server";
import { db } from "@/db";
import { invoices, users } from "@/db/schema";
import { createClient } from "@/utils/supabase/server";
import { eq, desc } from "drizzle-orm";
import { isAdmin } from "@/utils/admin";

/**
 * GET /api/admin/orders
 * Admin-only route to retrieve all invoices/orders joined with user profiles.
 */
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized access blocked." }, { status: 401 });
  }

  try {
    if (!isAdmin(user.email)) {
      return NextResponse.json({ error: "Forbidden. Admin access required." }, { status: 403 });
    }

    // Query invoices joined with users
    const orders = await db
      .select({
        id: invoices.id,
        invoiceNumber: invoices.invoiceNumber,
        totalAmount: invoices.totalAmount,
        status: invoices.status,
        itemsSnapshot: invoices.itemsSnapshot,
        createdAt: invoices.createdAt,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image,
        },
      })
      .from(invoices)
      .leftJoin(users, eq(invoices.userId, users.id))
      .orderBy(desc(invoices.createdAt));

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Failed to fetch admin orders:", error);
    return NextResponse.json({ error: "Failed to load orders." }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/orders
 * Admin-only route to update status or totalAmount of an order/invoice.
 */
export async function PATCH(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized access blocked." }, { status: 401 });
  }

  try {
    if (!isAdmin(user.email)) {
      return NextResponse.json({ error: "Forbidden. Admin access required." }, { status: 403 });
    }

    const body = await req.json();
    const { id, status, totalAmount } = body;

    if (!id) {
      return NextResponse.json({ error: "Order ID is required." }, { status: 400 });
    }

    const updateData: Partial<typeof invoices.$inferInsert> = {};
    if (status !== undefined) updateData.status = status;
    if (totalAmount !== undefined) updateData.totalAmount = totalAmount;

    await db
      .update(invoices)
      .set(updateData)
      .where(eq(invoices.id, id));

    return NextResponse.json({ success: true, message: "Order updated successfully." });
  } catch (error) {
    console.error("Failed to update admin order:", error);
    return NextResponse.json({ error: "Failed to update order details." }, { status: 500 });
  }
}
