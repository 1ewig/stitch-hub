"use client";

import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { cn } from "../../lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div id="stitchhub-root" className="flex h-screen w-screen overflow-hidden bg-neutral-50 font-body">
      {/* Sidebar Navigation Panel */}
      <Sidebar />

      {/* Main content wrapper */}
      <div id="main-content-wrapper" className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
        {/* Top Header Panel */}
        <Topbar />

        {/* Dashboard Main Workspace Area */}
        <main
          id="stitchhub-main-grid"
          className="flex-1 overflow-y-auto px-6 py-6 space-y-6 focus:outline-none"
          tabIndex={0}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
