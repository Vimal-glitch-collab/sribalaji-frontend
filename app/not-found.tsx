"use client";

import Link from "next/link";

export default function NotFound() {
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
      <h1 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(60px, 10vw, 120px)",
        lineHeight: 1,
        color: "var(--y, #F5A623)",
        letterSpacing: 2
      }}>404</h1>
      
      <div style={{ maxWidth: 400 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Page Not Found</h2>
        <p style={{ color: "rgba(255,255,255,.6)", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link href="/" style={{
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
          textDecoration: "none",
          clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
          transition: "all .3s ease"
        }}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
