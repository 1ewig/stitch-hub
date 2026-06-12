"use client";

import React from "react";
import type { EscalationLog } from "@/types";

interface InboxPanelProps {
  logs: EscalationLog[];
  selectedLog: EscalationLog | null;
  onSelectLog: (log: EscalationLog | null) => void;
}

function renderParsedAiResponse(draftText: string, status: string) {
  const rawText = draftText.replace("<action>PAUSE</action>", "").trim();
  let parsedData: Record<string, string> | null = null;

  try {
    parsedData = JSON.parse(rawText);
  } catch {
    // plain text fallback
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

  return (
    <p className={`text-xs leading-relaxed whitespace-pre-wrap ${status === "escalated" ? "text-red-200/90 font-mono" : "text-zinc-300"}`}>
      {rawText}
    </p>
  );
}

export default function InboxPanel({ logs, selectedLog, onSelectLog }: InboxPanelProps) {
  return (
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
              <div
                key={log.id}
                onClick={() => onSelectLog(log)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden ${
                  isSelected
                    ? "bg-[#090a0f] border-[#d4af37] shadow-xl"
                    : "bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <p className={`text-xs font-bold truncate max-w-37.5 ${isSelected ? "text-white" : "text-zinc-300"}`}>{log.subject}</p>
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider font-mono ${
                    isEsc
                      ? "bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse"
                      : "bg-zinc-800 text-zinc-400"
                  }`}>
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

            <div className={`p-4 rounded-xl border shadow-xl relative overflow-hidden ${
              selectedLog.status === "escalated"
                ? "bg-red-950/10 border-red-900/40"
                : "bg-zinc-900/30 border-zinc-800/80"
            }`}>
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
  );
}
