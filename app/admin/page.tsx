"use client";
// app/admin/page.tsx — Admin Dashboard page
// Protected admin panel for Sri Balaji Earth Movers

import dynamic from "next/dynamic";

const AdminDashboard = dynamic(
  () => import("@/components/AdminDashboard"),
  { ssr: false, loading: () => <AdminLoader /> }
);

function AdminLoader() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      color: "#F5A623",
      fontFamily: "'Inter', sans-serif",
      fontSize: 14,
    }}>
      <div style={{
        width: 20, height: 20,
        border: "2px solid rgba(245,166,35,.2)",
        borderTop: "2px solid #F5A623",
        borderRadius: "50%",
        animation: "spin .7s linear infinite",
      }}/>
      Loading Admin Panel...
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

export default function AdminPage() {
  return <AdminDashboard />;
}
