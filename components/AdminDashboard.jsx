/**
 * Sri Balaji Earth Movers — Admin Dashboard
 * Secure admin panel with full CRUD for all website content
 * Sections: Login · Dashboard · Inquiries · Gallery · Reviews · Services · Settings
 */

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/lib/api";
import {
  LayoutDashboard, MessageSquare, Image, Star, Wrench, Settings,
  LogOut, Menu, X, Eye, Trash2, Edit3, Plus, Check, ChevronDown,
  Phone, Upload, Save, AlertTriangle, TrendingUp, Users,
  RefreshCw, Search, Filter, Bell, Lock, User, Globe,
  Clock, MapPin, Mail, Link, ChevronRight, BarChart2,
  CheckCircle, XCircle, ArrowUp, ArrowDown
} from "lucide-react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━ STYLES ━━━━━━━━━━━━━━━━━━━━━━━━ */
const AdminStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif;background:#0d0d0d;color:#e8e8e8;overflow-x:hidden}

    :root{
      --bg:#0d0d0d; --s1:#141414; --s2:#1a1a1a; --s3:#222222; --s4:#2a2a2a;
      --bdr:rgba(255,255,255,.08); --bdr2:rgba(255,255,255,.14);
      --y:#F5A623; --yd:#D4891A; --yl:#FFB84D;
      --mut:rgba(255,255,255,.55); --dim:rgba(255,255,255,.3);
      --red:#ef4444; --green:#22c55e; --blue:#3b82f6; --purple:#8b5cf6;
      --sb:240px; --sbm:64px;
    }

    ::selection{background:var(--y);color:#000}
    ::-webkit-scrollbar{width:4px;height:4px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:var(--y);border-radius:2px}

    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes slideIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}

    .anim{animation:slideIn .3s ease}
    .spin{animation:spin .7s linear infinite}

    /* ── Input ── */
    .inp{width:100%;background:var(--s3);border:1px solid var(--bdr2);color:#fff;padding:10px 14px;font-family:'Inter',sans-serif;font-size:13.5px;outline:none;border-radius:6px;transition:border-color .25s,background .25s}
    .inp:focus{border-color:var(--y);background:rgba(245,166,35,.04)}
    .inp::placeholder{color:var(--dim)}
    select.inp option{background:var(--s2)}

    /* ── Button ── */
    .btn{display:inline-flex;align-items:center;gap:7px;font-family:'Inter',sans-serif;font-weight:600;font-size:13px;cursor:pointer;border:none;border-radius:6px;transition:all .25s;text-decoration:none}
    .btn:active{transform:scale(.97)}
    .btn-p{background:var(--y);color:#000;padding:9px 20px}
    .btn-p:hover{background:var(--yl)}
    .btn-g{background:var(--green);color:#fff;padding:9px 20px}
    .btn-g:hover{background:#16a34a}
    .btn-r{background:rgba(239,68,68,.15);color:var(--red);padding:8px 16px;border:1px solid rgba(239,68,68,.25)}
    .btn-r:hover{background:rgba(239,68,68,.25)}
    .btn-o{background:transparent;color:var(--mut);padding:8px 16px;border:1px solid var(--bdr2)}
    .btn-o:hover{border-color:var(--y);color:var(--y)}
    .btn-sm{font-size:12px;padding:6px 14px;gap:5px}

    /* ── Badge ── */
    .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:999px;font-size:11px;font-weight:600;letter-spacing:.3px}
    .badge-y{background:rgba(245,166,35,.15);color:var(--y)}
    .badge-g{background:rgba(34,197,94,.12);color:var(--green)}
    .badge-r{background:rgba(239,68,68,.12);color:var(--red)}
    .badge-b{background:rgba(59,130,246,.12);color:var(--blue)}
    .badge-p{background:rgba(139,92,246,.12);color:var(--purple)}

    /* ── Card ── */
    .ac{background:var(--s2);border:1px solid var(--bdr);border-radius:10px;padding:20px}
    .ac:hover{border-color:var(--bdr2)}

    /* ── Table ── */
    .tbl{width:100%;border-collapse:collapse}
    .tbl th{font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--dim);padding:10px 14px;border-bottom:1px solid var(--bdr);text-align:left;white-space:nowrap}
    .tbl td{padding:12px 14px;font-size:13.5px;border-bottom:1px solid var(--bdr);color:var(--mut);vertical-align:middle}
    .tbl tr:last-child td{border-bottom:none}
    .tbl tr:hover td{background:rgba(255,255,255,.02)}

    /* ── Modal ── */
    .modal-bg{position:fixed;inset:0;z-index:800;background:rgba(0,0,0,.82);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px}
    .modal{background:var(--s1);border:1px solid var(--bdr2);border-radius:12px;width:100%;max-width:600px;max-height:90vh;overflow-y:auto;animation:slideIn .3s ease}

    /* ── Stat card ── */
    .sc{background:var(--s2);border:1px solid var(--bdr);border-radius:10px;padding:20px 22px;position:relative;overflow:hidden;transition:border-color .3s}
    .sc:hover{border-color:var(--bdr2)}
    .sc::before{content:'';position:absolute;top:0;left:0;right:0;height:2.5px;background:var(--y)}

    /* ── Responsive ── */
    @media(max-width:768px){
      :root{--sb:0px}
      .sidebar{transform:translateX(-100%)!important}
      .sidebar.open{transform:translateX(0)!important}
      .main-content{margin-left:0!important}
    }
  `}</style>
);

/* ━━━━━━━━━━━━━━━━━━━━━━━━ DEFAULT SETTINGS ━━━━━━━━━━━━━━━━━━━━━━━━ */
const DEFAULT_SETTINGS = {
  phone:        "",
  email:        "",
  address:      "",
  workingHours: "",
  whatsapp:     "",
  facebook:     "",
  instagram:    "",
  mapLat:       "",
  mapLng:       "",
  mapLink:      "",
  heroTitle:    "",
  heroSub:      "",
  yearsExp:     "",
  projectsDone: "",
  since:        "",
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━ LOGIN PAGE ━━━━━━━━━━━━━━━━━━━━━━━━ */
function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email:"", password:"" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setErr("");
    if (!form.email || !form.password) { setErr("Email and password are required"); return; }
    setLoading(true);
    try {
      const res = await adminApi.login(form.email, form.password);
      if (res.data.success) {
        localStorage.setItem("admin_token", res.data.token);
        onLogin(res.data.user);
      } else {
        setErr(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErr(error.response?.data?.message || "Connection error. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",padding:20 }}>
      <AdminStyles/>
      <div style={{ width:"100%",maxWidth:420 }}>
        {/* Logo */}
        <div style={{ textAlign:"center",marginBottom:36 }}>
          <div style={{ width:56,height:56,background:"var(--y)",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:10,margin:"0 auto 16px",clipPath:"polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M2 18L6 8l5 5 5-7 6 9" stroke="#000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 22h20" stroke="#000" strokeWidth="2.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ fontSize:20,fontWeight:800,color:"var(--y)",letterSpacing:.5 }}>SRI BALAJI EARTH MOVERS</div>
          <div style={{ fontSize:12,color:"var(--dim)",marginTop:4,letterSpacing:1 }}>ADMIN PANEL</div>
        </div>

        <div className="ac" style={{ padding:"32px 28px" }}>
          <h2 style={{ fontSize:22,fontWeight:700,marginBottom:6 }}>Welcome back</h2>
          <p style={{ fontSize:13,color:"var(--mut)",marginBottom:28 }}>Sign in to manage your website content</p>

          {err && (
            <div style={{ padding:"11px 14px",background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.25)",color:"var(--red)",borderRadius:6,marginBottom:18,display:"flex",alignItems:"center",gap:8,fontSize:13 }}>
              <AlertTriangle size={15}/>{err}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display:"flex",flexDirection:"column",gap:14 }}>
            <div>
              <label style={{ fontSize:12,fontWeight:500,color:"var(--mut)",marginBottom:6,display:"block" }}>Email Address</label>
              <input className="inp" type="email" placeholder="admin@sribalaji.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
            </div>
            <div>
              <label style={{ fontSize:12,fontWeight:500,color:"var(--mut)",marginBottom:6,display:"block" }}>Password</label>
              <div style={{ position:"relative" }}>
                <input className="inp" type={show?"text":"password"} placeholder="Enter password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} style={{ paddingRight:44 }}/>
                <button type="button" onClick={()=>setShow(v=>!v)} style={{ position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"var(--dim)",cursor:"pointer" }}>
                  {show?<X size={15}/>:<Eye size={15}/>}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-p" style={{ width:"100%",justifyContent:"center",marginTop:6,padding:"12px",fontSize:14 }} disabled={loading}>
              {loading
                ? <><span style={{ width:14,height:14,border:"2px solid rgba(0,0,0,.3)",borderTop:"2px solid #000",borderRadius:"50%",animation:"spin .7s linear infinite",display:"inline-block" }}/><span>Signing in...</span></>
                : <><Lock size={14}/><span>Sign In</span></>
              }
            </button>
          </form>
          <p style={{ fontSize:12,color:"var(--dim)",textAlign:"center",marginTop:20 }}>
            Demo: <span style={{ color:"var(--y)" }}>admin@sribalaji.com</span> / <span style={{ color:"var(--y)" }}>Admin@12345</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ SIDEBAR ━━━━━━━━━━━━━━━━━━━━━━━━ */
const MENU = [
  { id:"dashboard",  label:"Dashboard",  icon:<LayoutDashboard size={17}/> },
  { id:"inquiries",  label:"Inquiries",  icon:<MessageSquare size={17}/>,  badge:0 },
  { id:"gallery",    label:"Gallery",    icon:<Image size={17}/> },
  { id:"reviews",    label:"Reviews",    icon:<Star size={17}/> },
  { id:"services",   label:"Services",   icon:<Wrench size={17}/> },
  { id:"settings",   label:"Settings",   icon:<Settings size={17}/> },
];

function Sidebar({ active, setActive, collapsed, user, onLogout, newCount }) {
  const menu = MENU.map(m => m.id === "inquiries" ? { ...m, badge: newCount } : m);
  return (
    <div className="sidebar" style={{ position:"fixed",top:0,left:0,bottom:0,width:collapsed?"64px":"240px",background:"var(--s1)",borderRight:"1px solid var(--bdr)",zIndex:100,display:"flex",flexDirection:"column",transition:"width .3s ease",overflow:"hidden" }}>
      {/* Logo */}
      <div style={{ padding:"18px 16px",borderBottom:"1px solid var(--bdr)",display:"flex",alignItems:"center",gap:11,minHeight:64,flexShrink:0 }}>
        <div style={{ width:32,height:32,background:"var(--y)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,borderRadius:6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M2 18L6 8l5 5 5-7 6 9" stroke="#000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 22h20" stroke="#000" strokeWidth="2.4" strokeLinecap="round"/>
          </svg>
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontSize:12,fontWeight:800,color:"var(--y)",letterSpacing:.5,lineHeight:1.1 }}>SRI BALAJI</div>
            <div style={{ fontSize:9.5,color:"var(--dim)",letterSpacing:1 }}>ADMIN PANEL</div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav style={{ flex:1,padding:"12px 8px",display:"flex",flexDirection:"column",gap:2,overflowY:"auto" }}>
        {menu.map(m => (
          <button key={m.id} onClick={() => setActive(m.id)}
            style={{ display:"flex",alignItems:"center",gap:11,padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",background:active===m.id?"rgba(245,166,35,.12)":"transparent",color:active===m.id?"var(--y)":"var(--mut)",transition:"all .2s",position:"relative",textAlign:"left",width:"100%" }}
            onMouseEnter={e=>{ if(active!==m.id) e.currentTarget.style.background="rgba(255,255,255,.04)"; }}
            onMouseLeave={e=>{ if(active!==m.id) e.currentTarget.style.background="transparent"; }}>
            <span style={{ flexShrink:0 }}>{m.icon}</span>
            {!collapsed && <span style={{ fontSize:13.5,fontWeight:500,flex:1 }}>{m.label}</span>}
            {!collapsed && m.badge > 0 && <span className="badge badge-r" style={{ fontSize:10,padding:"1px 7px" }}>{m.badge}</span>}
          </button>
        ))}
      </nav>

      {/* User + Logout */}
      <div style={{ padding:"12px 8px",borderTop:"1px solid var(--bdr)" }}>
        {!collapsed && (
          <div style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 12px",marginBottom:4 }}>
            <div style={{ width:32,height:32,borderRadius:"50%",background:"rgba(245,166,35,.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              <User size={15} color="var(--y)"/>
            </div>
            <div>
              <div style={{ fontSize:13,fontWeight:600,color:"#fff" }}>{user?.name}</div>
              <div style={{ fontSize:10.5,color:"var(--dim)" }}>{user?.role}</div>
            </div>
          </div>
        )}
        <button onClick={onLogout} style={{ display:"flex",alignItems:"center",gap:11,padding:"9px 12px",borderRadius:8,border:"none",cursor:"pointer",background:"transparent",color:"var(--dim)",transition:"all .2s",width:"100%" }}
          onMouseEnter={e=>{ e.currentTarget.style.color="var(--red)"; e.currentTarget.style.background="rgba(239,68,68,.06)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.color="var(--dim)"; e.currentTarget.style.background="transparent"; }}>
          <LogOut size={16}/>{!collapsed && <span style={{ fontSize:13.5 }}>Sign Out</span>}
        </button>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ DASHBOARD ━━━━━━━━━━━━━━━━━━━━━━━━ */
function DashboardView() {
  const [stats, setStats] = useState([
    { label:"Total Inquiries", val:0,  change:"...", up:true,  color:"var(--y)",    icon:<MessageSquare size={20}/> },
    { label:"New (Unread)",    val:0,   change:"Today", up:true,  color:"var(--blue)", icon:<Bell size={20}/> },
    { label:"Converted",       val:0,  change:"...",  up:true,  color:"var(--green)",icon:<CheckCircle size={20}/> },
    { label:"Gallery Images",  val:0,  change:"...",   up:true,  color:"var(--purple)",icon:<Image size={20}/> },
  ]);
  const [recentInq, setRecentInq] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminApi.getDashboard();
        if (res.data.success) {
          const s = res.data.data.overview;
          setStats([
            { label:"Total Inquiries", val:s.totalInquiries,  change:`${s.monthlyGrowth}%`, up:s.monthlyGrowth>=0,  color:"var(--y)",    icon:<MessageSquare size={20}/> },
            { label:"New (Unread)",    val:s.newInquiries,    change:"Active", up:true,  color:"var(--blue)", icon:<Bell size={20}/> },
            { label:"Total Projects",  val:s.totalProjects,   change:"+",  up:true,  color:"var(--green)",icon:<CheckCircle size={20}/> },
            { label:"Gallery Images",  val:s.totalGallery,    change:"+",   up:true,  color:"var(--purple)",icon:<Image size={20}/> },
          ]);
        }
        const inqRes = await adminApi.getInquiries({ limit: 5 });
        if (inqRes.data.success) setRecentInq(inqRes.data.data);
      } catch (err) {
        console.error("Fetch dashboard stats error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statusColor = { new:"badge-r", contacted:"badge-y", converted:"badge-g", closed:"badge-b" };

  return (
    <div className="anim">
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:22,fontWeight:700,marginBottom:4 }}>Dashboard</h1>
        <p style={{ fontSize:13.5,color:"var(--mut)" }}>Welcome back, Admin · {new Date().toLocaleDateString("en-IN",{ weekday:"long",day:"numeric",month:"long" })}</p>
      </div>

      {/* Stat cards */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24 }}>
        {stats.map((s,i)=>(
          <div key={i} className="sc">
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
              <div style={{ width:42,height:42,borderRadius:9,background:`rgba(${s.color.includes("y")?'245,166,35':s.color.includes("blue")?'59,130,246':s.color.includes("green")?'34,197,94':'139,92,246'},.12)`,display:"flex",alignItems:"center",justifyContent:"center",color:s.color }}>
                {s.icon}
              </div>
              <span style={{ fontSize:11.5,color:s.up?"var(--green)":"var(--red)",display:"flex",alignItems:"center",gap:3,fontWeight:600 }}>
                {s.up?<ArrowUp size={12}/>:<ArrowDown size={12}/>}{s.change}
              </span>
            </div>
            <div style={{ fontSize:30,fontWeight:800,color:"#fff",lineHeight:1 }}>{s.val}</div>
            <div style={{ fontSize:12,color:"var(--mut)",marginTop:5 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr",gap:16 }}>
        {/* Recent inquiries */}
        <div className="ac">
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
            <h3 style={{ fontSize:15,fontWeight:700 }}>Recent Inquiries</h3>
            <span style={{ fontSize:12,color:"var(--y)",cursor:"pointer" }}>View all →</span>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table className="tbl">
              <thead><tr><th>Name</th><th>Service</th><th>Phone</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {recentInq.map(inq=>(
                  <tr key={inq._id}>
                    <td style={{ color:"#fff",fontWeight:500 }}>{inq.name}</td>
                    <td>{inq.service}</td>
                    <td><a href={`tel:${inq.phone}`} style={{ color:"var(--y)",textDecoration:"none" }}>{inq.phone}</a></td>
                    <td><span className={`badge ${statusColor[inq.status]||"badge-b"}`}>{inq.status}</span></td>
                    <td style={{ fontSize:12 }}>{new Date(inq.createdAt).toLocaleDateString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick stats */}
        <div className="ac">
          <h3 style={{ fontSize:15,fontWeight:700,marginBottom:16 }}>Real-time Summary</h3>
          {[
            { l:"Active Machinery", v:stats[2]?.val || "..." },
            { l:"Total Inquiries",  v:stats[0]?.val || "..." },
            { l:"New Requests",    v:stats[1]?.val || "..." },
            { l:"Gallery Count",   v:stats[3]?.val || "..." },
            { l:"Admin Status",    v:"Connected" },
            { l:"DB Status",       v:"Synchronized" },
          ].map((x,i)=>(
            <div key={i} style={{ display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:i<5?"1px solid var(--bdr)":"none" }}>
              <span style={{ fontSize:13,color:"var(--mut)" }}>{x.l}</span>
              <span style={{ fontSize:13,fontWeight:600,color:"#fff" }}>{x.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ INQUIRIES ━━━━━━━━━━━━━━━━━━━━━━━━ */
function InquiriesView() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getInquiries();
      if (res.data.success) setItems(res.data.data);
    } catch (err) {
      console.error("Fetch inquiries error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const statusColor = { new:"badge-r", contacted:"badge-y", converted:"badge-g", closed:"badge-b" };
  const filtered = items.filter(x => {
    const matchStatus = filter==="all" || x.status===filter;
    const matchSearch = !search || x.name.toLowerCase().includes(search.toLowerCase()) || x.phone.includes(search);
    return matchStatus && matchSearch;
  });

  const updateStatus = async (id, status) => {
    try {
      const res = await adminApi.updateInquiry(id, { status });
      if (res.data.success) {
        setItems(p => p.map(x => x._id===id ? {...x,status} : x));
        if(sel?._id===id) setSel(p=>({...p,status}));
      }
    } catch (err) {
      console.error("Update status error:", err);
      alert("Failed to update status");
    }
  };

  const deleteItem = async id => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await adminApi.deleteInquiry(id);
      if (res.data.success) {
        setItems(p => p.filter(x=>x._id!==id));
        setSel(null);
      }
    } catch (err) {
      console.error("Delete inquiry error:", err);
      alert("Failed to delete inquiry");
    }
  };

  return (
    <div className="anim">
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,flexWrap:"wrap",gap:12 }}>
        <div>
          <h1 style={{ fontSize:22,fontWeight:700,marginBottom:4 }}>Inquiries</h1>
          <p style={{ fontSize:13,color:"var(--mut)" }}>Manage all quote requests and contact form submissions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="ac" style={{ marginBottom:16 }}>
        <div style={{ display:"flex",gap:10,flexWrap:"wrap",alignItems:"center" }}>
          <div style={{ position:"relative",flex:1,minWidth:200 }}>
            <Search size={14} style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"var(--dim)" }}/>
            <input className="inp" placeholder="Search by name or phone..." value={search} onChange={e=>setSearch(e.target.value)} style={{ paddingLeft:36 }}/>
          </div>
          <div style={{ display:"flex",gap:6 }}>
            {["all","new","contacted","converted","closed"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className="btn btn-sm"
                style={{ background:filter===f?"var(--y)":"transparent",color:filter===f?"#000":"var(--mut)",border:"1px solid",borderColor:filter===f?"var(--y)":"var(--bdr2)",borderRadius:6 }}>
                {f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="ac" style={{ padding:0,overflow:"hidden" }}>
        {loading ? (
          <div style={{ padding:60,textAlign:"center",color:"var(--y)" }}>
            <RefreshCw className="spin" size={32} style={{ margin:"0 auto 12px" }}/>
            <div style={{ fontSize:14 }}>Loading inquiries...</div>
          </div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th style={{ paddingLeft:20 }}>Customer</th><th>Phone</th><th>Service</th>
                  <th>Status</th><th>Date</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inq=>(
                  <tr key={inq._id}>
                    <td style={{ paddingLeft:20 }}>
                      <div style={{ fontWeight:600,color:"#fff",fontSize:14 }}>{inq.name}</div>
                      {inq.message && <div style={{ fontSize:11.5,color:"var(--dim)",marginTop:2,maxWidth:180,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{inq.message}</div>}
                    </td>
                    <td><a href={`tel:${inq.phone}`} style={{ color:"var(--y)",textDecoration:"none",fontWeight:500 }}>{inq.phone}</a></td>
                    <td>{inq.service||"—"}</td>
                    <td>
                      <select className="inp" value={inq.status} onChange={e=>updateStatus(inq._id,e.target.value)}
                        style={{ width:"auto",padding:"5px 10px",fontSize:12,borderRadius:999 }}>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td style={{ fontSize:12 }}>{new Date(inq.createdAt).toLocaleDateString("en-IN")}</td>
                    <td>
                      <div style={{ display:"flex",gap:6 }}>
                        <button className="btn btn-o btn-sm" onClick={()=>setSel(inq)}><Eye size={12}/>View</button>
                        <a href={`tel:${inq.phone}`} className="btn btn-sm" style={{ textDecoration:"none",background:"rgba(34,197,94,.1)",color:"var(--green)",border:"1px solid rgba(34,197,94,.2)",borderRadius:6,padding:"6px 12px",fontSize:12 }}>
                          <Phone size={12}/>Call
                        </a>
                        <button className="btn btn-r btn-sm" onClick={()=>deleteItem(inq._id)}><Trash2 size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length===0 && <div style={{ padding:"40px 20px",textAlign:"center",color:"var(--dim)",fontSize:14 }}>No inquiries found</div>}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {sel && (
        <div className="modal-bg" onClick={()=>setSel(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 24px",borderBottom:"1px solid var(--bdr)" }}>
              <h3 style={{ fontSize:17,fontWeight:700 }}>Inquiry Details</h3>
              <button onClick={()=>setSel(null)} style={{ background:"none",border:"none",color:"var(--mut)",cursor:"pointer" }}><X size={20}/></button>
            </div>
            <div style={{ padding:24,display:"flex",flexDirection:"column",gap:16 }}>
              {[
                { l:"Name",    v:sel.name    },
                { l:"Phone",   v:sel.phone   },
                { l:"Service", v:sel.service },
                { l:"Status",  v:sel.status  },
                { l:"Date",    v:new Date(sel.createdAt).toLocaleString("en-IN") },
                { l:"Message", v:sel.message },
              ].map((x,i)=>(
                <div key={i} style={{ display:"flex",gap:16 }}>
                  <span style={{ fontSize:12,fontWeight:600,color:"var(--dim)",width:80,flexShrink:0,paddingTop:1 }}>{x.l}</span>
                  <span style={{ fontSize:13.5,color:"#fff",flex:1 }}>{x.v||"—"}</span>
                </div>
              ))}
              <div style={{ display:"flex",gap:10,marginTop:8 }}>
                <a href={`tel:${sel.phone}`} className="btn btn-g" style={{ textDecoration:"none",flex:1,justifyContent:"center" }}>
                  <Phone size={14}/>Call Now
                </a>
                <a href={`https://wa.me/${sel.phone.replace(/\D/g,"")}?text=Hello+${sel.name}%2C+regarding+your+JCB+inquiry`} target="_blank" rel="noreferrer"
                  className="btn" style={{ textDecoration:"none",flex:1,justifyContent:"center",background:"#25D366",color:"#fff",borderRadius:6,padding:"9px 16px",fontSize:13 }}>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ GALLERY ━━━━━━━━━━━━━━━━━━━━━━━━ */
function GalleryView() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({ title:"", category:"Site Work", isActive:true });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState("all");

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getGallery();
      if (res.data.success) setItems(res.data.data);
      else showToast("Failed to load gallery", "error");
    } catch (err) {
      console.error("Fetch gallery error:", err);
      showToast(`Error: ${err.response?.data?.message || err.message}`, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openAddModal = () => {
    setEditItem(null);
    setNewItem({ title:"", category:"Site Work", isActive:true });
    setFile(null);
    setShowAdd(true);
  };

  const openEditModal = (g) => {
    setEditItem(g);
    setNewItem({ title: g.title || "", category: g.category || "Site Work", isActive: g.isActive !== false });
    setFile(null);
    setShowAdd(true);
  };

  const addItem = async () => {
    if (!editItem && !file) { showToast("Please select an image file", "error"); return; }
    setUploading(true);
    try {
      const formData = new FormData();
      if (file) formData.append("image", file);
      formData.append("data", JSON.stringify(newItem));
      let res;
      if (editItem) {
        res = await adminApi.updateGallery(editItem._id, formData);
        if (res.data.success) {
          setItems(p => p.map(x => x._id === editItem._id ? res.data.data : x));
          showToast("Image updated successfully!");
        }
      } else {
        res = await adminApi.uploadGallery(formData);
        if (res.data.success) {
          setItems(p => [res.data.data, ...p]);
          showToast("Image uploaded to MongoDB & Cloudinary!");
        }
      }
      setShowAdd(false);
      setFile(null);
      setNewItem({ title:"", category:"Site Work", isActive:true });
      setEditItem(null);
    } catch (err) {
      console.error("Upload error:", err);
      showToast(`Upload failed: ${err.response?.data?.message || err.message}`, "error");
    } finally {
      setUploading(false);
    }
  };

  const deleteItem = async id => {
    if (!confirm("Permanently delete this image from MongoDB and Cloudinary?")) return;
    try {
      const res = await adminApi.deleteGallery(id);
      if (res.data.success) {
        setItems(p => p.filter(x => x._id !== id));
        showToast("Image deleted from database");
      } else {
        showToast("Delete failed: " + res.data.message, "error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showToast(`Delete failed: ${err.response?.data?.message || err.message}`, "error");
    }
  };

  const toggleActive = async g => {
    try {
      const res = await adminApi.updateGallery(g._id, { isActive: !g.isActive });
      if (res.data.success) {
        setItems(p => p.map(x => x._id === g._id ? { ...x, isActive: !g.isActive } : x));
        showToast(g.isActive ? "Image hidden from website" : "Image now visible on website");
      }
    } catch (err) {
      console.error("Toggle error:", err);
      showToast("Failed to update visibility", "error");
    }
  };

  const CATS = ["all","Machinery","Site Work","Before-After","Team","Other"];
  const filtered = filter === "all" ? items : items.filter(x => x.category === filter);

  return (
    <div className="anim">
      {/* Toast notification */}
      {toast && (
        <div style={{ position:"fixed",top:20,right:20,zIndex:9999,padding:"12px 18px",
          background:toast.type==="error"?"rgba(239,68,68,.9)":"rgba(34,197,94,.9)",
          color:"#fff",borderRadius:8,fontSize:13,fontWeight:600,
          animation:"slideIn .3s ease",maxWidth:300,boxShadow:"0 8px 24px rgba(0,0,0,.3)" }}>
          {toast.msg}
        </div>
      )}

      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,flexWrap:"wrap",gap:12 }}>
        <div>
          <h1 style={{ fontSize:22,fontWeight:700,marginBottom:4 }}>Gallery</h1>
          <p style={{ fontSize:13,color:"var(--mut)" }}>
            {items.length} total · {items.filter(x=>x.isActive).length} visible on website
          </p>
        </div>
        <div style={{ display:"flex",gap:8 }}>
          <button className="btn btn-o btn-sm" onClick={fetchData}><RefreshCw size={13}/>Refresh</button>
          <button className="btn btn-p" onClick={openAddModal}><Plus size={15}/>Add Image</button>
        </div>
      </div>

      {/* Category filter tabs */}
      <div style={{ display:"flex",gap:6,marginBottom:18,flexWrap:"wrap" }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setFilter(c)} className="btn btn-sm"
            style={{ background:filter===c?"var(--y)":"transparent",color:filter===c?"#000":"var(--mut)",
              border:"1px solid",borderColor:filter===c?"var(--y)":"var(--bdr2)",borderRadius:6,textTransform:"capitalize" }}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14 }}>
        {loading ? (
          <div style={{ gridColumn:"1/-1",padding:60,textAlign:"center",color:"var(--y)" }}>
            <RefreshCw className="spin" size={32} style={{ margin:"0 auto 12px" }}/>
            <div>Loading gallery from MongoDB...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ gridColumn:"1/-1",padding:60,textAlign:"center",color:"var(--mut)",fontSize:14 }}>
            <div style={{ fontSize:40,marginBottom:12 }}>📷</div>
            {filter !== "all" ? `No images in "${filter}" category.` : "No gallery images yet. Click \"Add Image\" to upload your first photo."}
          </div>
        ) : filtered.map((g) => (
          <div key={g._id} style={{ position:"relative",border:`1px solid ${g.isActive?"var(--bdr)":"rgba(239,68,68,.3)"}`,borderRadius:8,overflow:"hidden",background:"var(--s2)" }}>
            <div style={{ position:"absolute",top:8,left:8,zIndex:2 }}>
              <span className={`badge ${g.isActive?"badge-g":"badge-r"}`} style={{ fontSize:10 }}>
                {g.isActive ? "Live" : "Hidden"}
              </span>
            </div>
            <div style={{ height:150,overflow:"hidden",cursor:"pointer" }} onClick={() => setPreview(g.image?.url)}>
              <img src={g.image?.url} alt={g.title}
                style={{ width:"100%",height:"100%",objectFit:"cover",transition:"transform .3s",opacity:g.isActive?1:.55 }}
                onMouseEnter={e => e.target.style.transform="scale(1.06)"}
                onMouseLeave={e => e.target.style.transform="scale(1)"}
                onError={e => { e.target.style.background="#222"; e.target.alt="Image Error"; }}
              />
            </div>
            <div style={{ padding:"10px 12px" }}>
              <div style={{ fontSize:12.5,fontWeight:600,color:"#fff",marginBottom:4,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>
                {g.title || "Untitled"}
              </div>
              <span className="badge badge-y" style={{ fontSize:10,marginBottom:8,display:"inline-flex" }}>{g.category}</span>
              <div style={{ display:"flex",gap:4,marginTop:6 }}>
                <button className="btn btn-o btn-sm" style={{ flex:1,justifyContent:"center",padding:"5px 8px",fontSize:11 }}
                  onClick={() => toggleActive(g)}>
                  <Eye size={11}/>{g.isActive ? "Hide" : "Show"}
                </button>
                <button className="btn btn-o btn-sm" style={{ padding:"5px 8px" }} onClick={() => openEditModal(g)}>
                  <Edit3 size={11}/>
                </button>
                <button className="btn btn-r btn-sm" style={{ padding:"5px 8px" }} onClick={() => deleteItem(g._id)}>
                  <Trash2 size={11}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit modal */}
      {showAdd && (
        <div className="modal-bg" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 22px",borderBottom:"1px solid var(--bdr)" }}>
              <h3 style={{ fontSize:16,fontWeight:700 }}>{editItem ? "Edit Gallery Image" : "Add Gallery Image"}</h3>
              <button onClick={() => setShowAdd(false)} style={{ background:"none",border:"none",color:"var(--mut)",cursor:"pointer" }}><X size={18}/></button>
            </div>
            <div style={{ padding:22,display:"flex",flexDirection:"column",gap:14 }}>
              {editItem && editItem.image?.url && (
                <div>
                  <label style={{ fontSize:12,color:"var(--mut)",display:"block",marginBottom:6 }}>Current Image</label>
                  <img src={editItem.image.url} alt="current"
                    style={{ width:"100%",height:130,objectFit:"cover",borderRadius:6,border:"1px solid var(--bdr)" }}/>
                </div>
              )}
              <div>
                <label style={{ fontSize:12,color:"var(--mut)",display:"block",marginBottom:6 }}>
                  {editItem ? "Replace Image (optional)" : "Select Image *"}
                </label>
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])}
                  style={{ width:"100%",background:"var(--s3)",padding:10,borderRadius:6,border:"1px dashed var(--bdr2)",fontSize:13,color:"var(--mut)" }}/>
              </div>
              {file && <img src={URL.createObjectURL(file)} alt="preview" style={{ width:"100%",height:150,objectFit:"cover",borderRadius:6,border:"1px solid var(--bdr)" }}/>}
              <div>
                <label style={{ fontSize:12,color:"var(--mut)",display:"block",marginBottom:6 }}>Title</label>
                <input className="inp" placeholder="e.g. Foundation Excavation Project" value={newItem.title} onChange={e => setNewItem({...newItem,title:e.target.value})}/>
              </div>
              <div>
                <label style={{ fontSize:12,color:"var(--mut)",display:"block",marginBottom:6 }}>Category</label>
                <select className="inp" value={newItem.category} onChange={e => setNewItem({...newItem,category:e.target.value})}>
                  <option>Site Work</option><option>Machinery</option><option>Before-After</option><option>Team</option><option>Other</option>
                </select>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <input type="checkbox" id="gal-active" checked={newItem.isActive}
                  onChange={e => setNewItem({...newItem,isActive:e.target.checked})}
                  style={{ width:16,height:16,accentColor:"var(--y)",cursor:"pointer" }}/>
                <label htmlFor="gal-active" style={{ fontSize:13,color:"var(--mut)",cursor:"pointer" }}>
                  Visible on live website immediately
                </label>
              </div>
              <div style={{ display:"flex",gap:10,marginTop:4 }}>
                <button className="btn btn-p" onClick={addItem} style={{ flex:1,justifyContent:"center" }} disabled={uploading}>
                  {uploading ? <RefreshCw className="spin" size={14}/> : <Save size={14}/>}
                  <span>{uploading ? "Uploading..." : editItem ? "Update Image" : "Upload & Save"}</span>
                </button>
                <button className="btn btn-o" onClick={() => setShowAdd(false)} style={{ flex:1,justifyContent:"center" }}>Cancel</button>
              </div>
              <div style={{ padding:"10px 12px",background:"rgba(245,166,35,.06)",border:"1px solid rgba(245,166,35,.15)",borderRadius:6,fontSize:12,color:"var(--y)" }}>
                💡 {editItem ? "Changes save to MongoDB instantly." : "Images upload to Cloudinary & save to MongoDB. They appear on the live website immediately."}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full preview */}
      {preview && (
        <div className="modal-bg" onClick={() => setPreview(null)} style={{ cursor:"pointer" }}>
          <img src={preview} alt="Preview" style={{ maxWidth:"88vw",maxHeight:"88vh",objectFit:"contain",borderRadius:8 }}/>
          <button onClick={() => setPreview(null)} style={{ position:"absolute",top:20,right:24,background:"none",border:"none",color:"#fff",cursor:"pointer" }}><X size={28}/></button>
        </div>
      )}
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━ REVIEWS ━━━━━━━━━━━━━━━━━━━━━━━━ */
function ReviewsView() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name:"",role:"",stars:5,text:"",source:"Google" });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getTestimonials();
      if (res.data.success) setItems(res.data.data);
    } catch (err) {
      console.error("Fetch reviews error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const saveReview = async () => {
    if (!form.name || !form.text) return;
    try {
      if (editItem) {
        const res = await adminApi.updateTestimonial(editItem._id, form);
        if (res.data.success) setItems(p=>p.map(x=>x._id===editItem._id?{...x,...form}:x));
      } else {
        const res = await adminApi.createTestimonial(form);
        if (res.data.success) setItems(p=>[res.data.data, ...p]);
      }
      setShowAdd(false);
      setForm({ name:"",role:"",stars:5,text:"",source:"Google" });
    } catch (err) {
      console.error("Save review error:", err);
      alert("Failed to save review");
    }
  };

  const deleteReview = async id => {
    if (!confirm("Delete this review?")) return;
    try {
      const res = await adminApi.deleteTestimonial(id);
      if (res.data.success) setItems(p=>p.filter(x=>x._id!==id));
    } catch (err) {
      console.error("Delete review error:", err);
    }
  };

  const toggleActive = async r => {
    try {
      const res = await adminApi.updateTestimonial(r._id, { isActive: !r.isActive });
      if (res.data.success) setItems(p=>p.map(x=>x._id===r._id?{...x,isActive:!r.isActive}:x));
    } catch (err) {
      console.error("Toggle active error:", err);
    }
  };

  const openEdit = r => {
    setEditItem(r);
    setForm({ name:r.name,role:r.role,stars:r.stars,text:r.text,source:r.source });
    setShowAdd(true);
  };

  return (
    <div className="anim">
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,flexWrap:"wrap",gap:12 }}>
        <div>
          <h1 style={{ fontSize:22,fontWeight:700,marginBottom:4 }}>Reviews</h1>
          <p style={{ fontSize:13,color:"var(--mut)" }}>Manage customer testimonials shown on the website</p>
        </div>
        <button className="btn btn-p" onClick={()=>{ setEditItem(null); setForm({ name:"",role:"",stars:5,text:"",source:"Google" }); setShowAdd(true); }}><Plus size={15}/>Add Review</button>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14 }}>
        {loading ? (
          <div style={{ gridColumn:"1/-1",padding:60,textAlign:"center",color:"var(--y)" }}>
            <RefreshCw className="spin" size={32} style={{ margin:"0 auto 12px" }}/>
            <div>Loading reviews...</div>
          </div>
        ) : items.map(r=>(
          <div key={r._id} className="ac" style={{ position:"relative" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12 }}>
              <div style={{ display:"flex",gap:3 }}>
                {[1,2,3,4,5].map(i=><Star key={i} size={14} fill={i<=r.stars?"var(--y)":"transparent"} color="var(--y)"/>)}
              </div>
              <div style={{ display:"flex",gap:6,alignItems:"center" }}>
                <span className={`badge ${r.isActive?"badge-g":"badge-r"}`}>{r.isActive?"Active":"Hidden"}</span>
                <button onClick={()=>toggleActive(r)}
                  className="btn btn-o btn-sm"><Eye size={12}/></button>
                <button onClick={()=>openEdit(r)} className="btn btn-o btn-sm"><Edit3 size={12}/></button>
                <button onClick={()=>deleteReview(r._id)} className="btn btn-r btn-sm"><Trash2 size={12}/></button>
              </div>
            </div>
            <p style={{ fontSize:13.5,color:"var(--mut)",lineHeight:1.7,marginBottom:14 }}>"{r.text}"</p>
            <div style={{ display:"flex",alignItems:"center",gap:10 }}>
              <div style={{ width:36,height:36,borderRadius:"50%",background:"rgba(245,166,35,.15)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ fontSize:13,fontWeight:700,color:"var(--y)" }}>{r.name.slice(0,2).toUpperCase()}</span>
              </div>
              <div>
                <div style={{ fontSize:13.5,fontWeight:600,color:"#fff" }}>{r.name}</div>
                <div style={{ fontSize:12,color:"var(--dim)" }}>{r.role} · {r.source}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="modal-bg" onClick={()=>setShowAdd(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 22px",borderBottom:"1px solid var(--bdr)" }}>
              <h3 style={{ fontSize:16,fontWeight:700 }}>{editItem?"Edit Review":"Add Review"}</h3>
              <button onClick={()=>setShowAdd(false)} style={{ background:"none",border:"none",color:"var(--mut)",cursor:"pointer" }}><X size={18}/></button>
            </div>
            <div style={{ padding:22,display:"flex",flexDirection:"column",gap:14 }}>
              <input className="inp" placeholder="Customer Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
              <input className="inp" placeholder="Role / Designation" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}/>
              <div>
                <label style={{ fontSize:12,color:"var(--mut)",display:"block",marginBottom:7 }}>Star Rating</label>
                <div style={{ display:"flex",gap:8 }}>
                  {[1,2,3,4,5].map(n=>(
                    <button key={n} onClick={()=>setForm({...form,stars:n})} style={{ background:"none",border:"none",cursor:"pointer" }}>
                      <Star size={24} fill={n<=form.stars?"var(--y)":"transparent"} color="var(--y)"/>
                    </button>
                  ))}
                </div>
              </div>
              <textarea className="inp" rows={4} placeholder="Review text *" value={form.text} onChange={e=>setForm({...form,text:e.target.value})} style={{ resize:"vertical" }}/>
              <select className="inp" value={form.source} onChange={e=>setForm({...form,source:e.target.value})}>
                <option>Google</option><option>Website</option><option>WhatsApp</option><option>In Person</option>
              </select>
              <div style={{ display:"flex",gap:10 }}>
                <button className="btn btn-p" onClick={saveReview} style={{ flex:1,justifyContent:"center" }}><Save size={14}/>{editItem?"Update":"Add"} Review</button>
                <button className="btn btn-o" onClick={()=>setShowAdd(false)} style={{ flex:1,justifyContent:"center" }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ SERVICES ━━━━━━━━━━━━━━━━━━━━━━━━ */
function ServicesView() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getMachinery();
      if (res.data.success) setServices(res.data.data);
    } catch (err) {
      console.error("Fetch machinery error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const save = async () => {
    if (!edit) return;
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({
        name: edit.name,
        description: edit.description,
        isActive: edit.isActive,
      }));
      const res = await adminApi.updateMachinery(edit._id, formData);
      if (res.data.success) {
        setServices(p=>p.map(x=>x._id===edit._id?res.data.data:x));
        setEdit(null);
      }
    } catch (err) {
      console.error("Update machinery error:", err);
      alert("Failed to update service");
    }
  };

  const toggleActive = async s => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({ isActive: !s.isActive }));
      const res = await adminApi.updateMachinery(s._id, formData);
      if (res.data.success) setServices(p=>p.map(x=>x._id===s._id?{...x,isActive:!s.isActive}:x));
    } catch (err) {
      console.error("Toggle machinery active error:", err);
    }
  };

  return (
    <div className="anim">
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontSize:22,fontWeight:700,marginBottom:4 }}>Services</h1>
        <p style={{ fontSize:13,color:"var(--mut)" }}>Edit service descriptions shown on the website</p>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
        {loading ? (
          <div style={{ padding:60,textAlign:"center",color:"var(--y)" }}>
            <RefreshCw className="spin" size={32} style={{ margin:"0 auto 12px" }}/>
            <div>Loading services...</div>
          </div>
        ) : services.map(s=>(
          <div key={s._id} className="ac" style={{ display:"flex",alignItems:"center",gap:16 }}>
            {edit?._id===s._id ? (
              <div style={{ flex:1,display:"flex",flexDirection:"column",gap:10 }}>
                <input className="inp" value={edit.name} onChange={e=>setEdit({...edit,name:e.target.value})} style={{ fontWeight:600 }}/>
                <textarea className="inp" rows={2} value={edit.description} onChange={e=>setEdit({...edit,description:e.target.value})} style={{ resize:"none" }}/>
                <div style={{ display:"flex",gap:8 }}>
                  <button className="btn btn-g btn-sm" onClick={save}><Save size={12}/>Save</button>
                  <button className="btn btn-o btn-sm" onClick={()=>setEdit(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15,fontWeight:600,color:"#fff",marginBottom:4 }}>{s.name}</div>
                  <div style={{ fontSize:13,color:"var(--mut)" }}>{s.description}</div>
                </div>
                <div style={{ display:"flex",gap:8,flexShrink:0 }}>
                  <button onClick={()=>toggleActive(s)}
                    className="btn btn-sm" style={{ background:s.isActive?"rgba(34,197,94,.1)":"rgba(239,68,68,.1)",color:s.isActive?"var(--green)":"var(--red)",border:"1px solid",borderColor:s.isActive?"rgba(34,197,94,.2)":"rgba(239,68,68,.2)",borderRadius:6 }}>
                    {s.isActive?"Active":"Hidden"}
                  </button>
                  <button className="btn btn-o btn-sm" onClick={()=>setEdit({...s})}><Edit3 size={12}/>Edit</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ SETTINGS ━━━━━━━━━━━━━━━━━━━━━━━━ */
function SettingsView() {
  const [cfg, setCfg] = useState({});
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await adminApi.getSettings();
        if (res.data.success) {
          setCfg({ ...DEFAULT_SETTINGS, ...res.data.data }); // Merge with empty defaults
        }
      } catch (err) {
        console.error("Fetch settings error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const save = async () => {
    try {
      const res = await adminApi.updateSettings(cfg);
      if (res.data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error("Save settings error:", err);
      alert("Failed to save settings");
    }
  };

  const tabs = [
    { id:"contact", label:"Contact & Hours", icon:<Phone size={14}/> },
    { id:"hero",    label:"Hero Section",    icon:<Globe size={14}/> },
    { id:"social",  label:"Social & Map",    icon:<Link size={14}/> },
    { id:"stats",   label:"Statistics",      icon:<BarChart2 size={14}/> },
    { id:"account", label:"Admin Account",   icon:<User size={14}/> },
  ];

  return (
    <div className="anim">
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,flexWrap:"wrap",gap:12 }}>
        <div>
          <h1 style={{ fontSize:22,fontWeight:700,marginBottom:4 }}>Settings</h1>
          <p style={{ fontSize:13,color:"var(--mut)" }}>Manage all website content and configuration</p>
        </div>
        {saved && (
          <div className="badge badge-g" style={{ fontSize:13,padding:"8px 16px" }}>
            <Check size={14}/> Settings saved successfully!
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display:"flex",gap:6,marginBottom:20,flexWrap:"wrap" }}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setActiveTab(t.id)} className="btn btn-sm"
            style={{ background:activeTab===t.id?"var(--y)":"transparent",color:activeTab===t.id?"#000":"var(--mut)",border:"1px solid",borderColor:activeTab===t.id?"var(--y)":"var(--bdr2)",borderRadius:6 }}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      <div className="ac" style={{ minHeight:300, position:"relative" }}>
        {loading ? (
          <div style={{ padding:60,textAlign:"center",color:"var(--y)" }}>
            <RefreshCw className="spin" size={32} style={{ margin:"0 auto 12px" }}/>
            <div>Loading settings...</div>
          </div>
        ) : (
          <>
            {activeTab==="contact" && (
              <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                <h3 style={{ fontSize:15,fontWeight:700,marginBottom:4 }}>Contact Information</h3>
                {[
                  { l:"Phone Number",    k:"phone",    t:"text",  ph:"+91 9443239842" },
                  { l:"Email Address",   k:"email",    t:"email", ph:"sribalajiearthmovers@gmail.com" },
                  { l:"WhatsApp Number", k:"whatsapp", t:"text",  ph:"919443239842 (with country code, no +)" },
                  { l:"Business Address",k:"address",  t:"text",  ph:"Full street address" },
                  { l:"Working Hours",   k:"workingHours",t:"text",ph:"6:00 AM – 6:00 PM · Monday to Sunday" },
                ].map(f=>(
                  <div key={f.k}>
                    <label style={{ fontSize:12,fontWeight:500,color:"var(--mut)",display:"block",marginBottom:6 }}>{f.l}</label>
                    <input className="inp" type={f.t} value={cfg[f.k]||""} onChange={e=>setCfg({...cfg,[f.k]:e.target.value})} placeholder={f.ph}/>
                  </div>
                ))}
              </div>
            )}

            {activeTab==="hero" && (
              <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                <h3 style={{ fontSize:15,fontWeight:700,marginBottom:4 }}>Hero Section Content</h3>
                {[
                  { l:"Hero Main Title",    k:"heroTitle", t:"text", ph:"Moving Earth, Building Trust" },
                  { l:"Hero Subtitle",      k:"heroSub",   t:"text", ph:"Professional JCB 3DX..." },
                ].map(f=>(
                  <div key={f.k}>
                    <label style={{ fontSize:12,fontWeight:500,color:"var(--mut)",display:"block",marginBottom:6 }}>{f.l}</label>
                    <input className="inp" value={cfg[f.k]||""} onChange={e=>setCfg({...cfg,[f.k]:e.target.value})} placeholder={f.ph}/>
                  </div>
                ))}
              </div>
            )}

            {activeTab==="social" && (
              <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                <h3 style={{ fontSize:15,fontWeight:700,marginBottom:4 }}>Social Media & Google Maps</h3>
                {[
                  { l:"Facebook URL",       k:"facebook",  ph:"https://facebook.com/..." },
                  { l:"Instagram URL",      k:"instagram", ph:"https://instagram.com/..." },
                  { l:"Google Maps Latitude", k:"mapLat",  ph:"9.8545663" },
                  { l:"Google Maps Longitude",k:"mapLng",  ph:"78.4965071" },
                  { l:"Google Maps Short Link",k:"mapLink", ph:"https://maps.app.goo.gl/BLcBhefkxFgvycNj8" },
                ].map(f=>(
                  <div key={f.k}>
                    <label style={{ fontSize:12,fontWeight:500,color:"var(--mut)",display:"block",marginBottom:6 }}>{f.l}</label>
                    <input className="inp" value={cfg[f.k]||""} onChange={e=>setCfg({...cfg,[f.k]:e.target.value})} placeholder={f.ph}/>
                  </div>
                ))}
                <div style={{ padding:"12px 14px",background:"rgba(245,166,35,.06)",border:"1px solid rgba(245,166,35,.2)",borderRadius:6,fontSize:13,color:"var(--y)" }}>
                  💡 Current map: <a href={cfg.mapLink || "https://maps.app.goo.gl/BLcBhefkxFgvycNj8"} target="_blank" rel="noreferrer" style={{ color:"var(--yl)",textDecoration:"none" }}>Open in Google Maps ↗</a>
                </div>
              </div>
            )}

            {activeTab==="stats" && (
              <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                <h3 style={{ fontSize:15,fontWeight:700,marginBottom:4 }}>Business Statistics</h3>
                {[
                  { l:"Years of Experience", k:"yearsExp",     ph:"20" },
                  { l:"Projects Completed",  k:"projectsDone", ph:"1000" },
                  { l:"Established Year",    k:"since",        ph:"2004" },
                ].map(f=>(
                  <div key={f.k}>
                    <label style={{ fontSize:12,fontWeight:500,color:"var(--mut)",display:"block",marginBottom:6 }}>{f.l}</label>
                    <input className="inp" type="number" value={cfg[f.k]||""} onChange={e=>setCfg({...cfg,[f.k]:e.target.value})} placeholder={f.ph}/>
                  </div>
                ))}
              </div>
            )}

            {activeTab==="account" && (
              <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                <h3 style={{ fontSize:15,fontWeight:700,marginBottom:4 }}>Admin Account Security</h3>
                <div style={{ padding:"12px 14px",background:"rgba(59,130,246,.08)",border:"1px solid rgba(59,130,246,.2)",borderRadius:6,fontSize:13,color:"var(--blue)",display:"flex",gap:10 }}>
                  <AlertTriangle size={15} style={{ flexShrink:0,marginTop:1 }}/>
                  For production: set MONGODB_URI, JWT_SECRET, and CLOUDINARY credentials in .env and use the /api/auth/change-password endpoint to update your password.
                </div>
                {[
                  { l:"Current Admin Email", v:"admin@sribalaji.com", disabled:true },
                  { l:"New Password", v:"", placeholder:"Enter new password", type:"password" },
                  { l:"Confirm Password", v:"", placeholder:"Confirm new password", type:"password" },
                ].map((f,i)=>(
                  <div key={i}>
                    <label style={{ fontSize:12,fontWeight:500,color:"var(--mut)",display:"block",marginBottom:6 }}>{f.l}</label>
                    <input className="inp" type={f.type||"text"} defaultValue={f.v} placeholder={f.placeholder} disabled={f.disabled}
                      style={{ opacity:f.disabled?.5:1,cursor:f.disabled?"not-allowed":"text" }}/>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <button className="btn btn-p" onClick={save} style={{ marginTop:22,alignSelf:"flex-start" }}>
          <Save size={15}/>Save Settings
        </button>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ MAIN ADMIN APP ━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newInqCount, setNewInqCount] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) { setLoading(false); return; }
      try {
        const res = await adminApi.getMe();
        if (res.data.success) {
          setUser(res.data.user);
          // Also fetch stats for the badge
          const statsRes = await adminApi.getDashboard();
          if (statsRes.data.success) setNewInqCount(statsRes.data.data.overview.newInquiries);
        }
        else localStorage.removeItem("admin_token");
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("admin_token");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const VIEWS = {
    dashboard: <DashboardView/>,
    inquiries: <InquiriesView/>,
    gallery:   <GalleryView/>,
    reviews:   <ReviewsView/>,
    services:  <ServicesView/>,
    settings:  <SettingsView/>,
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",color:"var(--y)" }}>
        <RefreshCw className="spin" size={32}/>
      </div>
    );
  }

  if (!user) return <LoginPage onLogin={setUser}/>;

  const sideW = collapsed ? 64 : 240;

  return (
    <div style={{ background:"var(--bg)",minHeight:"100vh",fontFamily:"'Inter',sans-serif" }}>
      <AdminStyles/>

      {/* Sidebar — desktop */}
      <div style={{ display:"flex" }}>
        <div style={{ width:sideW,flexShrink:0,transition:"width .3s" }} className="hm-sidebar"/>
        <Sidebar active={view} setActive={v=>{setView(v);setMobileOpen(false);}} collapsed={collapsed} user={user} onLogout={logout} newCount={newInqCount}/>

        {/* Main content */}
        <div style={{ flex:1,marginLeft:sideW,transition:"margin-left .3s",minWidth:0 }}>
          {/* Top bar */}
          <div style={{ height:56,background:"var(--s1)",borderBottom:"1px solid var(--bdr)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",position:"sticky",top:0,zIndex:50 }}>
            <div style={{ display:"flex",alignItems:"center",gap:12 }}>
              <button onClick={()=>setCollapsed(v=>!v)} style={{ background:"none",border:"1px solid var(--bdr2)",color:"var(--mut)",width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",borderRadius:6,transition:"all .25s" }}
                onMouseEnter={e=>{e.currentTarget.style.color="var(--y)";e.currentTarget.style.borderColor="var(--y)"}}
                onMouseLeave={e=>{e.currentTarget.style.color="var(--mut)";e.currentTarget.style.borderColor="var(--bdr2)"}}>
                <Menu size={16}/>
              </button>
              <span style={{ fontSize:14,fontWeight:600,color:"var(--mut)" }}>
                {MENU.find(m=>m.id===view)?.label||"Dashboard"}
              </span>
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:12 }}>
              <a href="/" target="_blank" rel="noreferrer" className="btn btn-o btn-sm" style={{ textDecoration:"none" }}>
                <Eye size={12}/>View Site
              </a>
              <div style={{ width:32,height:32,borderRadius:"50%",background:"rgba(245,166,35,.15)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
                <User size={15} color="var(--y)"/>
              </div>
            </div>
          </div>

          {/* Page content */}
          <div style={{ padding:"clamp(18px,3vw,32px)" }}>
            {VIEWS[view]}
          </div>
        </div>
      </div>
    </div>
  );
}
