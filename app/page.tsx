"use client";
// app/page.tsx — Main website page
// This is the entry point for the Sri Balaji Earth Movers website.
// The full single-page website is in website.jsx (artifact) — for production,
// copy the component code from website.jsx into this file or import it.

import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with browser APIs (IntersectionObserver etc.)
const SriBalajiWebsite = dynamic(
  () => import("@/components/SriBalajiWebsite"),
  { ssr: false, loading: () => <PageLoader /> }
);

function PageLoader() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 16,
    }}>
      <div style={{
        width: 54,
        height: 54,
        background: "#F5A623",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        clipPath: "polygon(0 0,calc(100% - 9px) 0,100% 9px,100% 100%,9px 100%,0 calc(100% - 9px))",
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M2 18L6 8l5 5 5-7 6 9" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 22h20" stroke="#000" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{
        width: 32,
        height: 32,
        border: "3px solid rgba(245,166,35,.2)",
        borderTop: "3px solid #F5A623",
        borderRadius: "50%",
        animation: "spin .7s linear infinite",
      }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

export default function HomePage() {
  return <SriBalajiWebsite />;
}
