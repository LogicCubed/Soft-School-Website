"use client";

import React from "react";

export const ElectronHeader: React.FC = () => {
  if (typeof window === "undefined" || !(window as any).electronAPI) return null;

  const handleMinimize = () => (window as any).electronAPI?.minimize?.();
  const handleMaximize = () => (window as any).electronAPI?.maximize?.();
  const handleClose = () => (window as any).electronAPI?.close?.();

  const buttonBase: React.CSSProperties = {
    width: "36px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: 700,
    border: "none",
    background: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  };

  return (
    <div
      style={{
        width: "100%",
        height: "32px",
        backgroundColor: "#38BDF8",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        WebkitAppRegion: "drag",
        position: "sticky",
        top: 0,
        flexShrink: 0,
        zIndex: 50,
      } as any}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          WebkitAppRegion: "no-drag",
        } as any}
      >
        <button
          onClick={handleMinimize}
          style={buttonBase}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          —
        </button>
        <button
          onClick={handleMaximize}
          style={buttonBase}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          ☐
        </button>
        <button
          onClick={handleClose}
          style={buttonBase}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          ✕
        </button>
      </div>
    </div>
  );
};