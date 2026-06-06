"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface EmailLog {
  id: string;
  subject: string;
  body: string;
  status: string;
  aiResponseDraft: string;
  createdAt: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  totalAmount: string;
  status: string;
  createdAt: string;
}

type ActiveTab = "inbox" | "account" | "security" | "ledger";

export default function PartnerDashboardPage() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<ActiveTab>("inbox");
  const [user, setUser] = useState<any>(null);
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedLog, setSelectedLog] = useState<EmailLog | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states for profile alterations
  const [profileName, setProfileName] = useState("");
  const [routingEmail, setRoutingEmail] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);

  useEffect(() => {
    async function fetchPlatformData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUser(user);
      
      setProfileName(user.user_metadata?.name || user.email?.split("@")[0] || "User");
      setRoutingEmail(user.email || "");

      try {
        const messageRes = await fetch("/api/agent/history");
        if (messageRes.ok) {
          const messageData = await messageRes.json();
          setLogs(messageData.logs || []);
          if (messageData.logs && messageData.logs.length > 0) {
            setSelectedLog(messageData.logs[0]);
          }
        }
      } catch (e) {
        console.error("Message log syncing error:", e);
      }

      // Simulated financial ledger data rows
      setInvoices([
        { id: "1", invoiceNumber: "INV-2026-4821", totalAmount: "$1,799.10", status: "paid", createdAt: "2026-06-01" },
        { id: "2", invoiceNumber: "INV-2026-9104", totalAmount: "$8,500.00", status: "unpaid", createdAt: "2026-06-05" }
      ]);

      setLoading(false);
    }
    fetchPlatformData();
  }, [supabase]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    const { error } = await supabase.auth.updateUser({
      data: { name: profileName }
    });
    if (error) alert(`Update Error: ${error.message}`);
    else alert("Profile updated successfully!");
    setIsUpdatingProfile(false);
  };

  // 🧠 Helper Function to Parse JSON from the Database cleanly
  const renderParsedAiResponse = (draftText: string, status: string) => {
    let rawText = draftText.replace("<action>PAUSE</action>", "").trim();
    let parsedData = null;

    try {
      parsedData = JSON.parse(rawText);
    } catch (e) {
      // If it fails to parse, it means it's just plain text. We handle that below.
    }

    if (parsedData) {
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#090a0f] p-3 rounded-lg border border-zinc-800">
              <span className="text-zinc-500 block uppercase tracking-wider text-[9px] font-bold mb-1">Target Product</span>
              <span className="text-zinc-200 font-medium">{parsedData.product || "N/A"}</span>
            </div>
            <div className="bg-[#090a0f] p-3 rounded-lg border border-zinc-800">
              <span className="text-zinc-500 block uppercase tracking-wider text-[9px] font-bold mb-1">Scenario Evaluation</span>
              <span className="text-zinc-200 font-medium truncate block">{parsedData.scenario_type || "Standard Parsing"}</span>
            </div>
          </div>
          <div className={`p-4 rounded-lg border ${status === "escalated" ? "bg-red-500/5 border-red-500/20" : "bg-[#090a0f] border-zinc-800"}`}>
            <span className="text-zinc-500 block uppercase tracking-wider text-[9px] font-bold mb-2">Agent Response</span>
            <p className={`text-xs leading-relaxed whitespace-pre-wrap ${status === "escalated" ? "text-red-200/90 font-mono" : "text-zinc-300"}`}>
              {parsedData.ai_response || rawText}
            </p>
          </div>
        </div>
      );
    }

    // Fallback if the AI just generated a plain text response instead of JSON
    return (
      <p className={`text-xs leading-relaxed whitespace-pre-wrap ${status === "escalated" ? "text-red-200/90 font-mono" : "text-zinc-300"}`}>
        {rawText}
      </p>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#090a0f] flex items-center justify-center text-zinc-400 font-mono text-xs">
        <span className="h-4 w-4 rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin mr-3" />
        Loading Profile...
      </div>
    );
  }

  const hasEscalations = logs.some(log => log.status === "escalated");

  return (
    // 🎯 FIXED: Changed to w-full to stretch the dark background edge-to-edge and remove white borders
    <div className="min-h-screen w-full bg-[#090a0f] text-zinc-100 pt-28 pb-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="border-b border-zinc-800/80 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display tracking-tight text-white">Partner Workspace</h1>
            <p className="text-xs text-zinc-500 mt-1">Manage your account, view order history, and track messages.</p>
          </div>
          <div className="flex items-center gap-3 bg-[#121316] border border-zinc-800/80 rounded-xl px-4 py-2.5 shrink-0 self-start md:self-auto">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <div className="font-mono text-[11px]">
              <span className="text-zinc-500">Account ID:</span> <span className="text-zinc-300 font-bold">{user?.id.slice(0, 8)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT NAVIGATION TABS */}
          <div className="lg:col-span-3 flex flex-col space-y-2">
            <button onClick={() => setActiveTab("inbox")} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border font-medium text-xs transition-all ${activeTab === "inbox" ? "bg-[#121316] text-white border-zinc-700 shadow-xl" : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/40"}`}>
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                <span>My Inbox</span>
              </div>
              {hasEscalations && <span className="h-2 w-2 rounded-full bg-red-500 ring-4 ring-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-pulse" />}
            </button>

            <button onClick={() => setActiveTab("account")} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border font-medium text-xs transition-all ${activeTab === "account" ? "bg-[#121316] text-white border-zinc-700 shadow-xl" : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/40"}`}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <span>Profile Settings</span>
            </button>

            <button onClick={() => setActiveTab("security")} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border font-medium text-xs transition-all ${activeTab === "security" ? "bg-[#121316] text-white border-zinc-700 shadow-xl" : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/40"}`}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <span>Security & 2FA</span>
            </button>

            <button onClick={() => setActiveTab("ledger")} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border font-medium text-xs transition-all ${activeTab === "ledger" ? "bg-[#121316] text-white border-zinc-700 shadow-xl" : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/40"}`}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 00-2 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              <span>Order History</span>
            </button>
          </div>

          {/* RIGHT WORKSPACE */}
          <div className="lg:col-span-9 bg-[#121316] border border-zinc-800 rounded-2xl p-6 min-h-[60vh] shadow-2xl relative overflow-hidden">
            
            {/* TAB 1: MY INBOX */}
            {activeTab === "inbox" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full animate-fadeIn">
                <div className="md:col-span-5 border-r border-zinc-800/60 pr-2 space-y-3 max-h-[55vh] overflow-y-auto">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Message Threads</h3>
                  {logs.length === 0 ? (
                    <div className="text-xs text-zinc-600 font-mono text-center py-12">No messages yet.</div>
                  ) : (
                    logs.map((log) => {
                      const isEsc = log.status === "escalated";
                      const isSelected = selectedLog?.id === log.id;
                      return (
                        <div key={log.id} onClick={() => setSelectedLog(log)} className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden ${isSelected ? "bg-[#090a0f] border-[#d4af37] shadow-xl" : "bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700"}`}>
                          <div className="flex justify-between items-start gap-2">
                            <p className={`text-xs font-bold truncate max-w-37.5 ${isSelected ? "text-white" : "text-zinc-300"}`}>{log.subject}</p>
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider font-mono ${isEsc ? "bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse" : "bg-zinc-800 text-zinc-400"}`}>
                              {isEsc ? "Review Required" : "Draft Ready"}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 truncate mt-1.5">{log.body || "No message body provided."}</p>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="md:col-span-7 flex flex-col h-full max-h-[55vh] overflow-y-auto">
                  {selectedLog ? (
                    <div className="space-y-5">
                      <div className="border-b border-zinc-800 pb-3">
                        <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-wider">Subject</span>
                        <h2 className="text-sm font-bold text-white mt-0.5 leading-snug">{selectedLog.subject}</h2>
                      </div>
                      
                      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 text-xs space-y-1">
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Your Message</span>
                        <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">{selectedLog.body || "Empty request."}</p>
                      </div>

                      {/* 🎯 FIXED: This now properly renders the parsed JSON instead of raw ugly code */}
                      <div className={`p-4 rounded-xl border shadow-xl relative overflow-hidden ${selectedLog.status === "escalated" ? "bg-red-950/10 border-red-900/40" : "bg-zinc-900/30 border-zinc-800/80"}`}>
                        <div className="flex items-center gap-2 mb-3 relative z-10">
                          <div className={`h-1.5 w-1.5 rounded-full ${selectedLog.status === "escalated" ? "bg-red-500 animate-pulse" : "bg-[#d4af37]"}`} />
                          <span className="text-[9px] font-bold text-white uppercase tracking-wider">StitchHub Response</span>
                        </div>
                        {renderParsedAiResponse(selectedLog.aiResponseDraft, selectedLog.status)}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-xs text-zinc-600 font-mono py-24">
                      Select a message to view details.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: PROFILE SETTINGS */}
            {activeTab === "account" && (
              <form onSubmit={handleUpdateProfile} className="max-w-md space-y-5 animate-fadeIn">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Profile Settings</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Update your personal information and contact details.</p>
                </div>
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full bg-[#090a0f] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:border-[#d4af37] focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input type="email" disabled value={routingEmail} className="w-full bg-[#090a0f]/40 border border-zinc-800/60 rounded-xl px-4 py-3 text-xs text-zinc-500 cursor-not-allowed" />
                  </div>
                </div>
                <button type="submit" disabled={isUpdatingProfile} className="bg-[#d4af37] text-[#090a0f] text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-[#bfa032] transition-colors font-mono disabled:opacity-50">
                  {isUpdatingProfile ? "Saving..." : "Save Changes"}
                </button>
              </form>
            )}

            {/* TAB 3: SECURITY & 2FA */}
            {activeTab === "security" && (
              <div className="space-y-6 max-w-xl animate-fadeIn">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Security & 2FA</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Keep your account secure with Two-Factor Authentication.</p>
                </div>
                <div className="bg-[#090a0f] border border-zinc-800 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white">Two-Factor Authentication</h4>
                    <p className="text-[11px] text-zinc-500 leading-normal">Require an extra security code when logging in.</p>
                  </div>
                  <button type="button" onClick={() => setMfaEnabled(!mfaEnabled)} className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${mfaEnabled ? "bg-[#d4af37]" : "bg-zinc-800"}`}>
                    <div className={`w-4 h-4 rounded-full bg-[#090a0f] shadow-md transform transition-transform duration-300 ${mfaEnabled ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: ORDER HISTORY */}
            {activeTab === "ledger" && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Order History</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">View your past orders, invoices, and payment statuses.</p>
                </div>
                <div className="border border-zinc-800 rounded-xl overflow-hidden mt-4">
                  <table className="w-full text-left font-body text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#090a0f] text-zinc-500 uppercase font-mono text-[10px] tracking-wider border-b border-zinc-800">
                        <th className="p-4 font-bold">Invoice #</th>
                        <th className="p-4 font-bold">Date</th>
                        <th className="p-4 font-bold">Amount</th>
                        <th className="p-4 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-zinc-900/30 transition-colors">
                          <td className="p-4 font-mono font-bold text-white">{inv.invoiceNumber}</td>
                          <td className="p-4 text-zinc-400">{inv.createdAt}</td>
                          <td className="p-4 font-mono font-semibold text-[#d4af37]">{inv.totalAmount}</td>
                          <td className="p-4">
                            <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-md uppercase font-mono border ${inv.status === "paid" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                              {inv.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}