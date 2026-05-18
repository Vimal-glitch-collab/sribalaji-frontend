/**
 * Sri Balaji Earth Movers — Production Website v3
 * Phone: +91 9443239842
 * Sections: Navbar · Hero · Ticker · About · Services · JCB 3DX Specs
 *           Gallery · WhyUs · Reviews · Contact · Location · Footer
 */

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone, Mail, MapPin, Star, Menu, X, ArrowRight, Award,
  Clock, Users, CheckCircle, Settings, ChevronLeft, ChevronRight,
  Quote, Facebook, Instagram, Youtube, Send, MessageCircle, Eye,
  TrendingUp, ThumbsUp, BadgeCheck, Timer, Wrench, Shield,
  Navigation, Zap, BarChart2, Gauge, HardHat, Layers, ArrowUpRight
} from "lucide-react";
import { publicApi } from "@/lib/api";

/* ━━━━━━━━━━━━━━━━━━━━━━━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━ */
const PHONE       = "+91 9443239842";
const PHONE_RAW   = "919443239842";
const PHONE_TEL   = "tel:+919443239842";
const WA_BASE     = `https://wa.me/${PHONE_RAW}`;
const MAP_EMBED   = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.0!2d78.4965071!3d9.8545663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00cf6b3dab1f0b%3A0x9c7b9a0e2f3d4c5a!2sSri%20Balaji%20Earth%20Movers!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
const MAP_LINK    = "https://maps.app.goo.gl/BLcBhefkxFgvycNj8";

