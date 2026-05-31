"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { useUiStore } from "../../store/useUiStore";
import { useOrderStore } from "../../store/useOrderStore";
import { useSearchEngine } from "../../hooks/useSearchEngine";
import { cn } from "../../lib/utils";

export const Topbar = () => {
  const { sidebarOpen, setSidebarOpen, isSearchActive, toggleSearch } = useUiStore();
  const { orders, setSelectedOrderId } = useOrderStore();
  
  const [localQuery, setLocalQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounced search logic
  const { filteredResults, isSearching } = useSearchEngine(
    localQuery,
    orders,
    ["buyerName", "orderId", "garmentType", "stage"]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Standard shortcut trigger: Command+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSearch();
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
      
      // Escape key to dismiss search overlays
      if (e.key === "Escape") {
        toggleSearch(false);
        setLocalQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSearch]);

  const handleResultClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    toggleSearch(false);
    setLocalQuery("");
  };

  return (
    <header
      id="stitchhub-header"
      className="h-16 border-b border-neutral-200 bg-white flex items-center justify-between px-6 sticky top-0 z-30"
    >
      {/* Left section: mobile hamburger & page title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 rounded-md text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 lg:hidden focus:ring-2 focus:ring-primary-200"
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="w-6 h-6 stroke-[1.75]" />
        </button>
        <div>
          <span className="text-[10px] font-bold text-primary-500 uppercase tracking-widest leading-none">
            PRODUCTION SYSTEM
          </span>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 font-display leading-none mt-0.5">
            Operational Dashboard
          </h1>
        </div>
      </div>

      {/* Center section: global command search */}
      <div className="hidden md:block relative w-[400px]">
        <div className="relative">
          <Search className="w-4 h-4 stroke-[1.75] text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value);
              if (!isSearchActive) toggleSearch(true);
            }}
            onFocus={() => toggleSearch(true)}
            placeholder="Search deals, accounts, stage..."
            className="w-full pl-9 pr-16 py-2 text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white border border-neutral-200 focus:border-primary-300 rounded-md focus:outline-none focus:ring-4 focus:ring-primary-50 transition-all font-body text-neutral-900 placeholder:text-neutral-400"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-5 select-none items-center gap-0.5 rounded border border-neutral-200 bg-white px-1.5 font-mono text-[9px] font-medium text-neutral-400">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        {/* Global Search command dropdown palette */}
        {isSearchActive && localQuery.trim() !== "" && (
          <div className="absolute top-[48px] left-0 right-0 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-[320px] overflow-y-auto z-50 animate-fade-in-up">
            <div className="px-4 py-2 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                Search Results ({filteredResults.length})
              </span>
              <span className="text-[9px] text-neutral-400">ESC to close</span>
            </div>

            {filteredResults.length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-neutral-400">
                No orders match your search criteria.
              </div>
            ) : (
              <ul className="py-1">
                {filteredResults.map((order) => (
                  <li key={order.orderId}>
                    <button
                      onClick={() => handleResultClick(order.orderId)}
                      className="w-full text-left px-4 py-2.5 hover:bg-primary-50/50 flex items-center justify-between border-b border-neutral-50 last:border-b-0"
                    >
                      <div>
                        <p className="text-sm font-semibold text-neutral-900 leading-none">
                          {order.buyerName}
                        </p>
                        <p className="text-[11px] text-neutral-400 font-medium mt-1 leading-none">
                          {order.orderId} • {order.garmentType} run
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-primary-600">
                          ${order.totalValue.toLocaleString()}
                        </p>
                        <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-neutral-400 mt-1">
                          {order.stage}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Right section: notification and user avatar */}
      <div className="flex items-center gap-4">
        {/* Alerts Bell Button */}
        <button
          className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 rounded-full relative focus:ring-2 focus:ring-primary-200 select-none"
          aria-label="View notifications list"
        >
          <Bell className="w-5 h-5 stroke-[1.75]" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary-500 rounded-full ring-2 ring-white animate-pulse" />
        </button>

        <div className="w-[1px] h-6 bg-neutral-200 hidden sm:block" />

        {/* User Card Layout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-neutral-900 leading-none">Mijan Rahaman</p>
            <p className="text-[10px] text-neutral-400 font-medium leading-none mt-0.5">
              Project Holder
            </p>
          </div>
          {/* Avatar Profile Frame */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-300 ring-2 ring-primary-100 flex-shrink-0">
            <img
              src="/avatar.png"
              alt="Mijan Rahaman Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Safe fallback in case images fail to load
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
