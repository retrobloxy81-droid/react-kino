import { useState } from "react";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install react-kino").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer
      style={{
        padding: "120px 24px 60px",
        textAlign: "center",
        borderTop: "1px solid #1a1a1a",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(32px, 4vw, 56px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
          marginBottom: "12px",
        }}
      >
        react-kino
      </h2>
      <p
        style={{
          fontSize: "18px",
          color: "#888888",
          lineHeight: 1.7,
          marginBottom: "40px",
        }}
      >
        Cinematic scroll-driven storytelling for React.
      </p>

      <button
        onClick={handleCopy}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          background: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          padding: "16px 24px",
          cursor: "pointer",
          transition: "border-color 0.2s ease",
          marginBottom: "32px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#7c3aed";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#2a2a2a";
        }}
      >
        <code
          style={{
            fontSize: "15px",
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            color: "#ffffff",
          }}
        >
          npm install react-kino
        </code>
        <span style={{ fontSize: "13px", color: "#555555" }}>
          {copied ? "Copied!" : "Click to copy"}
        </span>
      </button>

      <div style={{ marginBottom: "40px" }}>
        <a
          href="https://github.com/bilaltahir/react-kino"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "15px",
            color: "#7c3aed",
            borderBottom: "1px solid transparent",
            transition: "border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#7c3aed";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          GitHub
        </a>
      </div>

      <p style={{ fontSize: "13px", color: "#333333" }}>
        Built with react-kino
      </p>
    </footer>
  );
}
