"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 24,
      fontFamily: "'Barlow', sans-serif",
      color: "#fff",
      textAlign: "center",
      padding: 20
    }}>
      <div style={{
        width: 64,
        height: 64,
        background: "rgba(239,68,68,.1)",
        border: "1px solid rgba(239,68,68,.2)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ef4444",
        fontSize: 32,
        marginBottom: 8
      }}>
        !
      </div>
      
      <div style={{ maxWidth: 400 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Something went wrong!</h2>
        <p style={{ color: "rgba(255,255,255,.6)", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          An unexpected error has occurred. We've been notified and are looking into it.
        </p>
        
        <button onClick={() => reset()} style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "var(--y, #F5A623)",
          color: "#000",
          padding: "14px 32px",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: 2,
          textTransform: "uppercase",
          border: "none",
          cursor: "pointer",
          clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
          transition: "all .3s ease"
        }}>
          Try again
        </button>
      </div>
    </div>
  );
}
