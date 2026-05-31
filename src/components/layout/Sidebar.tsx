"use client";

import React from "react";
import {
  LayoutGrid,
  GitPullRequest,
  Building2,
  Sparkles,
  Layers,
  CheckSquare,
  MessageCircle,
  Settings,
  ShieldCheck,
  X
} from "lucide-react";
import { useUiStore } from "../../store/useUiStore";
import { cn } from "../../lib/utils";

export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, activeMenuId, setActiveMenuId } = useUiStore();

  const mainNavItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "pipeline", label: "My Pipeline", icon: GitPullRequest },
    { id: "accounts", label: "Accounts", icon: Building2 },
    { id: "coach", label: "AI Coach", icon: Sparkles },
    { id: "outreach", label: "Outreach", icon: Layers },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "messages", label: "Messages", icon: MessageCircle }
  ];

  const generalNavItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "security", label: "Security", icon: ShieldCheck }
  ];

  const handleMenuClick = (id: string) => {
    setActiveMenuId(id);
    setSidebarOpen(false); // Close on mobile navigation selection
  };

  const renderNavList = (items: typeof mainNavItems) => (
    <ul className="space-y-1 mt-2">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeMenuId === item.id;
        return (
          <li key={item.id}>
            <button
              onClick={() => handleMenuClick(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-140 select-none relative group",
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
              )}
            >
              {/* Active left side purple indicator line */}
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-primary-500 rounded-r-md" />
              )}
              <Icon
                className={cn(
                  "w-5 h-5 stroke-[1.75] transition-colors",
                  isActive ? "text-primary-500" : "text-neutral-400 group-hover:text-neutral-600"
                )}
              />
              <span>{item.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-neutral-900/30 backdrop-blur-xs z-40 lg:hidden transition-all"
        />
      )}

      {/* Main Sidebar Shell */}
      <aside
        id="stitchhub-sidebar"
        aria-label="Primary Navigation"
        className={cn(
          "fixed top-0 bottom-0 left-0 w-[260px] bg-white border-r border-neutral-200 z-50 transition-transform duration-260 ease-smooth lg:static lg:translate-x-0 flex flex-col h-screen",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header Branding */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white font-black text-lg tracking-tighter">
              S
            </div>
            <span className="text-xl font-extrabold tracking-tight text-neutral-900 font-display">
              StitchHub
            </span>
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md text-neutral-400 hover:bg-neutral-50 hover:text-neutral-700 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          <div>
            <span className="px-4 text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">
              MAIN MENU
            </span>
            {renderNavList(mainNavItems)}
          </div>

          <div>
            <span className="px-4 text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">
              GENERAL
            </span>
            {renderNavList(generalNavItems)}
          </div>
        </div>

        {/* Footer Credit Widget */}
        <div className="p-4 border-t border-neutral-100 flex-shrink-0 bg-neutral-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs">
              M
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-900 leading-tight">Mijan Rahaman</p>
              <p className="text-[10px] text-neutral-400 font-medium leading-none mt-0.5">
                Project Holder
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