/* ━━━━━━━━━━━━━━━━━━━━━━━━ GLOBAL STYLES ━━━━━━━━━━━━━━━━━━━━━━━━ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700;900&family=Barlow+Condensed:wght@400;500;600;700;800;900&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'Barlow',sans-serif;background:#080808;color:#fff;overflow-x:hidden}

    :root{
      --blk:#080808;--coal:#101010;--ch1:#141414;--ch2:#1a1a1a;--ch3:#222222;
      --bdr:rgba(255,255,255,.07);--bdr2:rgba(255,255,255,.13);
      --y:#F5A623;--yd:#D4891A;--yl:#FFB84D;
      --mut:rgba(255,255,255,.55);--dim:rgba(255,255,255,.3);
      --nh:70px;--mw:1300px;--px:clamp(16px,4vw,48px);
    }

    .fd{font-family:'Bebas Neue',sans-serif;letter-spacing:.04em;line-height:.93}
    .fc{font-family:'Barlow Condensed',sans-serif}
    ::selection{background:var(--y);color:#000}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:#000}
    ::-webkit-scrollbar-thumb{background:var(--y)}

    @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes slideL{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:translateX(0)}}
    @keyframes slideR{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
    @keyframes kenBurns{0%{transform:scale(1.04)}100%{transform:scale(1.13)}}
    @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @keyframes glowP{0%,100%{box-shadow:0 0 18px rgba(245,166,35,.32)}50%{box-shadow:0 0 40px rgba(245,166,35,.72)}}
    @keyframes pulseRing{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.75);opacity:0}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes barFill{from{width:0}to{width:var(--w)}}
    @keyframes moveTxt{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
    @keyframes borderPulse{0%,100%{border-color:rgba(245,166,35,.15)}50%{border-color:rgba(245,166,35,.6)}}
    @keyframes specSlide{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}

    .rv{opacity:0;transform:translateY(22px);transition:opacity .65s ease,transform .65s ease}
    .rv.in{opacity:1;transform:translateY(0)}
    .rvl{opacity:0;transform:translateX(-22px);transition:opacity .65s ease,transform .65s ease}
    .rvl.in{opacity:1;transform:translateX(0)}
    .rvr{opacity:0;transform:translateX(22px);transition:opacity .65s ease,transform .65s ease}
    .rvr.in{opacity:1;transform:translateX(0)}
    .rvs{opacity:0;transform:scale(.94);transition:opacity .6s ease,transform .6s ease}
    .rvs.in{opacity:1;transform:scale(1)}
    .d1{transition-delay:.04s}.d2{transition-delay:.10s}.d3{transition-delay:.16s}
    .d4{transition-delay:.22s}.d5{transition-delay:.28s}.d6{transition-delay:.34s}
    .d7{transition-delay:.40s}.d8{transition-delay:.46s}

    /* Nav */
    .nav{position:fixed;top:0;left:0;right:0;z-index:200;height:var(--nh);transition:background .3s,box-shadow .3s}
    .nav.solid{background:rgba(8,8,8,.97);backdrop-filter:blur(24px);box-shadow:0 1px 0 var(--bdr),0 8px 32px rgba(0,0,0,.5)}
    .ni{max-width:var(--mw);margin:0 auto;height:100%;padding:0 var(--px);display:flex;align-items:center;justify-content:space-between;gap:20px}
    .nl{font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:12.5px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.72);background:none;border:none;cursor:pointer;padding:5px 0;position:relative;transition:color .25s}
    .nl::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:2px;background:var(--y);transition:width .3s}
    .nl:hover,.nl.act{color:var(--y)}
    .nl:hover::after,.nl.act::after{width:100%}

    /* Buttons */
    .btn{display:inline-flex;align-items:center;gap:8px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border:none;text-decoration:none;position:relative;overflow:hidden;transition:all .3s ease}
    .btn:active{transform:scale(.97)}
    .btn-p{background:var(--y);color:#000;padding:14px 30px;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))}
    .btn-p:hover{background:var(--yl);box-shadow:0 6px 28px rgba(245,166,35,.38)}
    .btn-o{background:transparent;color:#fff;padding:13px 28px;border:1.5px solid rgba(255,255,255,.28)}
    .btn-o:hover{border-color:var(--y);color:var(--y)}
    .btn-yo{background:transparent;color:var(--y);padding:12px 24px;border:1.5px solid var(--y)}
    .btn-yo:hover{background:var(--y);color:#000}
    .btn-wa{background:#25D366;color:#fff;padding:13px 24px;clip-path:none}
    .btn-wa:hover{background:#20bc5a}
    .btn-sm{font-size:12px;padding:10px 22px;letter-spacing:1.5px}
    .btn-xs{font-size:11px;padding:8px 18px;letter-spacing:1.5px}

    .sl{display:inline-flex;align-items:center;gap:10px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:11.5px;letter-spacing:4px;text-transform:uppercase;color:var(--y)}
    .sl::before{content:'';width:26px;height:2px;background:var(--y);flex-shrink:0}

    .sh{font-family:'Bebas Neue',sans-serif;letter-spacing:.03em;line-height:.92;font-size:clamp(40px,6vw,78px);color:#fff}

    .mw{max-width:var(--mw);margin:0 auto;padding:0 var(--px)}
    .sec{padding:clamp(72px,9vw,120px) var(--px)}

    /* Ticker */
    .twr{overflow:hidden;background:var(--y);padding:13px 0;cursor:default}
    .tt{display:flex;width:max-content;animation:ticker 30s linear infinite}
    .tt:hover{animation-play-state:paused}
    .ti{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#000;white-space:nowrap;padding:0 40px}

    /* Progress */
    .pt{height:3px;background:rgba(255,255,255,.08);border-radius:2px;overflow:hidden}
    .pf{height:100%;background:linear-gradient(90deg,var(--y),var(--yl));border-radius:2px;width:var(--w);animation:barFill 1.5s cubic-bezier(.22,1,.36,1) .2s both}

    /* Service cards */
    .svc{position:relative;overflow:hidden;background:var(--ch2);border:1px solid var(--bdr);transition:all .4s cubic-bezier(.22,1,.36,1);cursor:pointer}
    .svc::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2.5px;background:var(--y);transform:scaleX(0);transform-origin:left;transition:transform .4s}
    .svc:hover{transform:translateY(-8px);border-color:rgba(245,166,35,.3);box-shadow:0 24px 56px rgba(0,0,0,.5)}
    .svc:hover::after{transform:scaleX(1)}
    .svc:hover .si{transform:scale(1.07);filter:brightness(.6)}
    .svc:hover .sic{background:var(--y)}
    .si{transition:transform .55s ease,filter .4s ease}

    /* JCB spec cards */
    .spec-card{background:var(--ch2);border:1px solid var(--bdr);transition:all .4s cubic-bezier(.22,1,.36,1);position:relative;overflow:hidden}
    .spec-card:hover{border-color:rgba(245,166,35,.3);box-shadow:0 20px 48px rgba(0,0,0,.45)}
    .spec-tab{padding:10px 16px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;border:none;transition:all .3s;background:transparent;color:rgba(255,255,255,.45)}
    .spec-tab.active{background:var(--y);color:#000}
    .spec-tab:hover:not(.active){color:var(--y)}
    .feat-chip{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(245,166,35,.08);border:1px solid rgba(245,166,35,.2);font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;color:rgba(255,255,255,.8)}
    .machine-badge{position:absolute;top:14px;left:14px;z-index:2;background:var(--y);color:#000;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:10.5px;letter-spacing:2px;padding:5px 12px;text-transform:uppercase}

    /* Gallery */
    .gi{overflow:hidden;position:relative;cursor:pointer}
    .gi img{transition:transform .5s ease,filter .4s ease;width:100%;height:100%;object-fit:cover;display:block}
    .gi:hover img{transform:scale(1.09);filter:brightness(.5)}
    .go{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .4s}
    .gi:hover .go{opacity:1}

    /* Testimonials */
    .tc{padding:34px 30px;border:1px solid var(--bdr);transition:all .35s ease;position:relative;background:var(--ch2)}
    .tc:hover{transform:translateY(-4px);border-color:rgba(245,166,35,.22)}
    .tc.ft{background:var(--y);border-color:var(--y)}

    /* Why cards */
    .wc{padding:30px 26px;border:1px solid var(--bdr);background:var(--ch2);position:relative;overflow:hidden;transition:all .4s cubic-bezier(.22,1,.36,1)}
    .wc::before{content:'';position:absolute;top:0;left:0;right:0;height:2.5px;background:var(--y);transform:scaleX(0);transform-origin:left;transition:transform .4s}
    .wc:hover{transform:translateY(-6px);border-color:rgba(245,166,35,.2);box-shadow:0 20px 48px rgba(0,0,0,.4)}
    .wc:hover::before{transform:scaleX(1)}
    .wi{width:54px;height:54px;background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.2);display:flex;align-items:center;justify-content:center;margin-bottom:18px;transition:background .3s}
    .wc:hover .wi{background:rgba(245,166,35,.18)}

    /* Form */
    .fi{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:#fff;padding:14px 18px;font-family:'Barlow',sans-serif;font-size:14px;outline:none;transition:border-color .3s,background .3s}
    .fi:focus{border-color:var(--y);background:rgba(245,166,35,.04)}
    .fi::placeholder{color:rgba(255,255,255,.28)}
    select.fi option{background:#1a1a1a;color:#fff}

    /* WhatsApp FAB */
    .wf{position:fixed;bottom:26px;right:26px;z-index:500;width:58px;height:58px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;text-decoration:none;animation:glowP 2.5s ease-in-out infinite;box-shadow:0 6px 24px rgba(37,211,102,.4);transition:transform .3s}
    .wf::before{content:'';position:absolute;inset:0;border-radius:50%;border:2px solid #25D366;animation:pulseRing 2s ease-out infinite}
    .wf:hover{transform:scale(1.12)}

    /* Hero moving text */
    .hmt{overflow:hidden;white-space:nowrap;border-top:1px solid rgba(255,255,255,.07);padding:12px 0}
    .hmtr{display:inline-block;animation:moveTxt 22s linear infinite}

    /* Mobile menu */
    .mm{position:fixed;inset:0;z-index:199;background:rgba(8,8,8,.98);backdrop-filter:blur(20px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;transform:translateX(100%);transition:transform .4s cubic-bezier(.22,1,.36,1)}
    .mm.open{transform:translateX(0)}
    .ml{font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,7vw,50px);letter-spacing:3px;color:#fff;background:none;border:none;cursor:pointer;transition:color .25s}
    .ml:hover{color:var(--y)}

    /* Map */
    .map-frame{display:block;filter:invert(.88) hue-rotate(183deg) saturate(.85)}

    /* Stat num */
    .sn{font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,68px);line-height:1;color:#fff}

    /* Grid responsive */
    @media(max-width:1100px){.g4{grid-template-columns:repeat(2,1fr)!important}}
    @media(max-width:900px){.g3{grid-template-columns:repeat(2,1fr)!important}.g32{grid-template-columns:1fr!important}}
    @media(max-width:768px){
      :root{--nh:62px}
      .hm{display:none!important}
      .sec{padding:56px var(--px)}
      .sh{font-size:clamp(36px,9vw,54px)}
      .g4,.g3,.g2{grid-template-columns:1fr!important}
      .g22{grid-template-columns:repeat(2,1fr)!important}
      .g4g{grid-template-columns:repeat(2,1fr)!important}
    }
    @media(max-width:480px){
      .g22,.g4g{grid-template-columns:1fr!important}
      .btn-p{padding:12px 22px;font-size:12px}
      .btn-o{padding:12px 20px;font-size:12px}
    }
  `}</style>
);

/* ━━━━━━━━━━━━━━━━━━━━━━━━ HOOKS ━━━━━━━━━━━━━━━━━━━━━━━━ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv,.rvl,.rvr,.rvs");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1, rootMargin: "0px 0px -28px 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}

function AnimCounter({ to, suffix = "", dur = 2000 }) {
  const [n, setN] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let s = null;
      const step = ts => {
        if (!s) s = ts;
        const p = Math.min((ts - s) / dur, 1);
        setN(Math.floor((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(step); else setN(to);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to, dur]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ DATA ━━━━━━━━━━━━━━━━━━━━━━━━ */
const NAV = [
  { id:"hero",    label:"Home"     },
  { id:"about",   label:"About"    },
  { id:"services",label:"Services" },
  { id:"jcb3dx",  label:"JCB 3DX" },
  { id:"gallery", label:"Gallery"  },
  { id:"why",     label:"Why Us"   },
  { id:"reviews", label:"Reviews"  },
  { id:"contact", label:"Contact"  },
];

const SERVICES = [
  { em:"⛏️", t:"Earth Excavation",      d:"Precision deep and shallow excavation for house foundations, basements, water tanks, irrigation canals, open drains and trenching.", img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=82" },
  { em:"🌍", t:"Land Levelling",         d:"Agricultural and residential plot grading, contour levelling for farms, industrial sites and commercial land development projects.", img:"https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=700&q=82" },
  { em:"🛣️", t:"Road Construction",      d:"Sub-grade preparation, WBM base laying, shoulder cutting and earthwork support for government and private road projects.", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=82" },
  { em:"🏗️", t:"Site Preparation",       d:"Clearing, grubbing, topsoil stripping, and access road creation before any building or construction begins on site.", img:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=82" },
  { em:"💥", t:"Demolition Support",     d:"Controlled dismantling of old structures, slabs, compound walls and buildings with complete debris clearance and site handover.", img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=82" },
  { em:"🚛", t:"Soil & Material Haulage",d:"Efficient transport of excavated earth, sand, gravel, rubble and construction debris using JCB loading with tipper coordination.", img:"https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=700&q=82" },
];

const JCB_SPECS = {
  engine:    [{ k:"Engine Model",        v:"JCB EcoMAX 444"         },
              { k:"Power Output",        v:"74 HP (55.2 kW)"        },
              { k:"Torque",              v:"336 Nm @ 1,400 rpm"     },
              { k:"Engine Type",         v:"4-Cyl, Turbocharged DI" },
              { k:"Fuel Tank",           v:"160 Litres"             }],
  excavator: [{ k:"Max Dig Depth",       v:"5.97 m (Std) / 6.36 m (Xtra)" },
              { k:"Max Reach (Ground)",  v:"9.10 m"                 },
              { k:"Max Dig Force",       v:"49.8 kN"                },
              { k:"Bucket Capacity",     v:"0.29 m³ (Std)"          },
              { k:"Slew Arc",            v:"180°"                   }],
  loader:    [{ k:"Loader Lift Capacity",v:"3,490 kg"               },
              { k:"Loader Reach",        v:"1,232 mm"               },
              { k:"Bucket Capacity",     v:"1.0 m³"                 },
              { k:"Breakout Force",      v:"62.6 kN"                },
              { k:"Max Dump Height",     v:"2,730 mm"               }],
  machine:   [{ k:"Operating Weight",    v:"7,850 kg"               },
              { k:"Transport Width",     v:"2,360 mm"               },
              { k:"Transport Length",    v:"5,930 mm"               },
              { k:"Max Travel Speed",    v:"38 km/h"                },
              { k:"Hydraulic Flow",      v:"152 lpm"                }],
};

const JCB_FEATURES = [
  "Powershift Transmission","Servo-Assisted Pilot Controls","LCD Instrument Panel",
  "Auto-Idle & Auto-Shutdown","Electric Over Hydraulic Controls","4-Wheel Drive Option",
  "Extendable Dipper (Xtra)","Central Greasing System","ROPS/FOPS Cab",
  "JCB LiveLink Telematics","Smooth Ride System","Positive Flow Control",
];

const JCB_APPLICATIONS = [
  { ic:"🏠", t:"House Construction",   d:"Foundation digging, basement excavation, site clearing" },
  { ic:"🌾", t:"Agriculture",           d:"Farm bunding, pond digging, irrigation canal works" },
  { ic:"🛣️", t:"Road Works",           d:"Sub-grade prep, drain cutting, road widening" },
  { ic:"🏭", t:"Industrial Sites",      d:"Factory foundation, site levelling, soil removal" },
  { ic:"💧", t:"Water & Drainage",      d:"Water tank digging, drainage trenching, sump pits" },
  { ic:"🏘️", t:"Plot Development",     d:"Plot clearing, levelling, boundary digging" },
];

const GALLERY = [
  { img:"https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&q=82", tall:true  },
  { img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=82", tall:false },
  { img:"https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=700&q=82", tall:false },
  { img:"https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=700&q=82", tall:true  },
  { img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=82",    tall:false },
  { img:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=82",    tall:false },
  { img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=82", tall:false },
  { img:"https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&q=82", tall:true  },
];

const WHY = [
  { icon:<Award size={24} color="var(--y)"/>,      t:"20+ Years Expertise",      d:"Since 2004 we have mastered JCB 3DX operations across Sivagangai District — no task too complex, no terrain too tough." },
  { icon:<BadgeCheck size={24} color="var(--y)"/>, t:"Certified JCB Operators",  d:"All 3 machines are operated by JCB-trained, licensed professionals who follow strict safety protocols on every site." },
  { icon:<Timer size={24} color="var(--y)"/>,      t:"6 AM – 6 PM, Every Day",  d:"Extended 12-hour operations 7 days a week including Sundays and public holidays to keep your project on schedule." },
  { icon:<Wrench size={24} color="var(--y)"/>,     t:"JCB-Serviced Machines",    d:"Regular JCB-authorised servicing and preventive maintenance. Zero unplanned breakdowns, always ready when you call." },
  { icon:<TrendingUp size={24} color="var(--y)"/>, t:"Fair & Transparent Rates", d:"Hourly and project-based pricing with no hidden charges. Best value earth works in Sivagangai District." },
  { icon:<ThumbsUp size={24} color="var(--y)"/>,   t:"1,000+ Projects Delivered", d:"From small residential plots to large highway contracts — our project track record across Tamil Nadu speaks for itself." },
];

const REVIEWS = [
  { name:"Rajesh Kumar",       role:"Civil Contractor, Madurai",          stars:5, text:"Sri Balaji Earth Movers is hands-down the best JCB service in Tamil Nadu. Operators are expert-level skilled, machine condition is top notch. Finished our foundation excavation 2 days early!", av:"RK" },
  { name:"Senthil Murugan",    role:"Real Estate Developer, Sivagangai",  stars:5, text:"Been using their JCB 3DX for the last 4 years. Their 20 years of experience shows — professional, punctual, and very competitive pricing. My go-to contractor for all earth works.", av:"SM" },
  { name:"Anitha Devi",        role:"Agricultural Land Owner, Karaikudi", stars:5, text:"They levelled our 10-acre farm in one day! The operator was very careful near the boundary walls. Excellent quality, very fair price, and no damage to adjacent land.", av:"AD" },
  { name:"Mohan Raj",          role:"Construction Manager, Chennai",       stars:5, text:"Used their JCB 3DX for road work near Sivagangai. Machine was in excellent condition. Operator followed all safety rules. 24/7 responsive team. Highly recommended.", av:"MR" },
  { name:"Krishnamurthy S.",   role:"Panchayat Engineer, Sivagangai",      stars:4, text:"Good service for our village road widening. Operator arrived on time, finished within budget. Followed all safety protocols. Will definitely recommend to other panchayats.", av:"KR" },
  { name:"Vijaya Rajan",       role:"Plot Developer, Devakottai",          stars:5, text:"Called at 6 AM, the JCB arrived by 7 AM sharp. Rare reliability! Site prep was done perfectly with no damage to adjacent plots. Truly professional from start to finish.", av:"VR" },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━ NAVBAR ━━━━━━━━━━━━━━━━━━━━━━━━ */
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <>
      <nav className={`nav ${scrolled || open ? "solid" : ""}`}>
        <div className="ni">
          {/* Logo */}
          <button onClick={() => go("hero")} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:13 }}>
            <div style={{ width:46,height:46,background:"var(--y)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,clipPath:"polygon(0 0,calc(100% - 9px) 0,100% 9px,100% 100%,9px 100%,0 calc(100% - 9px))" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M2 18L6 8l5 5 5-7 6 9" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 22h20" stroke="#000" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="fc" style={{ fontSize:20,fontWeight:900,lineHeight:1.05,letterSpacing:.5 }}>
                <span style={{ color:"var(--y)" }}>SRI BALAJI</span>
              </div>
              <div className="fc" style={{ fontSize:10,fontWeight:600,letterSpacing:"3.5px",color:"rgba(255,255,255,.38)",textTransform:"uppercase" }}>
                EARTH MOVERS
              </div>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hm" style={{ display:"flex",alignItems:"center",gap:28 }}>
            {NAV.map(l => (
              <button key={l.id} className={`nl ${active === l.id ? "act" : ""}`} onClick={() => go(l.id)}>{l.label}</button>
            ))}
          </div>

          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <a href={PHONE_TEL} className="btn btn-p btn-sm hm" style={{ textDecoration:"none" }}>
              <Phone size={13}/><span>Call Now</span>
            </a>
            <a href="/admin" className="btn hm"
              style={{ textDecoration:"none",background:"transparent",color:"rgba(255,255,255,.45)",padding:"9px 16px",
                border:"1px solid rgba(255,255,255,.15)",fontSize:"11px",letterSpacing:"1.5px",clipPath:"none" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--y)";e.currentTarget.style.color="var(--y)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.15)";e.currentTarget.style.color="rgba(255,255,255,.45)"}}>
              <Settings size={12}/><span>Admin</span>
            </a>
            <button onClick={() => setOpen(v => !v)}
              style={{ width:42,height:42,border:"1px solid rgba(255,255,255,.15)",background:"transparent",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"border-color .3s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--y)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"}
              aria-label="Toggle menu">
              {open ? <X size={19}/> : <Menu size={19}/>}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mm ${open ? "open" : ""}`}>
        {NAV.map(l => <button key={l.id} className="ml" onClick={() => go(l.id)}>{l.label}</button>)}
        <a href={PHONE_TEL} className="btn btn-p" style={{ textDecoration:"none",marginTop:8 }}>
          <Phone size={15}/><span>{PHONE}</span>
        </a>
        <a href={`${WA_BASE}?text=Hi%2C+I+need+JCB+3DX+information`} target="_blank" rel="noreferrer"
          style={{ display:"flex",alignItems:"center",gap:8,color:"#25D366",fontSize:14,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:2,textDecoration:"none" }}>
          <MessageCircle size={15}/> WHATSAPP
        </a>
        <a href="/admin"
          style={{ display:"flex",alignItems:"center",gap:8,color:"rgba(255,255,255,.4)",fontSize:12,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600,letterSpacing:2,textDecoration:"none",marginTop:4 }}>
          <Settings size={13}/> ADMIN PORTAL
        </a>
      </div>
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━ */
function Hero() {
  const [rdy, setRdy] = useState(false);
  useEffect(() => { setTimeout(() => setRdy(true), 80); }, []);
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" style={{ position:"relative",height:"100vh",minHeight:640,overflow:"hidden" }}>
      <div style={{ position:"absolute",inset:0,overflow:"hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=88"
          alt="JCB 3DX construction site"
          style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 38%",
            animation: rdy ? "kenBurns 14s ease-in-out alternate infinite" : "none",
            transformOrigin:"center" }}
        />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to right,rgba(8,8,8,.97) 0%,rgba(8,8,8,.72) 55%,rgba(8,8,8,.28) 100%)" }}/>
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(8,8,8,.96) 0%,transparent 45%)" }}/>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(to right,var(--y),rgba(245,166,35,.1))" }}/>
      </div>

      <div style={{ position:"relative",zIndex:2,height:"100%",display:"flex",flexDirection:"column",justifyContent:"center" }}>
        <div className="mw" style={{ paddingTop:"var(--nh)" }}>

          <div className="sl" style={{ marginBottom:20,opacity:rdy?1:0,animation:rdy?"slideL .6s ease .15s both":"none" }}>
            Sivagangai, Tamil Nadu · Since 2004 · 20+ Years
          </div>

          <div className="fd" style={{ fontSize:"clamp(13px,2.2vw,20px)",color:"var(--y)",letterSpacing:"7px",marginBottom:6,
            opacity:rdy?1:0,animation:rdy?"fadeUp .6s ease .22s both":"none" }}>
            SRI BALAJI EARTH MOVERS
          </div>

          <h1 className="fd" style={{ fontSize:"clamp(54px,9vw,122px)",color:"#fff",
            opacity:rdy?1:0,animation:rdy?"fadeUp .7s ease .30s both":"none" }}>
            MOVING EARTH,
          </h1>
          <h1 className="fd" style={{ fontSize:"clamp(54px,9vw,122px)",
            opacity:rdy?1:0,animation:rdy?"fadeUp .7s ease .38s both":"none" }}>
            <span style={{ color:"var(--y)" }}>BUILDING</span>{" "}
            <span style={{ color:"#fff" }}>TRUST</span>
          </h1>

          <p className="fc" style={{ fontSize:"clamp(14px,1.8vw,19px)",fontWeight:400,color:"rgba(255,255,255,.58)",
            maxWidth:500,marginTop:18,lineHeight:1.7,opacity:rdy?1:0,animation:rdy?"fadeUp .7s ease .46s both":"none" }}>
            Professional JCB 3DX Rental &amp; Earth Works across Tamil Nadu.
            Residential, Agricultural, Commercial &amp; Government Projects.
          </p>

          <div style={{ display:"flex",gap:14,flexWrap:"wrap",marginTop:34,
            opacity:rdy?1:0,animation:rdy?"fadeUp .7s ease .54s both":"none" }}>
            <button className="btn btn-p" onClick={() => go("contact")}>
              <Send size={14}/><span>Get Free Quote</span>
            </button>
            <a href={PHONE_TEL} className="btn btn-o" style={{ textDecoration:"none" }}>
              <Phone size={14}/><span>{PHONE}</span>
            </a>
          </div>

          <div style={{ display:"flex",alignItems:"center",gap:10,marginTop:28,
            opacity:rdy?1:0,animation:rdy?"fadeUp .7s ease .62s both":"none" }}>
            {[1,2,3,4].map(i => <Star key={i} size={16} fill="var(--y)" color="var(--y)"/>)}
            <Star size={16} fill="transparent" color="var(--y)" strokeWidth={1.8}/>
            <span className="fc" style={{ color:"var(--y)",fontWeight:800,fontSize:15 }}>4.6 / 5</span>
            <span style={{ color:"rgba(255,255,255,.33)",fontSize:13 }}>Google Rating</span>
          </div>
        </div>

        {/* Moving text strip */}
        <div className="hmt" style={{ position:"absolute",bottom:76,left:0,right:0,
          opacity:rdy?1:0,transition:"opacity 1s ease 1s" }}>
          <div className="hmtr">
            {[1,2,3,4,5,6].map(n => (
              <span key={n} className="fd" style={{ fontSize:"clamp(22px,3vw,38px)",letterSpacing:"7px",
                color:"transparent",WebkitTextStroke:"1px rgba(255,255,255,.1)",paddingRight:100 }}>
                MOVING EARTH, BUILDING TRUST ◆
              </span>
            ))}
          </div>
        </div>

        {/* Stat cards — desktop */}
        <div className="hm" style={{ position:"absolute",bottom:88,right:"var(--px)",zIndex:3,
          display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,
          opacity:rdy?1:0,animation:rdy?"slideR .7s ease .7s both":"none" }}>
          {[
            { v:20,   s:"+",   l:"Years Exp."   },
            { v:1000, s:"+",   l:"Projects"     },
            { v:3,    s:"",    l:"JCB 3DX Units" },
            { v:100,  s:"%",   l:"Satisfaction" },
          ].map((x,i) => (
            <div key={i} style={{ background:"rgba(8,8,8,.88)",backdropFilter:"blur(14px)",
              border:"1px solid rgba(255,255,255,.07)",padding:"16px 20px",textAlign:"center",minWidth:110 }}>
              <div className="sn" style={{ fontSize:"clamp(28px,4vw,40px)" }}><AnimCounter to={x.v} suffix={x.s}/></div>
              <div className="fc" style={{ fontSize:10,color:"rgba(255,255,255,.38)",letterSpacing:2,marginTop:3,textTransform:"uppercase" }}>{x.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position:"absolute",bottom:24,left:"50%",transform:"translateX(-50%)",zIndex:3,
        display:"flex",flexDirection:"column",alignItems:"center",gap:5 }}>
        <div style={{ width:1,height:36,background:"linear-gradient(to bottom,var(--y),transparent)" }}/>
        <span className="fc" style={{ fontSize:9,letterSpacing:3.5,color:"rgba(255,255,255,.25)",textTransform:"uppercase" }}>SCROLL</span>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ TICKER ━━━━━━━━━━━━━━━━━━━━━━━━ */
function Ticker() {
  const items = ["JCB 3DX Rental","Earth Excavation","Land Levelling","Road Construction","Site Preparation","Demolition Work","Soil Haulage","Foundation Digging","Canal Work","Plot Clearing","Farm Bunding","Basement Digging"];
  const dbl = [...items, ...items];
  return (
    <div className="twr">
      <div className="tt">{dbl.map((t,i) => <span key={i} className="ti">◆ {t}</span>)}</div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ ABOUT ━━━━━━━━━━━━━━━━━━━━━━━━ */
function About() {
  const skills = [
    { l:"JCB 3DX Operation & Rental", p:99 },
    { l:"Excavation & Earthworks",    p:98 },
    { l:"Land Development Projects",  p:94 },
    { l:"Client Satisfaction Rate",   p:97 },
  ];

  return (
    <section id="about" className="sec" style={{ background:"var(--ch1)",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(245,166,35,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(245,166,35,.022) 1px,transparent 1px)",backgroundSize:"54px 54px",pointerEvents:"none" }}/>
      <div className="mw" style={{ position:"relative" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(36px,6vw,96px)",alignItems:"center" }} className="g2">

          <div className="rvl" style={{ position:"relative" }}>
            <div style={{ position:"relative",overflow:"hidden" }}>
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85"
                alt="JCB 3DX earth moving Tamil Nadu"
                style={{ width:"100%",height:"clamp(360px,45vw,540px)",objectFit:"cover",filter:"brightness(.82)",display:"block" }}/>
              <div style={{ position:"absolute",bottom:-1,right:-1,background:"var(--y)",padding:"22px 26px",
                clipPath:"polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px)" }}>
                <div className="fd" style={{ fontSize:50,color:"#000",lineHeight:1 }}>20+</div>
                <div className="fc" style={{ fontSize:11,fontWeight:800,letterSpacing:2,color:"rgba(0,0,0,.62)" }}>YEARS OF TRUST</div>
              </div>
            </div>
            <div style={{ position:"absolute",top:-14,left:-14,width:68,height:68,border:"2.5px solid var(--y)",opacity:.38 }}/>
          </div>

          <div className="rvr">
            <div className="sl" style={{ marginBottom:18 }}>Our Story</div>
            <h2 className="sh" style={{ marginBottom:18 }}>
              TAMIL NADU'S MOST<br/>
              <span style={{ color:"var(--y)" }}>TRUSTED</span><br/>
              EARTH MOVER
            </h2>
            <p style={{ color:"var(--mut)",fontSize:14.5,lineHeight:1.82,marginBottom:13 }}>
              Founded in <strong style={{ color:"#fff" }}>2004</strong>, Sri Balaji Earth Movers has built an
              unmatched reputation over 20+ years of professional earth works across Sivagangai District and Tamil Nadu.
              We operate <strong style={{ color:"#fff" }}>3 well-maintained JCB 3DX Backhoe Loaders</strong> — India's
              most trusted machine — completing over <strong style={{ color:"#fff" }}>1,000 projects</strong> ranging from
              small house plots to large government contracts.
            </p>
            <p style={{ color:"var(--mut)",fontSize:14.5,lineHeight:1.82,marginBottom:30 }}>
              Every operator is JCB-certified, every machine is regularly serviced, and every project gets our full attention
              from day one. We operate <strong style={{ color:"#fff" }}>6 AM to 6 PM, 7 days a week</strong> — because
              your deadlines matter to us.
            </p>

            <div style={{ display:"flex",flexDirection:"column",gap:16,marginBottom:34 }}>
              {skills.map((s,i) => (
                <div key={i}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:7 }}>
                    <span className="fc" style={{ fontSize:12.5,fontWeight:700,letterSpacing:1.5,color:"rgba(255,255,255,.78)" }}>{s.l}</span>
                    <span style={{ color:"var(--y)",fontWeight:700,fontSize:13 }}>{s.p}%</span>
                  </div>
                  <div className="pt"><div className="pf" style={{ "--w":`${s.p}%` }}/></div>
                </div>
              ))}
            </div>

            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }} className="g22">
              {[
                { ic:"🎯",h:"Mission",t:"Deliver precision earth works with 3 JCB 3DX machines and expert certified operators — on time, every time, across Tamil Nadu." },
                { ic:"🔭",h:"Vision", t:"Be the most trusted earth works contractor in South Tamil Nadu — known for professionalism, safety, and unwavering reliability." },
              ].map((c,i) => (
                <div key={i} style={{ padding:"17px 18px",border:"1px solid var(--bdr)",background:"rgba(255,255,255,.02)" }}>
                  <div style={{ fontSize:22,marginBottom:8 }}>{c.ic}</div>
                  <div className="fc" style={{ fontWeight:800,fontSize:12.5,letterSpacing:1.5,color:"var(--y)",marginBottom:6,textTransform:"uppercase" }}>{c.h}</div>
                  <p style={{ fontSize:12.5,color:"var(--mut)",lineHeight:1.65 }}>{c.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="rv" style={{ marginTop:"clamp(44px,6vw,72px)",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"var(--bdr)" }}>
          {[
            { v:20,   s:"+", l:"Years Experience",  ic:<Award size={20} color="var(--y)"/> },
            { v:1000, s:"+", l:"Projects Completed", ic:<CheckCircle size={20} color="var(--y)"/> },
            { v:3,    s:"",  l:"JCB 3DX Machines",  ic:<Settings size={20} color="var(--y)"/> },
            { v:100,  s:"%", l:"Satisfaction Rate",  ic:<ThumbsUp size={20} color="var(--y)"/> },
          ].map((x,i) => (
            <div key={i} style={{ background:"var(--ch1)",padding:"clamp(20px,3vw,32px) 16px",textAlign:"center" }}>
              <div style={{ display:"flex",justifyContent:"center",marginBottom:8 }}>{x.ic}</div>
              <div className="sn"><AnimCounter to={x.v} suffix={x.s}/></div>
              <div className="fc" style={{ fontSize:10.5,color:"var(--dim)",letterSpacing:2,marginTop:5,textTransform:"uppercase" }}>{x.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ SERVICES ━━━━━━━━━━━━━━━━━━━━━━━━ */
function Services() {
  return (
    <section id="services" className="sec" style={{ background:"var(--blk)" }}>
      <div className="mw">
        <div style={{ textAlign:"center",marginBottom:"clamp(36px,5vw,60px)" }}>
          <div className="sl rv" style={{ justifyContent:"center",marginBottom:16 }}>What We Do</div>
          <h2 className="sh rv d1">OUR <span style={{ color:"var(--y)" }}>SERVICES</span></h2>
          <p className="rv d2" style={{ color:"var(--mut)",fontSize:14.5,maxWidth:500,margin:"14px auto 0",lineHeight:1.72 }}>
            Full-spectrum earth works using JCB 3DX for residential, agricultural, commercial and government projects across Tamil Nadu.
          </p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22 }} className="g3">
          {SERVICES.map((s,i) => (
            <div key={i} className={`svc rv d${i+1}`}>
              <div style={{ height:190,overflow:"hidden",position:"relative" }}>
                <img src={s.img} alt={s.t} className="si" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                <div className="sic" style={{ position:"absolute",bottom:12,left:12,width:42,height:42,
                  background:"rgba(8,8,8,.82)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.1)",
                  display:"flex",alignItems:"center",justifyContent:"center",transition:"background .3s" }}>
                  <span style={{ fontSize:20 }}>{s.em}</span>
                </div>
              </div>
              <div style={{ padding:"22px 22px 26px" }}>
                <h3 className="fc" style={{ fontSize:20,fontWeight:800,letterSpacing:.4,color:"#fff",marginBottom:9 }}>{s.t}</h3>
                <p style={{ fontSize:13.5,color:"var(--mut)",lineHeight:1.72,marginBottom:18 }}>{s.d}</p>
                <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}
                  style={{ display:"flex",alignItems:"center",gap:6,color:"var(--y)",background:"none",border:"none",
                    cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:11.5,letterSpacing:2,textTransform:"uppercase" }}>
                  Get Quote <ArrowRight size={13}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ JCB 3DX SPECIFICATIONS ━━━━━━━━━━━━━━━━━━━━━━━━ */
function JCB3DX() {
  const [activeTab, setActiveTab] = useState("engine");
  const [activeImg, setActiveImg] = useState(0);

  const tabs = [
    { id:"engine",   label:"Engine"    },
    { id:"excavator",label:"Excavator" },
    { id:"loader",   label:"Loader"    },
    { id:"machine",  label:"Machine"   },
  ];

  const images = [
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=85",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85",
    "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=900&q=85",
  ];

  return (
    <section id="jcb3dx" className="sec" style={{ background:"var(--ch1)",position:"relative",overflow:"hidden" }}>
      {/* Giant watermark */}
      <div className="fd" style={{ position:"absolute",top:-30,right:-40,fontSize:"clamp(100px,20vw,280px)",
        color:"rgba(245,166,35,.025)",pointerEvents:"none",userSelect:"none",lineHeight:1 }}>3DX</div>

      <div className="mw" style={{ position:"relative" }}>
        {/* Header */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:22,
          marginBottom:"clamp(40px,5vw,64px)" }}>
          <div>
            <div className="sl rv" style={{ marginBottom:16 }}>Our Equipment</div>
            <h2 className="sh rv d1">
              JCB <span style={{ color:"var(--y)" }}>3DX</span><br/>
              SPECIFICATIONS
            </h2>
          </div>
          <div className="rv d2" style={{ maxWidth:340 }}>
            <div style={{ display:"flex",alignItems:"center",gap:12,padding:"16px 20px",
              background:"rgba(245,166,35,.08)",border:"1px solid rgba(245,166,35,.22)",marginBottom:14 }}>
              <div style={{ width:40,height:40,background:"var(--y)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <span className="fd" style={{ fontSize:22,color:"#000" }}>3</span>
              </div>
              <div>
                <div className="fc" style={{ fontSize:15,fontWeight:800,color:"#fff" }}>Well-Maintained JCB 3DX</div>
                <div style={{ fontSize:12,color:"var(--mut)" }}>Machines Available for Rental</div>
              </div>
            </div>
            <p style={{ fontSize:13.5,color:"var(--mut)",lineHeight:1.72 }}>
              We operate exclusively the JCB 3DX Backhoe Loader — India's No.1 construction machine. All 3 units are JCB-authorised serviced, operator-certified, and ready for deployment.
            </p>
          </div>
        </div>

        {/* Main content grid */}
        <div style={{ display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:28,marginBottom:36 }} className="g32">

          {/* Left: image + machine badge */}
          <div className="rvl" style={{ position:"relative" }}>
            {/* Main image */}
            <div style={{ position:"relative",overflow:"hidden",border:"1px solid var(--bdr)" }}>
              <div className="machine-badge">JCB 3DX · UNIT {activeImg + 1} / 3</div>
              <img src={images[activeImg]} alt={`JCB 3DX machine ${activeImg+1}`}
                style={{ width:"100%",height:"clamp(320px,40vw,460px)",objectFit:"cover",filter:"brightness(.85)",
                  transition:"opacity .4s ease",display:"block" }}/>
              {/* Status overlay */}
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",
                background:"linear-gradient(to top,rgba(8,8,8,.9),transparent)" }}>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                  <div style={{ width:8,height:8,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 8px rgba(34,197,94,.6)" }}/>
                  <span className="fc" style={{ fontSize:11.5,fontWeight:700,letterSpacing:2,color:"#22c55e" }}>AVAILABLE FOR RENTAL</span>
                </div>
              </div>
            </div>
            {/* Thumbnail row */}
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginTop:6 }}>
              {images.map((img,i) => (
                <div key={i} onClick={() => setActiveImg(i)}
                  style={{ height:70,overflow:"hidden",cursor:"pointer",border:`1px solid ${activeImg===i?"var(--y)":"rgba(255,255,255,.08)"}`,
                    opacity: activeImg===i ? 1 : 0.55, transition:"all .3s" }}>
                  <img src={img} alt={`Unit ${i+1}`}
                    style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                </div>
              ))}
            </div>
          </div>

          {/* Right: specs tabs */}
          <div className="rvr">
            <div className="spec-card">
              {/* Tab headers */}
              <div style={{ display:"flex",borderBottom:"1px solid var(--bdr)",overflow:"auto" }}>
                {tabs.map(t => (
                  <button key={t.id} className={`spec-tab ${activeTab===t.id?"active":""}`}
                    onClick={() => setActiveTab(t.id)}>
                    {t.label}
                  </button>
                ))}
              </div>
              {/* Spec rows */}
              <div style={{ padding:"0" }}>
                {JCB_SPECS[activeTab].map((sp,j) => (
                  <div key={j} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",
                    padding:"13px 20px",borderBottom: j < JCB_SPECS[activeTab].length-1 ? "1px solid var(--bdr)" : "none",
                    animation:"specSlide .3s ease" }}>
                    <span style={{ fontSize:13,color:"var(--mut)" }}>{sp.k}</span>
                    <span className="fc" style={{ fontSize:14,fontWeight:700,color:"#fff",textAlign:"right" }}>{sp.v}</span>
                  </div>
                ))}
              </div>
              {/* CTA */}
              <div style={{ padding:"16px 20px",background:"rgba(245,166,35,.05)",borderTop:"1px solid rgba(245,166,35,.15)" }}>
                <a href={PHONE_TEL} className="btn btn-p" style={{ textDecoration:"none",width:"100%",justifyContent:"center",fontSize:12 }}>
                  <Phone size={13}/><span>Book JCB 3DX Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="rv" style={{ marginBottom:32 }}>
          <div className="sl" style={{ marginBottom:20 }}>Key Features</div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8 }} className="g4g">
            {JCB_FEATURES.map((f,i) => (
              <div key={i} className="feat-chip rv" style={{ transitionDelay:`${i*.04}s` }}>
                <CheckCircle size={12} color="var(--y)" style={{ flexShrink:0 }}/>{f}
              </div>
            ))}
          </div>
        </div>

        {/* Applications */}
        <div>
          <div className="sl rv" style={{ marginBottom:20 }}>Applications &amp; Use Cases</div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }} className="g3">
            {JCB_APPLICATIONS.map((a,i) => (
              <div key={i} className={`rv d${i+1}`}
                style={{ padding:"20px 22px",border:"1px solid var(--bdr)",background:"rgba(255,255,255,.02)",
                  transition:"all .3s ease",cursor:"default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(245,166,35,.25)"; e.currentTarget.style.background="rgba(245,166,35,.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--bdr)"; e.currentTarget.style.background="rgba(255,255,255,.02)"; }}>
                <div style={{ fontSize:28,marginBottom:10 }}>{a.ic}</div>
                <div className="fc" style={{ fontSize:16,fontWeight:800,color:"#fff",marginBottom:7 }}>{a.t}</div>
                <p style={{ fontSize:13,color:"var(--mut)",lineHeight:1.65 }}>{a.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Availability banner */}
        <div className="rv" style={{ marginTop:40,padding:"clamp(22px,3vw,38px) clamp(22px,4vw,48px)",
          background:"rgba(245,166,35,.06)",border:"1px solid rgba(245,166,35,.18)",
          display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:22 }}>
          <div style={{ display:"flex",alignItems:"center",gap:16 }}>
            <div style={{ width:52,height:52,background:"rgba(245,166,35,.12)",border:"1px solid rgba(245,166,35,.25)",
              display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              <Clock size={24} color="var(--y)"/>
            </div>
            <div>
              <div className="fc" style={{ fontSize:10.5,fontWeight:700,letterSpacing:3,color:"var(--y)",marginBottom:3,textTransform:"uppercase" }}>Available Every Day</div>
              <div className="fd" style={{ fontSize:"clamp(20px,3vw,32px)",color:"#fff" }}>6:00 AM – 6:00 PM · All 3 Units Ready</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
            <a href={PHONE_TEL} className="btn btn-p" style={{ textDecoration:"none" }}>
              <Phone size={14}/><span>Call for Booking</span>
            </a>
            <a href={`${WA_BASE}?text=Hi%2C+I+need+to+book+a+JCB+3DX+for+my+project`} target="_blank" rel="noreferrer"
              className="btn btn-wa" style={{ textDecoration:"none" }}>
              <MessageCircle size={14}/><span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ GALLERY ━━━━━━━━━━━━━━━━━━━━━━━━ */
function Gallery() {
  const [lb, setLb] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // Hardcoded production URL as primary — NEXT_PUBLIC vars can be undefined at runtime
        const API_URL = process.env.NEXT_PUBLIC_API_URL
          || "https://sribalaji-api.onrender.com/api";
        const res = await fetch(`${API_URL}/gallery`, {
          method: "GET",
          headers: { "Accept": "application/json" },
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setGalleryItems(json.data);
        } else {
          // DB is empty — show static fallback
          setGalleryItems(GALLERY.map((g, i) => ({
            _id: `static_${i}`,
            image: { url: g.img },
            title: `Project ${i + 1}`,
            tall: g.tall,
          })));
        }
      } catch (err) {
        console.error("Gallery fetch error:", err);
        // API unreachable — show static fallback
        setGalleryItems(GALLERY.map((g, i) => ({
          _id: `static_${i}`,
          image: { url: g.img },
          title: `Project ${i + 1}`,
          tall: g.tall,
        })));
      } finally {
        setGalleryLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <section id="gallery" className="sec" style={{ background:"var(--blk)" }}>
      <div className="mw">
        <div style={{ textAlign:"center",marginBottom:"clamp(36px,5vw,56px)" }}>
          <div className="sl rv" style={{ justifyContent:"center",marginBottom:16 }}>Our Work</div>
          <h2 className="sh rv d1">PROJECT <span style={{ color:"var(--y)" }}>GALLERY</span></h2>
          <p className="rv d2" style={{ color:"var(--mut)",fontSize:14.5,maxWidth:420,margin:"14px auto 0",lineHeight:1.7 }}>
            Real photos from real projects — excavation, levelling, road work and site preparation across Tamil Nadu.
          </p>
        </div>

        {galleryLoading ? (
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gridAutoRows:"200px",gap:8 }} className="g4g">
            {[...Array(8)].map((_,i) => (
              <div key={i} style={{ background:"var(--ch2)",borderRadius:2,animation:"pulse 1.5s ease-in-out infinite",
                gridRow: i===0||i===3||i===7 ? "span 2":"span 1",opacity:.5 }}/>
            ))}
          </div>
        ) : galleryItems.length === 0 ? (
          <div style={{ textAlign:"center",padding:"60px 20px",color:"var(--mut)",fontSize:15 }}>
            <div style={{ fontSize:40,marginBottom:16 }}>📷</div>
            <p>Gallery coming soon — check back after our admin uploads project photos.</p>
          </div>
        ) : (
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gridAutoRows:"200px",gap:8 }} className="g4g">
            {galleryItems.map((g, i) => {
              const imgUrl = g.image?.url || g.img;
              const isTall = g.tall || false;
              return (
                <div key={g._id || i} className={`gi rv d${(i%4)+1}`}
                  style={{ gridRow: isTall ? "span 2" : "span 1" }}
                  onClick={() => setLb(imgUrl)}>
                  <img src={imgUrl} alt={g.title || `Construction project ${i+1}`}/>
                  <div className="go" style={{ background:"rgba(0,0,0,.25)" }}>
                    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:6 }}>
                      <Eye size={24} color="var(--y)"/>
                      <span className="fc" style={{ fontSize:10.5,letterSpacing:3,color:"#fff",textTransform:"uppercase" }}>
                        {g.title || "View"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {lb && (
        <div onClick={() => setLb(null)}
          style={{ position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,.95)",
            display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
          <button onClick={() => setLb(null)} style={{ position:"absolute",top:20,right:24,background:"none",border:"none",color:"#fff",cursor:"pointer" }}>
            <X size={30}/>
          </button>
          <img src={lb} alt="Full view" onClick={e => e.stopPropagation()}
            style={{ maxWidth:"88vw",maxHeight:"88vh",objectFit:"contain" }}/>
        </div>
      )}
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ WHY CHOOSE US ━━━━━━━━━━━━━━━━━━━━━━━━ */
function WhyUs() {
  return (
    <section id="why" className="sec" style={{ background:"var(--ch1)" }}>
      <div className="mw">
        <div style={{ textAlign:"center",marginBottom:"clamp(36px,5vw,60px)" }}>
          <div className="sl rv" style={{ justifyContent:"center",marginBottom:16 }}>Our Advantage</div>
          <h2 className="sh rv d1">WHY CHOOSE <span style={{ color:"var(--y)" }}>US?</span></h2>
          <p className="rv d2" style={{ color:"var(--mut)",fontSize:14.5,maxWidth:500,margin:"14px auto 0",lineHeight:1.72 }}>
            20 years · 1,000+ projects · 3 JCB 3DX machines · certified operators. Here's what makes Sri Balaji the trusted choice in Tamil Nadu.
          </p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22 }} className="g3">
          {WHY.map((w,i) => (
            <div key={i} className={`wc rv d${i+1}`}>
              <div className="wi">{w.icon}</div>
              <h3 className="fc" style={{ fontSize:18,fontWeight:800,color:"#fff",marginBottom:9,letterSpacing:.3 }}>{w.t}</h3>
              <p style={{ fontSize:13.5,color:"var(--mut)",lineHeight:1.72 }}>{w.d}</p>
            </div>
          ))}
        </div>
        <div className="rv" style={{ marginTop:52,textAlign:"center" }}>
          <div style={{ width:1,height:36,background:"linear-gradient(to bottom,var(--y),transparent)",margin:"0 auto 22px" }}/>
          <h3 className="fd" style={{ fontSize:"clamp(26px,4vw,42px)",color:"#fff",marginBottom:18 }}>
            READY TO START YOUR PROJECT?
          </h3>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            <button className="btn btn-p" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}>
              <Send size={14}/><span>Request Free Quote</span>
            </button>
            <a href={`${WA_BASE}?text=Hi%2C+I+need+a+JCB+3DX+for+my+project`} target="_blank" rel="noreferrer"
              className="btn btn-wa" style={{ textDecoration:"none" }}>
              <MessageCircle size={14}/><span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ REVIEWS ━━━━━━━━━━━━━━━━━━━━━━━━ */
function Reviews() {
  const [pg, setPg] = useState(0);
  const pp = 3;
  const tot = Math.ceil(REVIEWS.length / pp);
  const vis = REVIEWS.slice(pg * pp, pg * pp + pp);

  return (
    <section id="reviews" className="sec" style={{ background:"var(--blk)",position:"relative",overflow:"hidden" }}>
      <div className="fd" style={{ position:"absolute",top:-60,left:-20,
        fontSize:"clamp(160px,28vw,300px)",color:"rgba(245,166,35,.025)",pointerEvents:"none",userSelect:"none",lineHeight:1 }}>"</div>
      <div className="mw" style={{ position:"relative" }}>
        <div style={{ textAlign:"center",marginBottom:"clamp(36px,5vw,60px)" }}>
          <div className="sl rv" style={{ justifyContent:"center",marginBottom:16 }}>Client Reviews</div>
          <h2 className="sh rv d1">WHAT CLIENTS <span style={{ color:"var(--y)" }}>SAY</span></h2>
          <div className="rv d2" style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginTop:16 }}>
            {[1,2,3,4].map(i => <Star key={i} size={17} fill="var(--y)" color="var(--y)"/>)}
            <Star size={17} fill="transparent" color="var(--y)" strokeWidth={1.8}/>
            <span className="fd" style={{ fontSize:26,color:"var(--y)" }}>4.6</span>
            <span style={{ color:"var(--mut)",fontSize:13 }}>· Google Rating · 47+ Reviews</span>
          </div>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22,marginBottom:36 }} className="g3">
          {vis.map((r,i) => (
            <div key={`${pg}-${i}`} className={`tc rv d${i+1} ${i===1?"ft":""}`}>
              <Quote size={26} color={i===1?"rgba(0,0,0,.22)":"var(--y)"} style={{ marginBottom:16 }}/>
              <p style={{ fontSize:13.5,lineHeight:1.8,color:i===1?"#000":"var(--mut)",marginBottom:20 }}>
                "{r.text}"
              </p>
              <div style={{ display:"flex",gap:3,marginBottom:16 }}>
                {[...Array(r.stars)].map((_,j) => <Star key={j} size={13} fill={i===1?"#000":"var(--y)"} color={i===1?"#000":"var(--y)"}/>)}
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:11 }}>
                <div style={{ width:42,height:42,borderRadius:"50%",background:i===1?"rgba(0,0,0,.18)":"var(--y)",
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <span className="fc" style={{ fontSize:15,fontWeight:900,color:"#000" }}>{r.av}</span>
                </div>
                <div>
                  <div className="fc" style={{ fontSize:14.5,fontWeight:800,color:i===1?"#000":"#fff" }}>{r.name}</div>
                  <div style={{ fontSize:12,color:i===1?"rgba(0,0,0,.5)":"var(--dim)" }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:10 }}>
          <button onClick={() => setPg(p => Math.max(0, p-1))} disabled={pg===0}
            style={{ width:42,height:42,border:"1px solid rgba(255,255,255,.12)",background:"transparent",
              color:pg===0?"rgba(255,255,255,.2)":"#fff",cursor:pg===0?"default":"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",transition:"all .3s" }}
            onMouseEnter={e => { if(pg>0){e.currentTarget.style.borderColor="var(--y)";e.currentTarget.style.color="var(--y)";}}}
            onMouseLeave={e => {e.currentTarget.style.borderColor="rgba(255,255,255,.12)";e.currentTarget.style.color=pg===0?"rgba(255,255,255,.2)":"#fff";}}>
            <ChevronLeft size={17}/>
          </button>
          {[...Array(tot)].map((_,i) => (
            <button key={i} onClick={() => setPg(i)}
              style={{ width:8,height:8,borderRadius:"50%",background:pg===i?"var(--y)":"rgba(255,255,255,.2)",
                border:"none",cursor:"pointer",transition:"all .3s",transform:pg===i?"scale(1.4)":"scale(1)" }}/>
          ))}
          <button onClick={() => setPg(p => Math.min(tot-1, p+1))} disabled={pg===tot-1}
            style={{ width:42,height:42,border:"1px solid rgba(255,255,255,.12)",background:"transparent",
              color:pg===tot-1?"rgba(255,255,255,.2)":"#fff",cursor:pg===tot-1?"default":"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",transition:"all .3s" }}
            onMouseEnter={e => { if(pg<tot-1){e.currentTarget.style.borderColor="var(--y)";e.currentTarget.style.color="var(--y)";}}}
            onMouseLeave={e => {e.currentTarget.style.borderColor="rgba(255,255,255,.12)";e.currentTarget.style.color=pg===tot-1?"rgba(255,255,255,.2)":"#fff";}}>
            <ChevronRight size={17}/>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ CONTACT ━━━━━━━━━━━━━━━━━━━━━━━━ */
function Contact() {
  const [form, setForm] = useState({ name:"", phone:"", service:"", message:"" });
  const [err, setErr] = useState({});
  const [st, setSt] = useState("idle");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/[\s\-]/g, ""))) e.phone = "Enter valid 10-digit mobile number";
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const lastSub = localStorage.getItem("sb_last_submit");
    if (lastSub && Date.now() - parseInt(lastSub) < 60000) {
      alert("Please wait a minute before sending another request.");
      return;
    }

    const errors = validate();
    if (Object.keys(errors).length) { setErr(errors); return; }
    setErr({}); setSt("sending");

    try {
      const res = await publicApi.submitInquiry(form);
      if (res.data.success) {
        setSt("sent");
        setForm({ name:"", phone:"", service:"", message:"" });
        localStorage.setItem("sb_last_submit", Date.now().toString());
        setTimeout(() => setSt("idle"), 5500);
      } else {
        setSt("idle");
        alert(res.data.message || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error("Inquiry submit error:", err);
      // Fallback: save to localStorage if API is down
      const inquiries = JSON.parse(localStorage.getItem("sb_inquiries") || "[]");
      inquiries.unshift({ ...form, id: Date.now(), date: new Date().toISOString() });
      localStorage.setItem("sb_inquiries", JSON.stringify(inquiries));
      setSt("sent");
      setForm({ name:"", phone:"", service:"", message:"" });
      setTimeout(() => setSt("idle"), 5500);
    }
  };

  const INFO = [
    { ic:<Phone size={17}/>,  l:"Phone",         v:PHONE,                                                   h:PHONE_TEL },
    { ic:<MessageCircle size={17}/>, l:"WhatsApp",v:PHONE,                                                  h:`${WA_BASE}?text=Hi%2C+I+need+JCB+3DX+rental` },
    { ic:<Mail size={17}/>,   l:"Email",         v:"sribalajiearthmovers@gmail.com",                        h:"mailto:sribalajiearthmovers@gmail.com" },
    { ic:<MapPin size={17}/>, l:"Address",       v:"Railway Station Rd, Senthamil Nagar, Sivagangai, TN 630561", h:MAP_LINK },
    { ic:<Clock size={17}/>,  l:"Working Hours", v:"6:00 AM – 6:00 PM · Monday to Sunday",                 h:null },
  ];

  return (
    <section id="contact" className="sec" style={{ background:"var(--ch1)" }}>
      <div className="mw">
        <div style={{ textAlign:"center",marginBottom:"clamp(36px,5vw,60px)" }}>
          <div className="sl rv" style={{ justifyContent:"center",marginBottom:16 }}>Get In Touch</div>
          <h2 className="sh rv d1">CONTACT <span style={{ color:"var(--y)" }}>US</span></h2>
          <p className="rv d2" style={{ color:"var(--mut)",fontSize:14.5,maxWidth:420,margin:"14px auto 0",lineHeight:1.72 }}>
            Call us, WhatsApp us, or fill in the form. We respond within the hour, every day from 6 AM to 6 PM.
          </p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(36px,6vw,72px)" }} className="g2">

          {/* Info */}
          <div className="rvl">
            <div style={{ display:"flex",flexDirection:"column",gap:20,marginBottom:28 }}>
              {INFO.map((info,i) => (
                <div key={i} style={{ display:"flex",gap:15,alignItems:"flex-start" }}>
                  <div style={{ width:44,height:44,background:"rgba(245,166,35,.1)",border:"1px solid rgba(245,166,35,.22)",
                    display:"flex",alignItems:"center",justifyContent:"center",color:"var(--y)",flexShrink:0 }}>
                    {info.ic}
                  </div>
                  <div>
                    <div className="fc" style={{ fontSize:10.5,fontWeight:700,letterSpacing:2.5,color:"var(--dim)",marginBottom:4,textTransform:"uppercase" }}>{info.l}</div>
                    {info.h
                      ? <a href={info.h} target={info.h.startsWith("http") ? "_blank" : "_self"} rel="noreferrer"
                          style={{ fontSize:14,color:"#fff",textDecoration:"none",lineHeight:1.55 }}>{info.v}</a>
                      : <span style={{ fontSize:14,color:"#fff",lineHeight:1.55 }}>{info.v}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display:"flex",gap:10,flexWrap:"wrap",marginBottom:26 }}>
              <a href={`${WA_BASE}?text=Hi%2C+I+need+JCB+3DX+rental+quote`} target="_blank" rel="noreferrer"
                className="btn btn-wa" style={{ textDecoration:"none",flex:1,justifyContent:"center",minWidth:148 }}>
                <MessageCircle size={14}/><span>WhatsApp Us</span>
              </a>
              <a href={PHONE_TEL} className="btn btn-yo" style={{ textDecoration:"none",flex:1,justifyContent:"center",minWidth:148 }}>
                <Phone size={14}/><span>Call Directly</span>
              </a>
            </div>

            {/* Map embed */}
            <div style={{ border:"1px solid var(--bdr)",overflow:"hidden" }}>
              <iframe
                src={MAP_EMBED}
                width="100%" height="230" style={{ border:0 }}
                className="map-frame"
                allowFullScreen loading="lazy"
                title="Sri Balaji Earth Movers - Sivagangai"
              />
            </div>
            <a href={MAP_LINK} target="_blank" rel="noreferrer"
              style={{ display:"flex",alignItems:"center",gap:8,marginTop:10,color:"var(--y)",textDecoration:"none",
                fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:12,letterSpacing:2 }}>
              <Navigation size={13}/> OPEN IN GOOGLE MAPS <ArrowUpRight size={12}/>
            </a>
          </div>

          {/* Form */}
          <div className="rvr">
            <div style={{ background:"var(--ch2)",padding:"clamp(24px,4vw,42px)",border:"1px solid var(--bdr)" }}>
              <h3 className="fc" style={{ fontSize:21,fontWeight:800,letterSpacing:1,color:"#fff",marginBottom:26,textTransform:"uppercase" }}>
                Request Free Quote
              </h3>

              {st === "sent" && (
                <div style={{ padding:"13px 16px",background:"rgba(34,197,94,.1)",border:"1px solid rgba(34,197,94,.3)",
                  color:"#22c55e",marginBottom:22,display:"flex",alignItems:"center",gap:9,fontSize:13.5,
                  animation:"fadeUp .3s ease" }}>
                  <CheckCircle size={16}/> Quote request sent! We'll call you very soon.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate style={{ display:"flex",flexDirection:"column",gap:13 }}>
                <div>
                  <input className="fi" placeholder="Your Full Name *" value={form.name}
                    onChange={e => setForm({...form, name:e.target.value})}
                    style={{ borderColor:err.name?"rgba(239,68,68,.5)":undefined }}/>
                  {err.name && <div style={{ fontSize:11.5,color:"#ef4444",marginTop:4 }}>{err.name}</div>}
                </div>
                <div>
                  <input className="fi" type="tel" placeholder="Mobile Number * (e.g. 9443239842)" value={form.phone}
                    onChange={e => setForm({...form, phone:e.target.value})}
                    style={{ borderColor:err.phone?"rgba(239,68,68,.5)":undefined }}/>
                  {err.phone && <div style={{ fontSize:11.5,color:"#ef4444",marginTop:4 }}>{err.phone}</div>}
                </div>
                <select className="fi" value={form.service} onChange={e => setForm({...form, service:e.target.value})}
                  style={{ color:form.service?"#fff":"rgba(255,255,255,.28)" }}>
                  <option value="" disabled hidden>Select Service Required</option>
                  <option value="JCB 3DX Rental">JCB 3DX Rental</option>
                  <option value="Earth Excavation">Earth Excavation</option>
                  <option value="Land Levelling">Land Levelling</option>
                  <option value="Road Construction">Road Construction</option>
                  <option value="Site Preparation">Site Preparation</option>
                  <option value="Demolition Support">Demolition Support</option>
                  <option value="Soil Haulage">Soil Haulage</option>
                  <option value="Other">Other</option>
                </select>
                <textarea className="fi" rows={4} placeholder="Describe your project (location, area, work type...)"
                  value={form.message} onChange={e => setForm({...form, message:e.target.value})}
                  style={{ resize:"vertical" }}/>
                <button type="submit" className="btn btn-p"
                  style={{ width:"100%",justifyContent:"center",padding:"15px",fontSize:13,
                    opacity:st==="sending"?.7:1,cursor:st==="sending"?"not-allowed":"pointer" }}
                  disabled={st==="sending"}>
                  {st === "sending"
                    ? <><span style={{ width:15,height:15,border:"2px solid rgba(0,0,0,.3)",borderTop:"2px solid #000",borderRadius:"50%",animation:"spin .7s linear infinite",display:"inline-block" }}/><span>Sending...</span></>
                    : <><Send size={14}/><span>Send Quote Request</span></>
                  }
                </button>
              </form>
              <p style={{ fontSize:11.5,color:"var(--dim)",textAlign:"center",marginTop:16,lineHeight:1.6 }}>
                Or call directly:{" "}
                <a href={PHONE_TEL} style={{ color:"var(--y)",textDecoration:"none",fontWeight:700 }}>{PHONE}</a>
                {" "}· 6 AM – 6 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ LOCATION MAP ━━━━━━━━━━━━━━━━━━━━━━━━ */
function LocationMap() {
  return (
    <section style={{ background:"var(--blk)" }}>
      <div className="mw" style={{ padding:"0 var(--px) clamp(72px,9vw,120px)" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 2fr",gap:0,border:"1px solid var(--bdr)",overflow:"hidden" }} className="g2">
          {/* Info panel */}
          <div style={{ background:"var(--y)",padding:"clamp(32px,4vw,52px) clamp(24px,3.5vw,44px)",
            display:"flex",flexDirection:"column",justifyContent:"center" }}>
            <div className="fc" style={{ fontSize:11,fontWeight:700,letterSpacing:3,color:"rgba(0,0,0,.5)",marginBottom:12,textTransform:"uppercase" }}>Find Us</div>
            <h3 className="fd" style={{ fontSize:"clamp(28px,4vw,44px)",color:"#000",lineHeight:.96,marginBottom:20 }}>OUR LOCATION</h3>
            <div style={{ width:36,height:2.5,background:"rgba(0,0,0,.3)",marginBottom:24 }}/>
            <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
              {[
                { ic:<MapPin size={16}/>, t:"Railway Station Rd, Senthamil Nagar, Sivagangai, Tamil Nadu 630561" },
                { ic:<Phone size={16}/>,  t:PHONE },
                { ic:<Clock size={16}/>,  t:"6:00 AM – 6:00 PM · Monday to Sunday" },
              ].map((x,i) => (
                <div key={i} style={{ display:"flex",gap:11,alignItems:"flex-start" }}>
                  <span style={{ color:"rgba(0,0,0,.6)",flexShrink:0,marginTop:2 }}>{x.ic}</span>
                  <span style={{ fontSize:13.5,color:"rgba(0,0,0,.75)",lineHeight:1.55 }}>{x.t}</span>
                </div>
              ))}
            </div>
            <a href={MAP_LINK} target="_blank" rel="noreferrer"
              className="btn" style={{ textDecoration:"none",background:"#000",color:"var(--y)",padding:"12px 22px",
                marginTop:28,alignSelf:"flex-start",clipPath:"none",fontSize:11.5,letterSpacing:2 }}>
              <Navigation size={13}/><span>Open in Google Maps</span>
            </a>
          </div>
          {/* Map */}
          <div style={{ position:"relative",minHeight:380 }}>
            <iframe
              src={MAP_EMBED}
              width="100%" height="100%"
              style={{ border:0,display:"block",position:"absolute",inset:0 }}
              className="map-frame"
              allowFullScreen loading="lazy"
              title="Sri Balaji Earth Movers Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━ */
function Footer() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={{ background:"#040404",borderTop:"1px solid var(--bdr)" }}>
      <div className="mw" style={{ padding:"clamp(52px,7vw,84px) var(--px) clamp(44px,6vw,68px)" }}>
        <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1.2fr",gap:"clamp(28px,5vw,56px)" }} className="g4">

          {/* Brand */}
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
              <div style={{ width:42,height:42,background:"var(--y)",display:"flex",alignItems:"center",justifyContent:"center",
                clipPath:"polygon(0 0,calc(100% - 9px) 0,100% 9px,100% 100%,9px 100%,0 calc(100% - 9px))",flexShrink:0 }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                  <path d="M2 18L6 8l5 5 5-7 6 9" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 22h20" stroke="#000" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="fc" style={{ fontSize:16,fontWeight:900,lineHeight:1.1 }}><span style={{ color:"var(--y)" }}>SRI BALAJI</span></div>
                <div className="fc" style={{ fontSize:9.5,fontWeight:600,letterSpacing:3,color:"rgba(255,255,255,.35)",textTransform:"uppercase" }}>EARTH MOVERS</div>
              </div>
            </div>
            <p style={{ fontSize:13,color:"rgba(255,255,255,.36)",lineHeight:1.8,maxWidth:260,marginBottom:20 }}>
              Professional JCB 3DX rental and earth works in Sivagangai, Tamil Nadu. Est. 2004. 20+ years of trusted service.
            </p>
            <div style={{ display:"flex",gap:8,marginBottom:16 }}>
              {[Facebook,Instagram,Youtube].map((Ic,i) => (
                <div key={i} style={{ width:33,height:33,border:"1px solid rgba(255,255,255,.1)",
                  display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",
                  color:"rgba(255,255,255,.38)",transition:"all .3s" }}
                  onMouseEnter={e => {e.currentTarget.style.borderColor="var(--y)";e.currentTarget.style.color="var(--y)"}}
                  onMouseLeave={e => {e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.color="rgba(255,255,255,.38)"}}>
                  <Ic size={13}/>
                </div>
              ))}
            </div>
            <a href={MAP_LINK} target="_blank" rel="noreferrer"
              style={{ display:"flex",alignItems:"center",gap:6,color:"rgba(255,255,255,.35)",textDecoration:"none",fontSize:12,
                fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600,letterSpacing:1,transition:"color .25s" }}
              onMouseEnter={e => e.currentTarget.style.color="var(--y)"}
              onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,.35)"}>
              <MapPin size={11}/> View on Google Maps
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="fc" style={{ fontSize:11.5,fontWeight:800,letterSpacing:3,color:"var(--y)",marginBottom:18,textTransform:"uppercase" }}>Quick Links</h4>
            {NAV.map(l => (
              <div key={l.id} style={{ marginBottom:9 }}>
                <button onClick={() => go(l.id)}
                  style={{ background:"none",border:"none",color:"rgba(255,255,255,.38)",fontSize:13,cursor:"pointer",
                    transition:"color .25s",padding:0,display:"flex",alignItems:"center",gap:6,fontFamily:"'Barlow',sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.color="var(--y)"}
                  onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,.38)"}>
                  <ArrowRight size={10} color="var(--y)"/>{l.label}
                </button>
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 className="fc" style={{ fontSize:11.5,fontWeight:800,letterSpacing:3,color:"var(--y)",marginBottom:18,textTransform:"uppercase" }}>Services</h4>
            {["JCB 3DX Rental","Earth Excavation","Land Levelling","Road Construction","Site Preparation","Demolition Support","Soil Haulage"].map(s => (
              <div key={s} style={{ color:"rgba(255,255,255,.38)",fontSize:13,marginBottom:9,display:"flex",alignItems:"center",gap:6 }}>
                <ArrowRight size={10} color="var(--y)" style={{ flexShrink:0 }}/>{s}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="fc" style={{ fontSize:11.5,fontWeight:800,letterSpacing:3,color:"var(--y)",marginBottom:18,textTransform:"uppercase" }}>Contact</h4>
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              {[
                { ic:<Phone size={12}/>,      t:PHONE,                               h:PHONE_TEL },
                { ic:<MessageCircle size={12}/>,t:PHONE,                            h:`${WA_BASE}?text=Hi%2C+I+need+JCB+3DX` },
                { ic:<Mail size={12}/>,        t:"sribalajiearthmovers@gmail.com",   h:"mailto:sribalajiearthmovers@gmail.com" },
                { ic:<MapPin size={12}/>,      t:"Senthamil Nagar, Sivagangai, TN", h:MAP_LINK },
                { ic:<Clock size={12}/>,       t:"6:00 AM – 6:00 PM Daily",         h:null },
              ].map((c,i) => (
                <div key={i} style={{ display:"flex",gap:9,alignItems:"flex-start" }}>
                  <span style={{ color:"var(--y)",flexShrink:0,marginTop:2 }}>{c.ic}</span>
                  {c.h
                    ? <a href={c.h} target={c.h.startsWith("http")?"_blank":"_self"} rel="noreferrer"
                        style={{ fontSize:12.5,color:"rgba(255,255,255,.38)",textDecoration:"none",lineHeight:1.55 }}>{c.t}</a>
                    : <span style={{ fontSize:12.5,color:"rgba(255,255,255,.38)",lineHeight:1.55 }}>{c.t}</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop:"1px solid rgba(255,255,255,.04)",padding:"15px var(--px)" }}>
        <div className="mw" style={{ padding:0,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10 }}>
          <span style={{ fontSize:11.5,color:"rgba(255,255,255,.2)" }}>
            © {new Date().getFullYear()} Sri Balaji Earth Movers. All rights reserved. · Sivagangai, Tamil Nadu, India.
          </span>
          <div style={{ display:"flex",alignItems:"center",gap:16 }}>
            <span style={{ fontSize:11.5,color:"rgba(255,255,255,.18)" }}>Est. 2004 · 20+ Years of Trust</span>
            <a href="/admin" style={{ fontSize:11,color:"rgba(255,255,255,.15)",textDecoration:"none",
              fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1,transition:"color .25s" }}
              onMouseEnter={e => e.currentTarget.style.color="rgba(255,255,255,.4)"}
              onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,.15)"}>
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ ROOT APP ━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function SriBalajiEarthMovers() {
  const active = useActiveSection(NAV.map(n => n.id));
  useScrollReveal();

  return (
    <div style={{ background:"var(--blk)",color:"#fff",fontFamily:"'Barlow',sans-serif",overflowX:"hidden" }}>
      <GlobalStyles/>
      <Navbar active={active}/>
      <Hero/>
      <Ticker/>
      <About/>
      <Services/>
      <JCB3DX/>
      <Gallery/>
      <WhyUs/>
      <Reviews/>
      <Contact/>
      <LocationMap/>
      <Footer/>
      {/* WhatsApp FAB */}
      <a href={`${WA_BASE}?text=Hi%2C+I+need+JCB+3DX+rental+quote+for+my+project.`}
        target="_blank" rel="noreferrer" className="wf" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
