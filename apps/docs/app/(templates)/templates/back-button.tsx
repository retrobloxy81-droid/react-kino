"use client";

import Link from "next/link";

export function BackButton() {
  return (
    <Link
      href="/templates"
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        zIndex: 9999,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 14px",
        fontSize: "0.8rem",
        fontWeight: 500,
        color: "rgba(255, 255, 255, 0.8)",
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 8,
        textDecoration: "none",
        transition: "background 150ms ease, border-color 150ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(0, 0, 0, 0.5)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
      }}
    >
      &larr; Templates
    </Link>
  );
}
