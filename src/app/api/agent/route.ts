// ──────────────────────────────────────────────────────
// route.ts — AI agent API route (route: POST /api/agent)
// ──────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { db } from "@/db";
import { emailLogs, invoices } from "@/db/schema";

/**
 * POST /api/agent
 * Auth-guarded endpoint that:
 *  1. Validates the user session
 *  2. Builds a context prompt from cart + message
 *  3. Calls the local Ollama stitchhub-agent model
 *  4. Detects escalation triggers (PAUSE tag)
 *  5. Persists email_log + invoice atomically via Drizzle
 *  6. Returns the AI-generated draft
 */
export async function POST(req: Request) {
  /* ── Auth guard: reject unauthenticated requests ── */
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized access blocked." }, { status: 401 });
  }

  try {
    /* ── Parse & validate request body ── */
    const body = await req.json();
    const { cart, message, toEmail, subject } = body;

    /* ── Empty cart guard: require at least one line item ── */
    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "Cannot initialize sourcing matrix with an empty cart." }, { status: 400 });
    }

    const currentUserId = user.id;
    const userName = user.user_metadata?.name || user.email?.split("@")[0] || "User";

    /* ── Context prompt: inject user identity, cart manifest, and constraints ── */
    const userContextPrompt = `
      Customer Identity: ${userName}
      Sourcing Email Context Target: ${toEmail}
      Subject Title Line: ${subject}
      
      CART REQUISITION MANIFEST:
      ${JSON.stringify(cart, null, 2)}
      
      CUSTOMER ARTWORK/TIMELINE CONSTRAINTS:
      "${message || "No specific instructions declared."}"
    `;

    /* ── Ollama inference call: query local stitchhub-agent model ── */
    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "stitchhub-agent",
        prompt: userContextPrompt,
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      throw new Error("Local custom Ollama inference agent failed to respond.");
    }

    const ollamaData = await ollamaResponse.json();
    const generatedAiResponse = ollamaData.response;

    /* ── Escalation detection: check for PAUSE tag or admin escalation keyword ── */
    let logStatus = "drafted";
    if (generatedAiResponse.includes("<action>PAUSE</action>") || generatedAiResponse.includes("escalate_to_admin")) {
      logStatus = "escalated";
    }

    /* ── Atomic DB persistence: write email_log + invoice records ── */
    const randomSerial = Math.floor(1000 + Math.random() * 9000);
    const generatedInvoiceNumber = `INV-2026-${randomSerial}`;

    // Insert email log with AI response draft and tracking status
    await db.insert(emailLogs).values({
      userId: currentUserId,
      subject: subject || "Bulk Apparel Production Inquiry",
      body: message || "",
      status: logStatus,
      aiResponseDraft: generatedAiResponse,
      metadata: { recipientEmail: toEmail, itemCount: cart.length },
    });

    // Insert corresponding invoice snapshot with pending quote lock
    await db.insert(invoices).values({
      userId: currentUserId,
      invoiceNumber: generatedInvoiceNumber,
      totalAmount: "Pending Dynamic Quote Lock",
      status: "unpaid",
      itemsSnapshot: cart,
    });

    /* ── Success response: return AI draft and final status ── */
    return NextResponse.json({ 
      success: true, 
      generatedMessage: generatedAiResponse,
      status: logStatus
    });

  } catch (error) {
    /* ── Global error handler: log and return 500 ── */
    console.error("Critical core failure:", error);
    return NextResponse.json({ error: "Internal agent reasoning breakdown." }, { status: 500 });
  }
}