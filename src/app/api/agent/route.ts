import { NextResponse } from "next/server";
import { auth } from "@/authentication/auth";
import { db } from "@/db";
import { emailLogs, invoices } from "@/db/schema";

export const POST = auth(async function POST(req) {
  if (!req.auth || !req.auth.user || !req.auth.user.id) {
    return NextResponse.json({ error: "Unauthorized access blocked." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { cart, message, toEmail, subject } = body;

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "Cannot initialize sourcing matrix with an empty cart." }, { status: 400 });
    }

    const currentUserId = req.auth.user.id;

    // Build context layout containing items snapshot data for Qwen to evaluate
    const userContextPrompt = `
      Customer Identity: ${req.auth.user.name}
      Sourcing Email Context Target: ${toEmail}
      Subject Title Line: ${subject}
      
      CART REQUISITION MANIFEST:
      ${JSON.stringify(cart, null, 2)}
      
      CUSTOMER ARTWORK/TIMELINE CONSTRAINTS:
      "${message || "No specific instructions declared."}"
    `;

    // 🧠 REQUEST INFERENCE FROM THE NEW CUSTOM LOCAL OLLAMA AGENT
    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "stitchhub-agent", // 🎯 Connected directly to your compiled Modelfile!
        prompt: userContextPrompt,
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      throw new Error("Local custom Ollama inference agent failed to respond.");
    }

    const ollamaData = await ollamaResponse.json();
    const generatedAiResponse = ollamaData.response;

    // 🔍 AUTOMATED ESCALATION TRAP DETECTION
    // If Qwen outputs the <action>PAUSE</action> tag based on your rules, flags it automatically
    let logStatus = "drafted";
    if (generatedAiResponse.includes("<action>PAUSE</action>") || generatedAiResponse.includes("escalate_to_admin")) {
      logStatus = "escalated";
    }

    // 💾 ATOMIC PERSISTENCE LAYER via DRIZZLE ORM
    const randomSerial = Math.floor(1000 + Math.random() * 9000);
    const generatedInvoiceNumber = `INV-2026-${randomSerial}`;

    // A. Insert data record into email logs with the tracking status
    await db.insert(emailLogs).values({
      userId: currentUserId,
      subject: subject || "Bulk Apparel Production Inquiry",
      body: message || "",
      status: logStatus, // Logs automatically as 'drafted' or 'escalated'
      aiResponseDraft: generatedAiResponse,
      metadata: { recipientEmail: toEmail, itemCount: cart.length },
    });

    // B. Insert corresponding invoice snapshot
    await db.insert(invoices).values({
      userId: currentUserId,
      invoiceNumber: generatedInvoiceNumber,
      totalAmount: "Pending Dynamic Quote Lock",
      status: "unpaid",
      itemsSnapshot: cart,
    });

    return NextResponse.json({ 
      success: true, 
      generatedMessage: generatedAiResponse,
      status: logStatus
    });

  } catch (error) {
    console.error("Critical core failure:", error);
    return NextResponse.json({ error: "Internal agent reasoning breakdown." }, { status: 500 });
  }
});