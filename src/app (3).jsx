import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  LayoutDashboard, Leaf, Users, ShieldCheck, Trophy, FileText, Bell, Bot, Settings as SettingsIcon,
  User, LogOut, Search, Sun, Moon, Plus, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock,
  Download, ChevronRight, X, Send, Award, Star, Zap, Gift, Calendar, BarChart3, Activity, Droplet,
  Truck, Factory, ShoppingCart, Building2, ClipboardList, ShieldAlert, Sparkles, ArrowUpRight,
  ArrowDownRight, Mail, Lock, ChevronDown, Edit3, Trash2, Menu, Eye, EyeOff, Filter, Fingerprint,
  CircleCheck, CircleAlert, Flame, Wind, Recycle, HeartHandshake, GraduationCap, Medal, Target,
  FileBarChart, FileSpreadsheet, FileDown, Radio, MoreHorizontal, Check
} from "lucide-react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

/* ============================= SAMPLE DATA ============================= */

const DEPARTMENTS = ["Manufacturing", "Logistics", "R&D", "Sales", "HR", "Finance", "IT", "Procurement"];

const CARBON_TREND = [
  { month: "Feb", emissions: 412, target: 430 }, { month: "Mar", emissions: 398, target: 420 },
  { month: "Apr", emissions: 405, target: 410 }, { month: "May", emissions: 380, target: 400 },
  { month: "Jun", emissions: 365, target: 390 }, { month: "Jul", emissions: 372, target: 380 },
  { month: "Aug", emissions: 350, target: 370 }, { month: "Sep", emissions: 340, target: 360 },
  { month: "Oct", emissions: 328, target: 350 }, { month: "Nov", emissions: 310, target: 340 },
  { month: "Dec", emissions: 295, target: 330 }, { month: "Jan", emissions: 288, target: 320 },
];

const ESG_TREND = [
  { month: "Feb", overall: 61, env: 58, social: 64, gov: 60 }, { month: "Mar", overall: 63, env: 60, social: 65, gov: 62 },
  { month: "Apr", overall: 64, env: 61, social: 66, gov: 64 }, { month: "May", overall: 67, env: 65, social: 68, gov: 66 },
  { month: "Jun", overall: 69, env: 67, social: 70, gov: 68 }, { month: "Jul", overall: 71, env: 69, social: 72, gov: 70 },
  { month: "Aug", overall: 73, env: 72, social: 74, gov: 71 }, { month: "Sep", overall: 75, env: 74, social: 76, gov: 73 },
  { month: "Oct", overall: 77, env: 76, social: 78, gov: 75 }, { month: "Nov", overall: 79, env: 78, social: 80, gov: 77 },
  { month: "Dec", overall: 81, env: 80, social: 82, gov: 79 }, { month: "Jan", overall: 84, env: 83, social: 85, gov: 82 },
];

const DEPT_PERFORMANCE = [
  { dept: "Manufacturing", score: 76, emissions: 118 }, { dept: "Logistics", score: 71, emissions: 94 },
  { dept: "R&D", score: 88, emissions: 22 }, { dept: "Sales", score: 82, emissions: 14 },
  { dept: "HR", score: 91, emissions: 6 }, { dept: "Finance", score: 85, emissions: 8 },
  { dept: "IT", score: 79, emissions: 16 }, { dept: "Procurement", score: 68, emissions: 10 },
];

const CSR_PARTICIPATION = [
  { month: "Aug", participants: 142 }, { month: "Sep", participants: 168 }, { month: "Oct", participants: 190 },
  { month: "Nov", participants: 205 }, { month: "Dec", participants: 224 }, { month: "Jan", participants: 261 },
];

const GOVERNANCE_COMPLIANCE = [
  { name: "Compliant", value: 74, color: "#10B981" }, { name: "Pending Review", value: 18, color: "#2563EB" },
  { name: "Non-Compliant", value: 8, color: "#EF4444" },
];

const SUSTAINABILITY_PROGRESS = [
  { goal: "Emissions", progress: 78 }, { goal: "Water Use", progress: 65 }, { goal: "Waste Diversion", progress: 82 },
  { goal: "Renewable %", progress: 54 }, { goal: "Supplier ESG", progress: 61 },
];

const RADAR_ESG = [
  { subject: "Emissions", A: 82 }, { subject: "Energy", A: 74 }, { subject: "Diversity", A: 88 },
  { subject: "Wellness", A: 79 }, { subject: "Ethics", A: 91 }, { subject: "Transparency", A: 85 },
];

let txId = 1000;
const CARBON_TRANSACTIONS = [
  { id: txId++, date: "2026-07-08", dept: "Manufacturing", category: "Manufacturing Emissions", activity: "Blast furnace operation", amount: 4200, unit: "kWh", co2e: 1.86 },
  { id: txId++, date: "2026-07-07", dept: "Logistics", category: "Fleet Emissions", activity: "Diesel fleet - regional delivery", amount: 860, unit: "L", co2e: 2.31 },
  { id: txId++, date: "2026-07-06", dept: "Procurement", category: "Purchase Emissions", activity: "Steel raw material purchase", amount: 12, unit: "tons", co2e: 21.6 },
  { id: txId++, date: "2026-07-05", dept: "IT", category: "Purchase Emissions", activity: "Cloud compute usage", amount: 3100, unit: "kWh", co2e: 1.24 },
  { id: txId++, date: "2026-07-04", dept: "Manufacturing", category: "Manufacturing Emissions", activity: "Assembly line power draw", amount: 3900, unit: "kWh", co2e: 1.73 },
  { id: txId++, date: "2026-07-03", dept: "Logistics", category: "Fleet Emissions", activity: "Long-haul freight - EU route", amount: 1450, unit: "L", co2e: 3.89 },
  { id: txId++, date: "2026-07-02", dept: "Sales", category: "Fleet Emissions", activity: "Client visit fleet mileage", amount: 210, unit: "L", co2e: 0.56 },
  { id: txId++, date: "2026-07-01", dept: "Procurement", category: "Purchase Emissions", activity: "Packaging materials", amount: 3.4, unit: "tons", co2e: 4.08 },
];

const EMISSION_FACTORS = [
  { category: "Diesel (Fleet)", unit: "per Litre", factor: 2.68, source: "DEFRA 2026" },
  { category: "Grid Electricity", unit: "per kWh", factor: 0.402, source: "IEA 2026" },
  { category: "Steel Production", unit: "per Ton", factor: 1.80, source: "GHG Protocol" },
  { category: "Natural Gas", unit: "per m³", factor: 2.03, source: "DEFRA 2026" },
  { category: "Air Freight", unit: "per Ton-km", factor: 0.602, source: "ICAO 2026" },
  { category: "Cloud Compute", unit: "per kWh", factor: 0.400, source: "GHG Protocol" },
];

const ENV_GOALS = [
  { title: "Reduce Scope 1 emissions 20% by 2027", progress: 68, dept: "Manufacturing", status: "On Track" },
  { title: "Achieve 50% renewable energy mix", progress: 54, dept: "All Sites", status: "On Track" },
  { title: "Zero landfill waste at HQ", progress: 82, dept: "Facilities", status: "Ahead" },
  { title: "Fleet electrification - 30% by 2026", progress: 41, dept: "Logistics", status: "At Risk" },
];

let csrId = 500;
const CSR_ACTIVITIES = [
  { id: csrId++, title: "Beach Cleanup Drive", dept: "Sustainability", date: "2026-07-18", participants: 34, status: "Upcoming", category: "Environment" },
  { id: csrId++, title: "Blood Donation Camp", dept: "HR", date: "2026-07-10", participants: 58, status: "Completed", category: "Health" },
  { id: csrId++, title: "Coding Bootcamp for Youth", dept: "IT", date: "2026-07-22", participants: 20, status: "Upcoming", category: "Education" },
  { id: csrId++, title: "Tree Plantation - Riverside", dept: "Manufacturing", date: "2026-06-30", participants: 76, status: "Completed", category: "Environment" },
  { id: csrId++, title: "Elderly Care Volunteering", dept: "HR", date: "2026-07-05", participants: 15, status: "Completed", category: "Community" },
  { id: csrId++, title: "Financial Literacy Workshop", dept: "Finance", date: "2026-07-28", participants: 0, status: "Pending Approval", category: "Education" },
];

const TRAINING_COMPLETION = [
  { dept: "Manufacturing", completion: 88 }, { dept: "Logistics", completion: 76 }, { dept: "R&D", completion: 94 },
  { dept: "Sales", completion: 81 }, { dept: "HR", completion: 97 }, { dept: "Finance", completion: 90 },
];

const DIVERSITY_METRICS = [
  { name: "Women in Workforce", value: 42, color: "#10B981" }, { name: "Women in Leadership", value: 31, color: "#2563EB" },
  { name: "Underrepresented Groups", value: 24, color: "#F59E0B" }, { name: "Persons with Disabilities", value: 6, color: "#8B5CF6" },
];

const WELLNESS_METRICS = [
  { label: "Employee Satisfaction", value: 84 }, { label: "Work-Life Balance Score", value: 76 },
  { label: "Mental Health Program Uptake", value: 58 }, { label: "Annual Leave Utilization", value: 71 },
];

let policyId = 800;
const POLICIES = [
  { id: policyId++, title: "Anti-Bribery & Corruption Policy", category: "Ethics", status: "Active", acknowledgement: 96 },
  { id: policyId++, title: "Supplier Code of Conduct", category: "Supply Chain", status: "Active", acknowledgement: 88 },
  { id: policyId++, title: "Whistleblower Protection Policy", category: "Ethics", status: "Active", acknowledgement: 92 },
  { id: policyId++, title: "Data Privacy & Security Policy", category: "Governance", status: "Under Review", acknowledgement: 74 },
  { id: policyId++, title: "Environmental Health & Safety Policy", category: "Environment", status: "Active", acknowledgement: 90 },
  { id: policyId++, title: "Board Diversity Policy", category: "Governance", status: "Draft", acknowledgement: 0 },
];

let issueId = 200;
const COMPLIANCE_ISSUES = [
  { id: issueId++, title: "Incomplete supplier ESG disclosures", dept: "Procurement", severity: "High", status: "Open", due: "2026-07-20" },
  { id: issueId++, title: "Overdue safety training - 3 employees", dept: "Manufacturing", severity: "Medium", status: "In Progress", due: "2026-07-15" },
  { id: issueId++, title: "Data retention policy gap", dept: "IT", severity: "Medium", status: "Open", due: "2026-07-25" },
  { id: issueId++, title: "Minor emissions reporting discrepancy", dept: "Logistics", severity: "Low", status: "Resolved", due: "2026-06-30" },
  { id: issueId++, title: "Expired vendor compliance certificate", dept: "Procurement", severity: "High", status: "Open", due: "2026-07-14" },
];

let auditId = 300;
const AUDITS = [
  { id: auditId++, title: "Annual ISO 14001 Environmental Audit", auditor: "Bureau Veritas", date: "2026-07-24", status: "Scheduled" },
  { id: auditId++, title: "Internal Governance Review", auditor: "Internal Audit Team", date: "2026-08-02", status: "Scheduled" },
  { id: auditId++, title: "Supplier Code Compliance Audit", auditor: "SGS Group", date: "2026-07-16", status: "Scheduled" },
  { id: auditId++, title: "Q2 Carbon Accounting Verification", auditor: "DNV", date: "2026-06-28", status: "Completed" },
  { id: auditId++, title: "Workplace Safety Inspection", auditor: "Internal Audit Team", date: "2026-07-11", status: "In Progress" },
];

let empId = 1;
const EMPLOYEES = [
  { id: empId++, name: "Ananya Sharma", dept: "R&D", xp: 4820, level: 12, badges: 9, avatar: "AS" },
  { id: empId++, name: "Rohan Mehta", dept: "Manufacturing", xp: 4510, level: 11, badges: 8, avatar: "RM" },
  { id: empId++, name: "Priya Nair", dept: "HR", xp: 4290, level: 11, badges: 7, avatar: "PN" },
  { id: empId++, name: "Karan Verma", dept: "Sales", xp: 3980, level: 10, badges: 7, avatar: "KV" },
  { id: empId++, name: "Sneha Iyer", dept: "Finance", xp: 3760, level: 9, badges: 6, avatar: "SI" },
  { id: empId++, name: "Arjun Kapoor", dept: "IT", xp: 3540, level: 9, badges: 6, avatar: "AK" },
  { id: empId++, name: "Divya Menon", dept: "Logistics", xp: 3210, level: 8, badges: 5, avatar: "DM" },
  { id: empId++, name: "Vikram Rao", dept: "Procurement", xp: 2980, level: 8, badges: 5, avatar: "VR" },
];

const DEPT_LEADERBOARD = [
  { dept: "R&D", score: 4680 }, { dept: "Manufacturing", score: 4320 }, { dept: "HR", score: 4110 },
  { dept: "Finance", score: 3890 }, { dept: "Sales", score: 3720 },
];

let challengeId = 100;
const CHALLENGES = [
  { id: challengeId++, title: "Zero Single-Use Plastic Week", status: "Active", participants: 156, xp: 250, deadline: "2026-07-19", category: "Environment" },
  { id: challengeId++, title: "Carpool Champions", status: "Active", participants: 88, xp: 180, deadline: "2026-07-24", category: "Environment" },
  { id: challengeId++, title: "Ethics Training Sprint", status: "Under Review", participants: 210, xp: 150, deadline: "2026-07-10", category: "Governance" },
  { id: challengeId++, title: "Community Meal Drive", status: "Completed", participants: 142, xp: 300, deadline: "2026-06-25", category: "Social" },
  { id: challengeId++, title: "Paperless Office Challenge", status: "Draft", participants: 0, xp: 120, deadline: "2026-08-05", category: "Environment" },
  { id: challengeId++, title: "Q1 Wellness Streak", status: "Archived", participants: 198, xp: 200, deadline: "2026-03-31", category: "Social" },
];

const BADGES = [
  { name: "Carbon Cutter", icon: "Leaf", tier: "Gold", desc: "Reduced personal footprint by 25%", earned: true },
  { name: "Volunteer Champion", icon: "HeartHandshake", tier: "Silver", desc: "10+ CSR activities completed", earned: true },
  { name: "Policy Pro", icon: "ShieldCheck", tier: "Bronze", desc: "All compliance trainings completed", earned: true },
  { name: "Streak Master", icon: "Flame", tier: "Gold", desc: "30-day sustainability streak", earned: false },
  { name: "Mentor", icon: "GraduationCap", tier: "Silver", desc: "Mentored 3 new employees", earned: true },
  { name: "Top Contributor", icon: "Trophy", tier: "Platinum", desc: "Top 1% ESG contributor this year", earned: false },
];

const REWARDS = [
  { name: "Extra Day Off", cost: 1200, stock: 12 }, { name: "$50 Wellness Voucher", cost: 800, stock: 30 },
  { name: "EcoSphere Merch Kit", cost: 400, stock: 50 }, { name: "Premium Parking Spot (1 mo)", cost: 1500, stock: 5 },
  { name: "Donation in Your Name ($100)", cost: 900, stock: 100 },
];

let notifId = 1;
const NOTIFICATIONS = [
  { id: notifId++, type: "Compliance Issue Raised", title: "New high-severity issue in Procurement", time: "12 min ago", read: false, icon: "ShieldAlert" },
  { id: notifId++, type: "Badge Unlocked", title: "Rohan Mehta unlocked 'Mentor' badge", time: "1 hr ago", read: false, icon: "Medal" },
  { id: notifId++, type: "Audit Due", title: "Supplier Compliance Audit in 4 days", time: "3 hrs ago", read: false, icon: "Calendar" },
  { id: notifId++, type: "Challenge Approved", title: "'Zero Single-Use Plastic Week' approved", time: "5 hrs ago", read: true, icon: "CheckCircle2" },
  { id: notifId++, type: "CSR Approved", title: "Beach Cleanup Drive approved by HR", time: "Yesterday", read: true, icon: "HeartHandshake" },
  { id: notifId++, type: "Carbon Threshold Crossed", title: "Manufacturing exceeded weekly CO2e target", time: "Yesterday", read: true, icon: "Flame" },
  { id: notifId++, type: "Policy Reminder", title: "12 employees pending Data Privacy Policy sign-off", time: "2 days ago", read: true, icon: "FileText" },
];

const ACTIVITY_TIMELINE = [
  { text: "Priya Nair completed 'Ethics Training Sprint'", time: "10 min ago", icon: "CheckCircle2", color: "emerald" },
  { text: "New carbon transaction logged - Manufacturing", time: "35 min ago", icon: "Flame", color: "amber" },
  { text: "Audit 'Q2 Carbon Verification' marked completed", time: "2 hrs ago", icon: "ClipboardList", color: "blue" },
  { text: "Compliance issue raised in Procurement", time: "4 hrs ago", icon: "AlertTriangle", color: "red" },
  { text: "Beach Cleanup Drive reached 34 registrations", time: "6 hrs ago", icon: "HeartHandshake", color: "emerald" },
  { text: "Karan Verma redeemed 'Wellness Voucher'", time: "Yesterday", icon: "Gift", color: "violet" },
];

const AI_RECOMMENDATIONS = [
  { title: "Shift 15% of Manufacturing load to off-peak hours", impact: "-4.2 tCO2e/mo", confidence: 92 },
  { title: "Consolidate Logistics routes in EU corridor", impact: "-2.8 tCO2e/mo", confidence: 87 },
  { title: "Migrate IT cloud workloads to renewable region", impact: "-1.6 tCO2e/mo", confidence: 81 },
];

const ICONS = { Leaf, HeartHandshake, ShieldCheck, Flame, GraduationCap, Trophy, Medal, CheckCircle2, Calendar, ShieldAlert, FileText, ClipboardList, AlertTriangle, Gift, HeartHandshake2: HeartHandshake };

/* ============================= THEME ============================= */

function useTheme(dark) {
  return useMemo(() => ({
    dark,
    appBg: dark ? "bg-slate-950" : "bg-slate-50",
    sidebarBg: dark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200",
    topbarBg: dark ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200",
    card: dark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200",
    cardHover: dark ? "hover:border-slate-700" : "hover:border-slate-300",
    text: dark ? "text-slate-100" : "text-slate-900",
    subtext: dark ? "text-slate-400" : "text-slate-500",
    subtext2: dark ? "text-slate-500" : "text-slate-400",
    border: dark ? "border-slate-800" : "border-slate-200",
    divide: dark ? "divide-slate-800" : "divide-slate-200",
    hoverRow: dark ? "hover:bg-slate-800/40" : "hover:bg-slate-50",
    inputBg: dark ? "bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400",
    chip: dark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600",
    skeleton: dark ? "bg-slate-800" : "bg-slate-200",
  }), [dark]);
}

const fmt = (n) => n.toLocaleString("en-US");
const clsx = (...a) => a.filter(Boolean).join(" ");

/* ============================= PRIMITIVES ============================= */

function Card({ t, className, children, glass }) {
  return (
    <div className={clsx(
      "rounded-2xl border shadow-sm transition-colors duration-200",
      glass ? (t.dark ? "bg-slate-900/40 backdrop-blur-xl border-slate-700/50" : "bg-white/60 backdrop-blur-xl border-white/60") : t.card,
      t.cardHover, className
    )}>
      {children}
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Resolved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    "On Track": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Ahead: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Compliant: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Upcoming: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Scheduled: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "In Progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "Under Review": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "Pending Review": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "Pending Approval": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "At Risk": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Draft: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    Archived: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    Open: "bg-red-500/10 text-red-500 border-red-500/20",
    "Non-Compliant": "bg-red-500/10 text-red-500 border-red-500/20",
    High: "bg-red-500/10 text-red-500 border-red-500/20",
    Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Low: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };
  return (
    <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap", map[status] || "bg-slate-500/10 text-slate-400 border-slate-500/20")}>
      {status}
    </span>
  );
}

function ProgressRing({ value, size = 64, stroke = 6, color = "#10B981", t }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke={t?.dark ? "#1E293B" : "#E2E8F0"} strokeWidth={stroke} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
        strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)" }} />
    </svg>
  );
}

function ProgressBar({ value, color = "bg-emerald-500", t }) {
  return (
    <div className={clsx("w-full h-2 rounded-full overflow-hidden", t.dark ? "bg-slate-800" : "bg-slate-200")}>
      <div className={clsx("h-full rounded-full transition-all duration-700", color)} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

function Skeleton({ t, className }) {
  return <div className={clsx("animate-pulse rounded-lg", t.skeleton, className)} />;
}

function Modal({ t, title, onClose, children, wide }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_.15s_ease-out]">
      <div className={clsx("w-full rounded-2xl border shadow-2xl", wide ? "max-w-2xl" : "max-w-md", t.card, "animate-[slideUp_.2s_ease-out]")}>
        <div className={clsx("flex items-center justify-between px-6 py-4 border-b", t.border)}>
          <h3 className={clsx("font-semibold text-lg", t.text)}>{title}</h3>
          <button onClick={onClose} className={clsx("p-1.5 rounded-lg hover:bg-slate-500/10", t.subtext)}><X size={18} /></button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1.5 opacity-80">{label}</label>
      {children}
    </div>
  );
}

function Input({ t, ...props }) {
  return <input {...props} className={clsx("w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-emerald-500/40 transition-shadow", t.inputBg)} />;
}

function Select({ t, children, ...props }) {
  return <select {...props} className={clsx("w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-emerald-500/40", t.inputBg)}>{children}</select>;
}

function Button({ variant = "primary", className, children, ...props }) {
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20",
    secondary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20",
    ghost: "bg-slate-500/10 hover:bg-slate-500/20 text-current",
    outline: "border border-current/20 hover:bg-slate-500/10 text-current",
  };
  return (
    <button {...props} className={clsx("px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[.97] flex items-center justify-center gap-2", variants[variant], className)}>
      {children}
    </button>
  );
}

function SectionHeader({ t, title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
      <div>
        <h2 className={clsx("text-2xl font-bold tracking-tight", t.text)}>{title}</h2>
        {subtitle && <p className={clsx("text-sm mt-1", t.subtext)}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function EmptyState({ t, icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center mb-4", t.dark ? "bg-slate-800" : "bg-slate-100")}>
        <Icon size={24} className={t.subtext} />
      </div>
      <p className={clsx("font-semibold", t.text)}>{title}</p>
      {subtitle && <p className={clsx("text-sm mt-1 max-w-sm", t.subtext)}>{subtitle}</p>}
      {action}
    </div>
  );
}

function Tabs({ t, tabs, active, onChange }) {
  return (
    <div className={clsx("flex gap-1 p-1 rounded-xl border overflow-x-auto no-scrollbar mb-6", t.dark ? "bg-slate-900 border-slate-800" : "bg-slate-100/70 border-slate-200")}>
      {tabs.map(tab => (
        <button key={tab} onClick={() => onChange(tab)}
          className={clsx("px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
            active === tab ? "bg-emerald-500 text-white shadow-md" : clsx(t.subtext, "hover:bg-slate-500/10"))}>
          {tab}
        </button>
      ))}
    </div>
  );
}

function KPICard({ t, icon: Icon, label, value, sub, trend, trendDir = "up", accent = "emerald" }) {
  const accents = {
    emerald: "text-emerald-500 bg-emerald-500/10",
    blue: "text-blue-500 bg-blue-500/10",
    amber: "text-amber-500 bg-amber-500/10",
    red: "text-red-500 bg-red-500/10",
    violet: "text-violet-500 bg-violet-500/10",
  };
  return (
    <Card t={t} className="p-5 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center", accents[accent])}>
          <Icon size={18} />
        </div>
        {trend && (
          <span className={clsx("text-xs font-semibold flex items-center gap-0.5", trendDir === "up" ? "text-emerald-500" : "text-red-500")}>
            {trendDir === "up" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{trend}
          </span>
        )}
      </div>
      <p className={clsx("text-2xl font-bold tracking-tight", t.text)}>{value}</p>
      <p className={clsx("text-xs mt-0.5", t.subtext)}>{label}</p>
      {sub && <p className={clsx("text-xs mt-1", t.subtext2)}>{sub}</p>}
    </Card>
  );
}

function ChartCard({ t, title, subtitle, children, action, className }) {
  return (
    <Card t={t} className={clsx("p-5", className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={clsx("font-semibold", t.text)}>{title}</h3>
          {subtitle && <p className={clsx("text-xs", t.subtext)}>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </Card>
  );
}

const tooltipStyle = (t) => ({
  backgroundColor: t.dark ? "#111B2E" : "#fff",
  border: `1px solid ${t.dark ? "#1E293B" : "#E2E8F0"}`,
  borderRadius: 12, fontSize: 12, color: t.dark ? "#E2E8F0" : "#0F172A",
});

/* ============================= LOGO ============================= */

function Logo({ size = 36 }) {
  return (
    <div className="flex items-center gap-2.5">
      <div style={{ width: size, height: size }} className="relative rounded-xl bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 shrink-0">
        <Leaf size={size * 0.55} className="text-white" strokeWidth={2.2} />
      </div>
      <span className="font-bold text-xl tracking-tight">EcoSphere</span>
    </div>
  );
}

/* ============================= NAV CONFIG ============================= */

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "environmental", label: "Environmental", icon: Leaf },
  { key: "social", label: "Social", icon: Users },
  { key: "governance", label: "Governance", icon: ShieldCheck },
  { key: "gamification", label: "Gamification", icon: Trophy },
  { key: "reports", label: "Reports", icon: FileText },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "copilot", label: "AI ESG Copilot", icon: Bot },
  { key: "settings", label: "Settings", icon: SettingsIcon },
  { key: "profile", label: "Profile", icon: User },
];

function Sidebar({ t, page, setPage, collapsed, setCollapsed, mobileOpen, setMobileOpen, onLogout, unreadCount }) {
  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={clsx(
        "fixed lg:sticky top-0 left-0 h-screen z-40 border-r flex flex-col shrink-0 transition-all duration-300",
        t.sidebarBg, collapsed ? "lg:w-[76px]" : "lg:w-64",
        "w-64", mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className={clsx("flex items-center h-16 px-5 border-b shrink-0", t.border, collapsed && "lg:justify-center lg:px-0")}>
          {(!collapsed) && <Logo size={32} />}
          {collapsed && <div className="hidden lg:flex"><Logo size={32} /></div>}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV.map(item => {
            const Icon = item.icon;
            const active = page === item.key;
            return (
              <button key={item.key} onClick={() => { setPage(item.key); setMobileOpen(false); }}
                title={item.label}
                className={clsx(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative",
                  collapsed && "lg:justify-center lg:px-0",
                  active ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : clsx(t.subtext, "hover:bg-slate-500/10")
                )}>
                <Icon size={18} className="shrink-0" />
                <span className={collapsed ? "lg:hidden" : ""}>{item.label}</span>
                {item.key === "notifications" && unreadCount > 0 && (
                  <span className={clsx("absolute right-2 top-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center", collapsed && "lg:right-1.5 lg:top-1.5")}>
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className={clsx("p-3 border-t space-y-1", t.border)}>
          <button onClick={onLogout} className={clsx("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-red-500/10 text-red-500", collapsed && "lg:justify-center lg:px-0")}>
            <LogOut size={18} className="shrink-0" /> <span className={collapsed ? "lg:hidden" : ""}>Logout</span>
          </button>
          <button onClick={() => setCollapsed(!collapsed)} className={clsx("hidden lg:flex w-full items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-500/10", t.subtext2)}>
            <ChevronRight size={14} className={clsx("transition-transform shrink-0", !collapsed && "rotate-180")} />
            <span className={collapsed ? "lg:hidden" : ""}>Collapse</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ t, dark, setDark, setMobileOpen, page, setPage, employee, notifications }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const searchable = useMemo(() => ([
    ...EMPLOYEES.map(e => ({ label: e.name, type: "Employee", go: "gamification" })),
    ...DEPARTMENTS.map(d => ({ label: d, type: "Department", go: "environmental" })),
    ...POLICIES.map(p => ({ label: p.title, type: "Policy", go: "governance" })),
    ...CHALLENGES.map(c => ({ label: c.title, type: "Challenge", go: "gamification" })),
    ...CARBON_TRANSACTIONS.map(c => ({ label: c.activity, type: "Transaction", go: "environmental" })),
  ]), []);
  const results = q.length > 1 ? searchable.filter(s => s.label.toLowerCase().includes(q.toLowerCase())).slice(0, 7) : [];
  const unread = notifications.filter(n => !n.read).length;
  const title = NAV.find(n => n.key === page)?.label || "Dashboard";

  return (
    <header className={clsx("sticky top-0 z-20 h-16 border-b backdrop-blur-xl flex items-center gap-3 px-4 sm:px-6", t.topbarBg)}>
      <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 -ml-2"><Menu size={20} /></button>
      <h1 className={clsx("font-semibold text-lg hidden sm:block shrink-0", t.text)}>{title}</h1>

      <div className="relative flex-1 max-w-md ml-0 sm:ml-4">
        <Search size={16} className={clsx("absolute left-3 top-1/2 -translate-y-1/2", t.subtext2)} />
        <input value={q} onChange={e => { setQ(e.target.value); setSearchOpen(true); }} onFocus={() => setSearchOpen(true)}
          placeholder="Search employees, policies, transactions..."
          className={clsx("w-full pl-9 pr-3 py-2 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-emerald-500/30", t.inputBg)} />
        {searchOpen && q.length > 1 && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setSearchOpen(false)} />
            <div className={clsx("absolute mt-2 w-full rounded-xl border shadow-xl z-20 overflow-hidden", t.card)}>
              {results.length === 0 ? (
                <p className={clsx("p-4 text-sm text-center", t.subtext)}>No results for "{q}"</p>
              ) : results.map((r, i) => (
                <button key={i} onClick={() => { setPage(r.go); setSearchOpen(false); setQ(""); }}
                  className={clsx("w-full text-left px-4 py-2.5 flex items-center justify-between text-sm", t.hoverRow)}>
                  <span className={t.text}>{r.label}</span>
                  <span className={clsx("text-xs px-2 py-0.5 rounded-full", t.chip)}>{r.type}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto sm:ml-0">
        <button onClick={() => setDark(!dark)} className={clsx("p-2.5 rounded-xl hover:bg-slate-500/10", t.subtext)}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button onClick={() => setPage("notifications")} className={clsx("relative p-2.5 rounded-xl hover:bg-slate-500/10", t.subtext)}>
          <Bell size={18} />
          {unread > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />}
        </button>
        <button onClick={() => setPage("profile")} className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-500/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
            {employee.avatar}
          </div>
          <span className={clsx("text-sm font-medium hidden md:block", t.text)}>{employee.name.split(" ")[0]}</span>
        </button>
      </div>
    </header>
  );
}

/* ============================= LOGIN PAGE ============================= */

/* ============================= ROOT APP ============================= */

export default function EcoSphereApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState(null);

  const [transactions, setTransactions] = useState(CARBON_TRANSACTIONS);
  const [csrActivities, setCsrActivities] = useState(CSR_ACTIVITIES);
  const [challenges, setChallenges] = useState(CHALLENGES);
  const [audits, setAudits] = useState(AUDITS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const t = useTheme(dark);
  const employee = EMPLOYEES[2]; // Priya Nair - logged-in persona
  const unreadCount = notifications.filter(n => !n.read).length;

  const openModal = (m) => setModal(m);
  const closeModal = () => setModal(null);
  const markRead = (id) => setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(ns => ns.map(n => ({ ...n, read: true })));
  const deleteTx = (id) => setTransactions(ts => ts.filter(x => x.id !== id));

  if (!loggedIn) {
    return <LoginPage t={t} dark={dark} setDark={setDark} onLogin={() => setLoggedIn(true)} />;
  }

  const pages = {
    dashboard: <DashboardPage t={t} setPage={setPage} openModal={openModal} notifications={notifications} employees={EMPLOYEES} transactions={transactions} />,
    environmental: <EnvironmentalPage t={t} openModal={openModal} transactions={transactions} deleteTx={deleteTx} />,
    social: <SocialPage t={t} openModal={openModal} csrActivities={csrActivities} />,
    governance: <GovernancePage t={t} openModal={openModal} policies={POLICIES} issues={COMPLIANCE_ISSUES} audits={audits} />,
    gamification: <GamificationPage t={t} openModal={openModal} challenges={challenges} employees={EMPLOYEES} />,
    reports: <ReportsPage t={t} />,
    notifications: <NotificationsPage t={t} notifications={notifications} markRead={markRead} markAllRead={markAllRead} />,
    copilot: <AICopilotPage t={t} />,
    settings: <SettingsPage t={t} dark={dark} setDark={setDark} />,
    profile: <ProfilePage t={t} employee={employee} />,
  };

  return (
    <div className={clsx("min-h-screen w-full flex", t.appBg, t.text)}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        * { scrollbar-width: thin; }
      `}</style>

      <Sidebar t={t} page={page} setPage={setPage} collapsed={collapsed} setCollapsed={setCollapsed}
        mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} onLogout={() => setLoggedIn(false)} unreadCount={unreadCount} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar t={t} dark={dark} setDark={setDark} setMobileOpen={setMobileOpen} page={page} setPage={setPage} employee={employee} notifications={notifications} />
        <main className="flex-1 p-4 sm:p-6 max-w-[1600px] w-full mx-auto">
          {pages[page]}
        </main>
      </div>

      {modal === "carbonTx" && <CarbonTxModal t={t} onClose={closeModal} onAdd={(tx) => setTransactions(ts => [tx, ...ts])} />}
      {modal === "csrActivity" && <CSRActivityModal t={t} onClose={closeModal} onAdd={(a) => setCsrActivities(cs => [a, ...cs])} />}
      {modal === "challenge" && <ChallengeModal t={t} onClose={closeModal} onAdd={(c) => setChallenges(cs => [c, ...cs])} />}
      {modal === "audit" && <AuditModal t={t} onClose={closeModal} onAdd={(a) => setAudits(as => [a, ...as])} />}
    </div>
  );
}

/* ============================= QUICK ACTION MODALS ============================= */

function CarbonTxModal({ t, onClose, onAdd }) {
  const [dept, setDept] = useState(DEPARTMENTS[0]);
  const [category, setCategory] = useState("Manufacturing Emissions");
  const [activity, setActivity] = useState("");
  const [amount, setAmount] = useState(100);
  const [unit, setUnit] = useState("kWh");

  const submit = () => {
    if (!activity.trim()) return;
    const factor = 0.4;
    onAdd({ id: Date.now(), date: new Date().toISOString().slice(0, 10), dept, category, activity, amount, unit, co2e: +(amount * factor / 1000 * 100).toFixed(2) });
    onClose();
  };

  return (
    <Modal t={t} title="Add Carbon Transaction" onClose={onClose}>
      <Field label="Department"><Select t={t} value={dept} onChange={e => setDept(e.target.value)}>{DEPARTMENTS.map(d => <option key={d}>{d}</option>)}</Select></Field>
      <Field label="Category">
        <Select t={t} value={category} onChange={e => setCategory(e.target.value)}>
          {["Manufacturing Emissions", "Fleet Emissions", "Purchase Emissions"].map(c => <option key={c}>{c}</option>)}
        </Select>
      </Field>
      <Field label="Activity Description"><Input t={t} value={activity} onChange={e => setActivity(e.target.value)} placeholder="e.g. Diesel fleet - regional delivery" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Amount"><Input t={t} type="number" value={amount} onChange={e => setAmount(+e.target.value)} /></Field>
        <Field label="Unit"><Select t={t} value={unit} onChange={e => setUnit(e.target.value)}>{["kWh", "L", "tons", "m³"].map(u => <option key={u}>{u}</option>)}</Select></Field>
      </div>
      <Button className="w-full mt-2" onClick={submit}><Plus size={16} /> Add Transaction</Button>
    </Modal>
  );
}

function CSRActivityModal({ t, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [dept, setDept] = useState(DEPARTMENTS[0]);
  const [date, setDate] = useState("2026-08-01");
  const [category, setCategory] = useState("Environment");

  const submit = () => {
    if (!title.trim()) return;
    onAdd({ id: Date.now(), title, dept, date, participants: 0, status: "Pending Approval", category });
    onClose();
  };

  return (
    <Modal t={t} title="Create CSR Activity" onClose={onClose}>
      <Field label="Activity Title"><Input t={t} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. River Cleanup Drive" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Department"><Select t={t} value={dept} onChange={e => setDept(e.target.value)}>{DEPARTMENTS.map(d => <option key={d}>{d}</option>)}</Select></Field>
        <Field label="Category"><Select t={t} value={category} onChange={e => setCategory(e.target.value)}>{["Environment", "Health", "Education", "Community"].map(c => <option key={c}>{c}</option>)}</Select></Field>
      </div>
      <Field label="Date"><Input t={t} type="date" value={date} onChange={e => setDate(e.target.value)} /></Field>
      <Button className="w-full mt-2" onClick={submit}><Plus size={16} /> Create Activity</Button>
    </Modal>
  );
}

function ChallengeModal({ t, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Environment");
  const [xp, setXp] = useState(150);
  const [deadline, setDeadline] = useState("2026-08-15");

  const submit = () => {
    if (!title.trim()) return;
    onAdd({ id: Date.now(), title, status: "Draft", participants: 0, xp, deadline, category });
    onClose();
  };

  return (
    <Modal t={t} title="Add Challenge" onClose={onClose}>
      <Field label="Challenge Title"><Input t={t} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Bike to Work Week" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Category"><Select t={t} value={category} onChange={e => setCategory(e.target.value)}>{["Environment", "Social", "Governance"].map(c => <option key={c}>{c}</option>)}</Select></Field>
        <Field label="XP Reward"><Input t={t} type="number" value={xp} onChange={e => setXp(+e.target.value)} /></Field>
      </div>
      <Field label="Deadline"><Input t={t} type="date" value={deadline} onChange={e => setDeadline(e.target.value)} /></Field>
      <Button className="w-full mt-2" onClick={submit}><Plus size={16} /> Add Challenge (Draft)</Button>
    </Modal>
  );
}

function AuditModal({ t, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [auditor, setAuditor] = useState("Internal Audit Team");
  const [date, setDate] = useState("2026-08-10");

  const submit = () => {
    if (!title.trim()) return;
    onAdd({ id: Date.now(), title, auditor, date, status: "Scheduled" });
    onClose();
  };

  return (
    <Modal t={t} title="Create Audit" onClose={onClose}>
      <Field label="Audit Title"><Input t={t} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. ISO 45001 Safety Audit" /></Field>
      <Field label="Auditor"><Input t={t} value={auditor} onChange={e => setAuditor(e.target.value)} /></Field>
      <Field label="Scheduled Date"><Input t={t} type="date" value={date} onChange={e => setDate(e.target.value)} /></Field>
      <Button className="w-full mt-2" onClick={submit}><Plus size={16} /> Schedule Audit</Button>
    </Modal>
  );
}

/* ============================= NOTIFICATIONS ============================= */

function NotificationsPage({ t, notifications, markRead, markAllRead }) {
  const [filter, setFilter] = useState("All");
  const types = ["All", ...new Set(notifications.map(n => n.type))];
  const filtered = filter === "All" ? notifications : notifications.filter(n => n.type === filter);

  return (
    <div>
      <SectionHeader t={t} title="Notification Center" subtitle="Stay on top of policy, audit, badge, and compliance updates"
        action={<Button variant="ghost" onClick={markAllRead}><Check size={15} /> Mark all read</Button>} />

      <div className="flex gap-1.5 mb-5 overflow-x-auto no-scrollbar">
        {types.map(f => (
          <button key={f} onClick={() => setFilter(f)} className={clsx("text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap", filter === f ? "bg-emerald-500 text-white" : t.chip)}>{f}</button>
        ))}
      </div>

      <Card t={t} className="p-2">
        {filtered.length === 0 ? (
          <EmptyState t={t} icon={Bell} title="Nothing here" subtitle="No notifications match this filter." />
        ) : filtered.map(n => {
          const Icon = ICONS[n.icon] || Bell;
          return (
            <div key={n.id} onClick={() => markRead(n.id)} className={clsx("flex items-start gap-4 p-4 rounded-xl cursor-pointer", t.hoverRow, !n.read && (t.dark ? "bg-emerald-500/5" : "bg-emerald-50/60"))}>
              <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", n.read ? t.chip : "bg-emerald-500/10 text-emerald-500")}><Icon size={17} /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={clsx("text-xs px-2 py-0.5 rounded-full", t.chip)}>{n.type}</span>
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </div>
                <p className={clsx("text-sm mt-1", t.text)}>{n.title}</p>
                <p className={clsx("text-xs mt-1", t.subtext2)}>{n.time}</p>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

/* ============================= SETTINGS ============================= */

function SettingsPage({ t, dark, setDark }) {
  const [tab, setTab] = useState("Theme");
  const [toggles, setToggles] = useState({ email: true, push: true, weekly: true, audit: true });

  return (
    <div>
      <SectionHeader t={t} title="Settings" subtitle="Configure your organization's ESG platform" />
      <Tabs t={t} tabs={["Theme", "Departments", "Categories", "Emission Factors", "Notifications", "Security"]} active={tab} onChange={setTab} />

      {tab === "Theme" && (
        <Card t={t} className="p-6 max-w-lg">
          <h3 className={clsx("font-semibold mb-4", t.text)}>Appearance</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setDark(false)} className={clsx("p-4 rounded-xl border-2 text-left", !dark ? "border-emerald-500" : t.border)}>
              <div className="w-full h-16 rounded-lg bg-white border border-slate-200 mb-2 flex items-center gap-1 p-2"><div className="w-3 h-3 rounded-full bg-slate-200" /><div className="flex-1 h-2 rounded bg-slate-100" /></div>
              <p className={clsx("text-sm font-medium flex items-center gap-1.5", t.text)}><Sun size={14} /> Light Mode</p>
            </button>
            <button onClick={() => setDark(true)} className={clsx("p-4 rounded-xl border-2 text-left", dark ? "border-emerald-500" : t.border)}>
              <div className="w-full h-16 rounded-lg bg-slate-900 border border-slate-700 mb-2 flex items-center gap-1 p-2"><div className="w-3 h-3 rounded-full bg-slate-700" /><div className="flex-1 h-2 rounded bg-slate-800" /></div>
              <p className={clsx("text-sm font-medium flex items-center gap-1.5", t.text)}><Moon size={14} /> Dark Mode</p>
            </button>
          </div>
        </Card>
      )}

      {tab === "Departments" && (
        <Card t={t} className="p-5">
          <DataTable t={t} columns={["Department", "Head Count", "ESG Score"]} rows={DEPARTMENTS.map(d => ({ d, hc: Math.floor(Math.random() * 150) + 40, score: DEPT_PERFORMANCE.find(p => p.dept === d)?.score }))}
            renderRow={(row, i) => (
              <tr key={i} className={t.hoverRow}>
                <td className="px-5 py-3 font-medium">{row.d}</td>
                <td className="px-5 py-3">{row.hc}</td>
                <td className="px-5 py-3 text-emerald-500 font-semibold">{row.score}</td>
              </tr>
            )} />
        </Card>
      )}

      {tab === "Categories" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Environment", "Health", "Education", "Community", "Ethics", "Supply Chain", "Governance", "Diversity"].map(c => (
            <Card key={c} t={t} className="p-4 flex items-center justify-between">
              <span className={clsx("text-sm font-medium", t.text)}>{c}</span>
              <Edit3 size={14} className={t.subtext2} />
            </Card>
          ))}
        </div>
      )}

      {tab === "Emission Factors" && (
        <Card t={t} className="p-5">
          <DataTable t={t} columns={["Category", "Unit", "Factor", "Source"]} rows={EMISSION_FACTORS}
            renderRow={(f, i) => (
              <tr key={i} className={t.hoverRow}>
                <td className="px-5 py-3 font-medium">{f.category}</td><td className="px-5 py-3">{f.unit}</td>
                <td className="px-5 py-3">{f.factor}</td><td className="px-5 py-3">{f.source}</td>
              </tr>
            )} />
        </Card>
      )}

      {tab === "Notifications" && (
        <Card t={t} className="p-6 max-w-lg space-y-4">
          {[["email", "Email notifications"], ["push", "Push notifications"], ["weekly", "Weekly AI summary digest"], ["audit", "Audit due-date alerts"]].map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <span className={clsx("text-sm", t.text)}>{label}</span>
              <button onClick={() => setToggles(s => ({ ...s, [key]: !s[key] }))}
                className={clsx("w-11 h-6 rounded-full relative transition-colors", toggles[key] ? "bg-emerald-500" : (t.dark ? "bg-slate-700" : "bg-slate-300"))}>
                <span className={clsx("absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all", toggles[key] ? "left-5" : "left-0.5")} />
              </button>
            </div>
          ))}
        </Card>
      )}

      {tab === "Security" && (
        <Card t={t} className="p-6 max-w-lg">
          <Field label="Current Password"><Input t={t} type="password" defaultValue="••••••••" /></Field>
          <Field label="New Password"><Input t={t} type="password" placeholder="Enter new password" /></Field>
          <Field label="Two-Factor Authentication">
            <div className={clsx("flex items-center justify-between p-3 rounded-xl border", t.border)}>
              <span className="text-sm flex items-center gap-2"><Fingerprint size={16} className="text-emerald-500" /> Enabled via Authenticator App</span>
              <StatusPill status="Active" />
            </div>
          </Field>
          <Button className="mt-2">Update Security Settings</Button>
        </Card>
      )}
    </div>
  );
}

/* ============================= PROFILE ============================= */

function ProfilePage({ t, employee }) {
  return (
    <div className="space-y-5">
      <Card t={t} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">{employee.avatar}</div>
        <div className="flex-1">
          <h2 className={clsx("text-xl font-bold", t.text)}>{employee.name}</h2>
          <p className={clsx("text-sm", t.subtext)}>{employee.dept} · Level {employee.level} Sustainability Champion</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className={clsx("text-xs px-2.5 py-1 rounded-full", t.chip)}>{fmt(employee.xp)} XP</span>
            <span className={clsx("text-xs px-2.5 py-1 rounded-full", t.chip)}>{employee.badges} Badges</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500">Employee ID #EC-{1000 + employee.id}</span>
          </div>
        </div>
        <Button variant="outline"><Edit3 size={15} /> Edit Profile</Button>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard t={t} icon={Target} label="ESG Contribution" value="91" accent="emerald" sub="Top 10% company-wide" />
        <KPICard t={t} icon={Trophy} label="Challenges Completed" value="14" accent="violet" />
        <KPICard t={t} icon={HeartHandshake} label="CSR Participation" value="9" accent="blue" sub="events attended" />
        <KPICard t={t} icon={Flame} label="Carbon Contribution" value="-2.4t" accent="amber" sub="personal footprint reduction" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card t={t} className="p-5">
          <h3 className={clsx("font-semibold mb-4", t.text)}>Achievements Timeline</h3>
          <div className="space-y-4">
            {["Unlocked 'Mentor' badge — Jul 9", "Completed 'Ethics Training Sprint' — Jul 5", "Reached Level 11 — Jun 28", "Redeemed 'Wellness Voucher' — Jun 20", "Completed CSR: Tree Plantation — Jun 30"].map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <p className={clsx("text-sm", t.text)}>{a}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card t={t} className="p-5">
          <h3 className={clsx("font-semibold mb-4", t.text)}>Rewards Redeemed</h3>
          <div className="space-y-3">
            {[["Extra Day Off", "Jun 18"], ["EcoSphere Merch Kit", "May 22"], ["$50 Wellness Voucher", "Apr 30"]].map(([n, d], i) => (
              <div key={i} className="flex items-center justify-between">
                <span className={clsx("text-sm flex items-center gap-2", t.text)}><Gift size={14} className="text-emerald-500" />{n}</span>
                <span className={clsx("text-xs", t.subtext2)}>{d}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ============================= REPORTS ============================= */

function ReportsPage({ t }) {
  const [type, setType] = useState("ESG Summary");
  const [dept, setDept] = useState("All Departments");
  const [format, setFormat] = useState("PDF");
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true); setGenerated(false);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1100);
  };

  return (
    <div>
      <SectionHeader t={t} title="Reports" subtitle="Generate polished, board-ready ESG reports in seconds" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card t={t} className="p-5 lg:col-span-1 h-fit">
          <h3 className={clsx("font-semibold mb-4", t.text)}>Custom Report Builder</h3>
          <Field label="Report Type">
            <Select t={t} value={type} onChange={e => setType(e.target.value)}>
              {["ESG Summary", "Environmental Report", "Social Report", "Governance Report"].map(o => <option key={o}>{o}</option>)}
            </Select>
          </Field>
          <Field label="Department">
            <Select t={t} value={dept} onChange={e => setDept(e.target.value)}>
              <option>All Departments</option>
              {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
            </Select>
          </Field>
          <Field label="Date Range">
            <div className="grid grid-cols-2 gap-2">
              <Input t={t} type="date" defaultValue="2026-01-01" />
              <Input t={t} type="date" defaultValue="2026-07-12" />
            </div>
          </Field>
          <Field label="Export Format">
            <div className="flex gap-2">
              {[{ f: "PDF", icon: FileDown }, { f: "Excel", icon: FileSpreadsheet }, { f: "CSV", icon: FileText }].map(o => (
                <button key={o.f} onClick={() => setFormat(o.f)} className={clsx("flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-medium", format === o.f ? "border-emerald-500 bg-emerald-500/10 text-emerald-500" : t.border)}>
                  <o.icon size={16} />{o.f}
                </button>
              ))}
            </div>
          </Field>
          <Button className="w-full mt-2" onClick={generate} disabled={generating}>
            {generating ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><FileBarChart size={16} /> Generate Report</>}
          </Button>
        </Card>

        <Card t={t} className="p-6 lg:col-span-2">
          <h3 className={clsx("font-semibold mb-4", t.text)}>Report Preview</h3>
          {generating && (
            <div className="space-y-3">
              <Skeleton t={t} className="h-8 w-2/3" /><Skeleton t={t} className="h-4 w-1/2" />
              <div className="grid grid-cols-3 gap-3 mt-4">{[1, 2, 3].map(i => <Skeleton key={i} t={t} className="h-20" />)}</div>
              <Skeleton t={t} className="h-40 mt-4" />
            </div>
          )}
          {!generating && !generated && (
            <EmptyState t={t} icon={FileText} title="No report generated yet" subtitle="Choose your filters and click Generate Report to see a live preview here." />
          )}
          {!generating && generated && (
            <div className={clsx("rounded-xl border p-6", t.border)}>
              <div className="flex items-center justify-between border-b pb-4 mb-4" style={{ borderColor: t.dark ? "#1E293B" : "#E2E8F0" }}>
                <div className="flex items-center gap-2"><Logo size={28} /></div>
                <span className={clsx("text-xs", t.subtext2)}>Generated {new Date().toLocaleDateString()}</span>
              </div>
              <h2 className={clsx("text-xl font-bold", t.text)}>{type} — {dept}</h2>
              <p className={clsx("text-sm mb-5", t.subtext)}>Reporting period: Jan 2026 – Jul 2026</p>
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="text-center"><p className="text-2xl font-bold text-emerald-500">84.2</p><p className={clsx("text-xs", t.subtext2)}>Overall Score</p></div>
                <div className="text-center"><p className="text-2xl font-bold text-amber-500">288t</p><p className={clsx("text-xs", t.subtext2)}>CO2e Emissions</p></div>
                <div className="text-center"><p className="text-2xl font-bold text-blue-500">88%</p><p className={clsx("text-xs", t.subtext2)}>Compliance Rate</p></div>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={ESG_TREND}>
                  <Line type="monotone" dataKey="overall" stroke="#10B981" strokeWidth={2} dot={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: t.subtext2 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle(t)} />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex gap-2 mt-5">
                <Button className="flex-1"><Download size={15} /> Download {format}</Button>
                <Button variant="ghost" className="flex-1">Share Report</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

/* ============================= AI COPILOT ============================= */

const SUGGESTED_QUESTIONS = [
  "How can we reduce emissions?", "Which department performs poorly?", "Generate ESG Summary.",
  "Show compliance risks.", "Predict carbon emission next month.", "Generate CSR ideas.", "Provide sustainability recommendations.",
];

function AICopilotPage({ t }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi, I'm your ESG Copilot. Ask me about emissions, compliance, department performance, or CSR ideas — I have live context on your organization's data." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, loading]);

  const contextSummary = `Org ESG snapshot: Overall score 84.2 (+6.4 QoQ). Environmental 83.0, Social 85.4, Governance 82.1. Carbon emissions 288 tCO2e this month, down 8.2%. Department ESG scores: ${DEPT_PERFORMANCE.map(d => `${d.dept} ${d.score}`).join(", ")}. Department emissions (tCO2e): ${DEPT_PERFORMANCE.map(d => `${d.dept} ${d.emissions}`).join(", ")}. Open compliance issues: ${COMPLIANCE_ISSUES.filter(i => i.status !== "Resolved").map(i => `${i.title} (${i.severity}, ${i.dept})`).join("; ")}. Active challenges: ${CHALLENGES.filter(c => c.status === "Active").map(c => c.title).join(", ")}. Upcoming audits: ${AUDITS.filter(a => a.status !== "Completed").map(a => `${a.title} on ${a.date}`).join(", ")}.`;

  const send = async (text) => {
    const q = text ?? input;
    if (!q.trim() || loading) return;
    setMessages(m => [...m, { role: "user", text: q }]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [
            { role: "user", content: `You are the AI ESG Copilot embedded in "EcoSphere", an enterprise ESG management platform. Answer concisely (under 180 words), in a helpful, analytical, board-ready tone, using markdown-style short bullet points where useful. Use this live organizational context when relevant:\n\n${contextSummary}\n\nUser question: ${q}` }
          ],
        }),
      });
      const data = await response.json();
      const text2 = (data.content || []).map(b => b.text || "").join("\n").trim();
      setMessages(m => [...m, { role: "assistant", text: text2 || "I couldn't generate a response just now — please try again." }]);
    } catch (e) {
      setMessages(m => [...m, { role: "assistant", text: "I'm having trouble reaching the AI service right now. Please try again in a moment." }]);
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-[calc(100vh-8rem)]">
      <div className="lg:col-span-2 flex flex-col">
        <Card t={t} className="flex-1 flex flex-col p-0 overflow-hidden">
          <div className={clsx("flex items-center gap-2.5 px-5 py-4 border-b", t.border)}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center"><Bot size={18} className="text-white" /></div>
            <div><p className={clsx("font-semibold text-sm", t.text)}>ESG Copilot</p><p className={clsx("text-xs", t.subtext2)}>Powered by live organizational data</p></div>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={clsx("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div className={clsx("max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed",
                  m.role === "user" ? "bg-emerald-500 text-white rounded-br-sm" : clsx(t.dark ? "bg-slate-800" : "bg-slate-100", t.text, "rounded-bl-sm"))}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className={clsx("rounded-2xl rounded-bl-sm px-4 py-3", t.dark ? "bg-slate-800" : "bg-slate-100")}>
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={clsx("p-4 border-t", t.border)}>
            <div className="flex gap-2">
              <Input t={t} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask about emissions, compliance, CSR ideas..." />
              <Button onClick={() => send()} disabled={loading} className="px-4"><Send size={16} /></Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-5 overflow-y-auto">
        <Card t={t} className="p-5">
          <h3 className={clsx("font-semibold mb-3 text-sm", t.text)}>Suggested Questions</h3>
          <div className="space-y-2">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button key={i} onClick={() => send(q)} className={clsx("w-full text-left text-xs px-3 py-2.5 rounded-xl border transition-colors", t.border, t.hoverRow, t.text)}>{q}</button>
            ))}
          </div>
        </Card>
        <Card t={t} className="p-5">
          <h3 className={clsx("font-semibold mb-3 text-sm flex items-center gap-2", t.text)}><TrendingUp size={15} className="text-emerald-500" />Carbon Prediction</h3>
          <p className="text-2xl font-bold text-amber-500">271 t</p>
          <p className={clsx("text-xs", t.subtext2)}>Projected next month CO2e (-6% MoM)</p>
        </Card>
        <Card t={t} className="p-5">
          <h3 className={clsx("font-semibold mb-3 text-sm flex items-center gap-2", t.text)}><ShieldAlert size={15} className="text-red-500" />Risk Analysis</h3>
          <p className={clsx("text-xs", t.subtext)}>Supply chain disclosure gaps remain the top governance risk this quarter.</p>
        </Card>
      </div>
    </div>
  );
}

/* ============================= GAMIFICATION ============================= */

function GamificationPage({ t, openModal, challenges, employees }) {
  const [tab, setTab] = useState("Challenges");
  const [lbView, setLbView] = useState("Top Employees");
  const stages = ["Draft", "Active", "Under Review", "Completed", "Archived"];

  return (
    <div>
      <SectionHeader t={t} title="Gamification" subtitle="Challenges, leaderboards, XP, rewards, and achievements"
        action={<Button onClick={() => openModal("challenge")}><Plus size={16} /> Add Challenge</Button>} />

      <Tabs t={t} tabs={["Challenges", "Leaderboard", "Badges", "Rewards Store"]} active={tab} onChange={setTab} />

      {tab === "Challenges" && (
        <div className="space-y-6">
          {stages.map(stage => {
            const items = challenges.filter(c => c.status === stage);
            if (items.length === 0) return null;
            return (
              <div key={stage}>
                <h3 className={clsx("text-sm font-semibold mb-3 flex items-center gap-2", t.subtext)}>{stage} <span className={clsx("text-xs px-1.5 py-0.5 rounded-full", t.chip)}>{items.length}</span></h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(c => (
                    <Card key={c.id} t={t} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className={clsx("text-xs px-2 py-0.5 rounded-full", t.chip)}>{c.category}</span>
                        <StatusPill status={c.status} />
                      </div>
                      <p className={clsx("font-medium", t.text)}>{c.title}</p>
                      <div className="flex items-center justify-between mt-3 text-xs">
                        <span className={clsx("flex items-center gap-1", t.subtext2)}><Users size={12} /> {c.participants}</span>
                        <span className="flex items-center gap-1 text-emerald-500 font-semibold"><Zap size={12} /> {c.xp} XP</span>
                        <span className={clsx("flex items-center gap-1", t.subtext2)}><Calendar size={12} /> {c.deadline}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "Leaderboard" && (
        <div>
          <div className="flex gap-1.5 mb-4">
            {["Top Employees", "Top Departments"].map(v => (
              <button key={v} onClick={() => setLbView(v)} className={clsx("text-xs px-3 py-1.5 rounded-full font-medium", lbView === v ? "bg-emerald-500 text-white" : t.chip)}>{v}</button>
            ))}
          </div>
          <Card t={t} className="p-5">
            {lbView === "Top Employees" ? (
              <div className="space-y-1">
                {employees.map((e, i) => (
                  <div key={e.id} className={clsx("flex items-center gap-4 p-3 rounded-xl", t.hoverRow)}>
                    <span className={clsx("text-sm font-bold w-6 text-center", i === 0 ? "text-yellow-500" : i === 1 ? "text-slate-400" : i === 2 ? "text-amber-600" : t.subtext2)}>{i + 1}</span>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">{e.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className={clsx("font-medium truncate", t.text)}>{e.name}</p>
                      <p className={clsx("text-xs", t.subtext2)}>{e.dept} · Level {e.level}</p>
                    </div>
                    <span className={clsx("text-xs px-2 py-0.5 rounded-full hidden sm:block", t.chip)}>{e.badges} badges</span>
                    <span className="text-sm font-semibold text-emerald-500 w-20 text-right">{fmt(e.xp)} XP</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {DEPT_LEADERBOARD.map((d, i) => (
                  <div key={d.dept} className={clsx("flex items-center gap-4 p-3 rounded-xl", t.hoverRow)}>
                    <span className={clsx("text-sm font-bold w-6 text-center", i === 0 ? "text-yellow-500" : t.subtext2)}>{i + 1}</span>
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center"><Building2 size={16} /></div>
                    <p className={clsx("font-medium flex-1", t.text)}>{d.dept}</p>
                    <span className="text-sm font-semibold text-emerald-500">{fmt(d.score)} pts</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {tab === "Badges" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {BADGES.map((b, i) => {
            const Icon = ICONS[b.icon] || Award;
            const tierColor = { Platinum: "from-slate-300 to-slate-500", Gold: "from-yellow-300 to-amber-500", Silver: "from-slate-200 to-slate-400", Bronze: "from-orange-300 to-orange-600" }[b.tier];
            return (
              <Card key={i} t={t} className={clsx("p-4 text-center", !b.earned && "opacity-40 grayscale")}>
                <div className={clsx("w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br flex items-center justify-center mb-3 shadow-lg", tierColor)}>
                  <Icon size={24} className="text-white" />
                </div>
                <p className={clsx("text-sm font-semibold", t.text)}>{b.name}</p>
                <p className={clsx("text-[11px] mt-1", t.subtext2)}>{b.desc}</p>
                <span className={clsx("text-[10px] mt-2 inline-block px-2 py-0.5 rounded-full", t.chip)}>{b.tier}</span>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "Rewards Store" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REWARDS.map((r, i) => (
            <Card key={i} t={t} className="p-5">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3"><Gift size={20} /></div>
              <p className={clsx("font-medium", t.text)}>{r.name}</p>
              <p className={clsx("text-xs mt-1", t.subtext2)}>{r.stock} in stock</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-bold text-emerald-500 flex items-center gap-1"><Zap size={14} />{fmt(r.cost)} XP</span>
                <Button variant="ghost" className="px-3 py-1.5 text-xs">Redeem</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================= GOVERNANCE ============================= */

function GovernancePage({ t, openModal, policies, issues, audits }) {
  const [tab, setTab] = useState("Policies");
  const riskData = [
    { risk: "Supply Chain", level: 68 }, { risk: "Data Privacy", level: 54 }, { risk: "Regulatory", level: 41 },
    { risk: "Ethics & Conduct", level: 22 }, { risk: "Financial Controls", level: 33 },
  ];

  return (
    <div>
      <SectionHeader t={t} title="Governance" subtitle="Policies, compliance, audits, and risk management"
        action={<Button onClick={() => openModal("audit")}><Plus size={16} /> Create Audit</Button>} />

      <Tabs t={t} tabs={["Policies", "Compliance Issues", "Audit Management", "Risk Management", "Departments"]} active={tab} onChange={setTab} />

      {tab === "Policies" && (
        <Card t={t} className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className={clsx("font-semibold", t.text)}>Policy Register</h3>
            <Button variant="ghost" className="text-xs px-3 py-2"><Plus size={14} /> New Policy</Button>
          </div>
          <DataTable t={t} columns={["Policy", "Category", "Status", "Acknowledgement"]} rows={policies}
            renderRow={p => (
              <tr key={p.id} className={t.hoverRow}>
                <td className="px-5 py-3 font-medium min-w-[220px]">{p.title}</td>
                <td className="px-5 py-3"><span className={clsx("text-xs px-2 py-1 rounded-full", t.chip)}>{p.category}</span></td>
                <td className="px-5 py-3"><StatusPill status={p.status} /></td>
                <td className="px-5 py-3 w-40">
                  <div className="flex items-center gap-2">
                    <ProgressBar t={t} value={p.acknowledgement} color={p.acknowledgement > 85 ? "bg-emerald-500" : "bg-amber-500"} />
                    <span className="text-xs font-medium w-9">{p.acknowledgement}%</span>
                  </div>
                </td>
              </tr>
            )} />
        </Card>
      )}

      {tab === "Compliance Issues" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard t={t} icon={ShieldAlert} label="Total Issues" value={issues.length} accent="red" />
            <KPICard t={t} icon={AlertTriangle} label="High Severity" value={issues.filter(i => i.severity === "High").length} accent="red" />
            <KPICard t={t} icon={Clock} label="Open" value={issues.filter(i => i.status === "Open").length} accent="amber" />
            <KPICard t={t} icon={CheckCircle2} label="Resolved" value={issues.filter(i => i.status === "Resolved").length} accent="emerald" />
          </div>
          <Card t={t} className="p-5">
            <DataTable t={t} columns={["Issue", "Department", "Severity", "Status", "Due Date"]} rows={issues}
              renderRow={i => (
                <tr key={i.id} className={t.hoverRow}>
                  <td className="px-5 py-3 font-medium min-w-[220px]">{i.title}</td>
                  <td className="px-5 py-3">{i.dept}</td>
                  <td className="px-5 py-3"><StatusPill status={i.severity} /></td>
                  <td className="px-5 py-3"><StatusPill status={i.status} /></td>
                  <td className="px-5 py-3 whitespace-nowrap">{i.due}</td>
                </tr>
              )} />
          </Card>
        </div>
      )}

      {tab === "Audit Management" && (
        <Card t={t} className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className={clsx("font-semibold", t.text)}>Audit Calendar</h3>
            <Button variant="ghost" className="text-xs px-3 py-2" onClick={() => openModal("audit")}><Plus size={14} /> Schedule Audit</Button>
          </div>
          <DataTable t={t} columns={["Audit", "Auditor", "Date", "Status"]} rows={audits}
            renderRow={a => (
              <tr key={a.id} className={t.hoverRow}>
                <td className="px-5 py-3 font-medium min-w-[220px]">{a.title}</td>
                <td className="px-5 py-3">{a.auditor}</td>
                <td className="px-5 py-3 whitespace-nowrap">{a.date}</td>
                <td className="px-5 py-3"><StatusPill status={a.status} /></td>
              </tr>
            )} />
        </Card>
      )}

      {tab === "Risk Management" && (
        <ChartCard t={t} title="Enterprise Risk Radar" subtitle="Relative risk exposure by category">
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={riskData}>
              <PolarGrid stroke={t.dark ? "#1E293B" : "#E2E8F0"} />
              <PolarAngleAxis dataKey="risk" tick={{ fontSize: 12, fill: t.dark ? "#94A3B8" : "#64748B" }} />
              <PolarRadiusAxis tick={{ fontSize: 10, fill: t.subtext2 }} domain={[0, 100]} />
              <Radar dataKey="level" stroke="#2563EB" fill="#2563EB" fillOpacity={0.3} strokeWidth={2} />
              <Tooltip contentStyle={tooltipStyle(t)} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {tab === "Departments" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DEPARTMENTS.map((d, i) => {
            const perf = DEPT_PERFORMANCE.find(p => p.dept === d);
            return (
              <Card key={d} t={t} className="p-5 text-center">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-3"><Building2 size={20} /></div>
                <p className={clsx("font-medium", t.text)}>{d}</p>
                <p className={clsx("text-xs mt-1", t.subtext)}>ESG Score</p>
                <p className="text-xl font-bold text-emerald-500 mt-1">{perf?.score ?? "—"}</p>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ============================= SOCIAL ============================= */

function SocialPage({ t, openModal, csrActivities }) {
  const [tab, setTab] = useState("CSR Activities");
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? csrActivities : csrActivities.filter(c => c.status === filter);

  return (
    <div>
      <SectionHeader t={t} title="Social" subtitle="CSR activities, employee wellbeing, diversity, and volunteer programs"
        action={<Button onClick={() => openModal("csrActivity")}><Plus size={16} /> Create CSR Activity</Button>} />

      <Tabs t={t} tabs={["CSR Activities", "Employee Participation", "Training Completion", "Diversity Metrics", "Employee Wellness"]} active={tab} onChange={setTab} />

      {tab === "CSR Activities" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard t={t} icon={HeartHandshake} label="Total Activities" value={csrActivities.length} accent="emerald" />
            <KPICard t={t} icon={CheckCircle2} label="Completed" value={csrActivities.filter(c => c.status === "Completed").length} accent="blue" />
            <KPICard t={t} icon={Calendar} label="Upcoming" value={csrActivities.filter(c => c.status === "Upcoming").length} accent="violet" />
            <KPICard t={t} icon={Users} label="Total Participants" value={csrActivities.reduce((s, c) => s + c.participants, 0)} accent="amber" />
          </div>
          <Card t={t} className="p-5">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h3 className={clsx("font-semibold", t.text)}>Activity Calendar View</h3>
              <div className="flex gap-1.5">
                {["All", "Upcoming", "Completed", "Pending Approval"].map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={clsx("text-xs px-3 py-1.5 rounded-full font-medium transition-colors", filter === f ? "bg-emerald-500 text-white" : t.chip)}>{f}</button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(c => (
                <div key={c.id} className={clsx("p-4 rounded-xl border", t.border)}>
                  <div className="flex items-start justify-between mb-2">
                    <span className={clsx("text-xs px-2 py-0.5 rounded-full", t.chip)}>{c.category}</span>
                    <StatusPill status={c.status} />
                  </div>
                  <p className={clsx("font-medium", t.text)}>{c.title}</p>
                  <p className={clsx("text-xs mt-1", t.subtext)}>{c.dept} · {c.date}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className={clsx("text-xs flex items-center gap-1", t.subtext2)}><Users size={12} /> {c.participants} registered</span>
                    {c.status === "Upcoming" && <button className="text-xs text-emerald-500 font-medium hover:underline">Register</button>}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <EmptyState t={t} icon={HeartHandshake} title="No activities" subtitle="No CSR activities match this filter yet." />}
            </div>
          </Card>
        </div>
      )}

      {tab === "Employee Participation" && (
        <ChartCard t={t} title="CSR Participation Trend" subtitle="Monthly employee sign-ups">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={CSR_PARTICIPATION}>
              <defs>
                <linearGradient id="part" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} /><stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={t.dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: t.subtext2 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: t.subtext2 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle(t)} />
              <Area type="monotone" dataKey="participants" stroke="#2563EB" fill="url(#part)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {tab === "Training Completion" && (
        <ChartCard t={t} title="Training Completion by Department">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={TRAINING_COMPLETION}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
              <XAxis dataKey="dept" tick={{ fontSize: 11, fill: t.subtext2 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: t.subtext2 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle(t)} />
              <Bar dataKey="completion" fill="#10B981" radius={[6, 6, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {tab === "Diversity Metrics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ChartCard t={t} title="Workforce Diversity">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={DIVERSITY_METRICS} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>
                  {DIVERSITY_METRICS.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle(t)} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
          <div className="space-y-3">
            {DIVERSITY_METRICS.map((d, i) => (
              <Card key={i} t={t} className="p-4 flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /><span className={clsx("text-sm font-medium", t.text)}>{d.name}</span></span>
                <span className={clsx("text-lg font-bold", t.text)}>{d.value}%</span>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "Employee Wellness" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WELLNESS_METRICS.map((w, i) => (
            <Card key={i} t={t} className="p-5">
              <div className="flex items-center gap-4">
                <ProgressRing t={t} value={w.value} size={64} color="#10B981" />
                <div>
                  <p className={clsx("text-2xl font-bold", t.text)}>{w.value}%</p>
                  <p className={clsx("text-sm", t.subtext)}>{w.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================= ENVIRONMENTAL ============================= */

function DataTable({ t, columns, rows, renderRow }) {
  return (
    <div className="overflow-x-auto -mx-5">
      <table className="w-full text-sm">
        <thead>
          <tr className={clsx("border-b text-left", t.border)}>
            {columns.map(c => <th key={c} className={clsx("px-5 py-3 font-medium whitespace-nowrap", t.subtext)}>{c}</th>)}
          </tr>
        </thead>
        <tbody className={clsx("divide-y", t.divide)}>
          {rows.map((row, i) => renderRow(row, i))}
        </tbody>
      </table>
    </div>
  );
}

function EnvironmentalPage({ t, openModal, transactions, deleteTx }) {
  const [tab, setTab] = useState("Overview");
  const [calcAmount, setCalcAmount] = useState(1000);
  const [calcFactor, setCalcFactor] = useState(EMISSION_FACTORS[0]);
  const result = (calcAmount * calcFactor.factor / 1000).toFixed(3);

  const byCategory = useMemo(() => {
    const map = {};
    transactions.forEach(tx => { map[tx.category] = (map[tx.category] || 0) + tx.co2e; });
    return Object.entries(map).map(([name, value], i) => ({ name, value: +value.toFixed(1), color: ["#10B981", "#2563EB", "#F59E0B", "#8B5CF6"][i % 4] }));
  }, [transactions]);

  return (
    <div>
      <SectionHeader t={t} title="Environmental" subtitle="Carbon accounting, emissions tracking, and environmental goals"
        action={<Button onClick={() => openModal("carbonTx")}><Plus size={16} /> Add Carbon Transaction</Button>} />

      <Tabs t={t} tabs={["Overview", "Carbon Transactions", "Fleet & Manufacturing", "Carbon Calculator", "Emission Factors", "Environmental Goals"]} active={tab} onChange={setTab} />

      {tab === "Overview" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard t={t} icon={Flame} label="Total Emissions" value="288 t" trend="-8.2%" trendDir="down" accent="amber" />
            <KPICard t={t} icon={Truck} label="Fleet Emissions" value="94 t" sub="32.6% of total" accent="blue" />
            <KPICard t={t} icon={Factory} label="Manufacturing" value="118 t" sub="41% of total" accent="red" />
            <KPICard t={t} icon={ShoppingCart} label="Purchase Emissions" value="42 t" sub="14.6% of total" accent="violet" />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <ChartCard t={t} title="Emissions by Category" className="xl:col-span-1">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                    {byCategory.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle(t)} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard t={t} title="Department Carbon Tracking" className="xl:col-span-2">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={DEPT_PERFORMANCE}>
                  <CartesianGrid strokeDasharray="3 3" stroke={t.dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
                  <XAxis dataKey="dept" tick={{ fontSize: 10, fill: t.subtext2 }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={50} />
                  <YAxis tick={{ fontSize: 11, fill: t.subtext2 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle(t)} />
                  <Bar dataKey="emissions" fill="#F59E0B" radius={[6, 6, 0, 0]} barSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      )}

      {tab === "Carbon Transactions" && (
        <Card t={t} className="p-5">
          <DataTable t={t} columns={["Date", "Department", "Category", "Activity", "Amount", "CO2e (t)", ""]} rows={transactions}
            renderRow={(tx) => (
              <tr key={tx.id} className={t.hoverRow}>
                <td className="px-5 py-3 whitespace-nowrap">{tx.date}</td>
                <td className="px-5 py-3 whitespace-nowrap">{tx.dept}</td>
                <td className="px-5 py-3 whitespace-nowrap"><span className={clsx("text-xs px-2 py-1 rounded-full", t.chip)}>{tx.category}</span></td>
                <td className="px-5 py-3 min-w-[200px]">{tx.activity}</td>
                <td className="px-5 py-3 whitespace-nowrap">{tx.amount} {tx.unit}</td>
                <td className="px-5 py-3 font-semibold text-amber-500 whitespace-nowrap">{tx.co2e}</td>
                <td className="px-5 py-3 text-right"><button onClick={() => deleteTx(tx.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={15} /></button></td>
              </tr>
            )} />
        </Card>
      )}

      {tab === "Fleet & Manufacturing" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[
            { title: "Fleet Emissions", icon: Truck, val: "94 t CO2e", desc: "Across 42 vehicles, regional + long-haul routes", bg: "bg-blue-500/10", fg: "text-blue-500" },
            { title: "Manufacturing Emissions", icon: Factory, val: "118 t CO2e", desc: "Blast furnace, assembly lines, facility power draw", bg: "bg-red-500/10", fg: "text-red-500" },
            { title: "Purchase Emissions", icon: ShoppingCart, val: "42 t CO2e", desc: "Raw materials, packaging, cloud & IT services", bg: "bg-violet-500/10", fg: "text-violet-500" },
          ].map((c, i) => (
            <Card key={i} t={t} className="p-5">
              <div className={clsx("w-11 h-11 rounded-xl flex items-center justify-center mb-3", c.bg)}>
                <c.icon size={20} className={c.fg} />
              </div>
              <p className={clsx("text-2xl font-bold", t.text)}>{c.val}</p>
              <p className={clsx("font-medium mt-1", t.text)}>{c.title}</p>
              <p className={clsx("text-xs mt-2", t.subtext)}>{c.desc}</p>
            </Card>
          ))}
        </div>
      )}

      {tab === "Carbon Calculator" && (
        <Card t={t} className="p-6 max-w-xl">
          <h3 className={clsx("font-semibold mb-4 flex items-center gap-2", t.text)}><Activity size={18} className="text-emerald-500" /> Carbon Calculator</h3>
          <Field label="Activity type">
            <Select t={t} value={calcFactor.category} onChange={e => setCalcFactor(EMISSION_FACTORS.find(f => f.category === e.target.value))}>
              {EMISSION_FACTORS.map(f => <option key={f.category} value={f.category}>{f.category} ({f.unit})</option>)}
            </Select>
          </Field>
          <Field label={`Quantity (${calcFactor.unit})`}>
            <Input t={t} type="number" value={calcAmount} onChange={e => setCalcAmount(+e.target.value)} />
          </Field>
          <div className={clsx("rounded-xl p-5 mt-2 border border-emerald-500/20 bg-emerald-500/5 text-center")}>
            <p className={clsx("text-xs", t.subtext)}>Estimated Emissions</p>
            <p className="text-3xl font-bold text-emerald-500 mt-1">{result} tCO2e</p>
            <p className={clsx("text-xs mt-1", t.subtext2)}>Factor: {calcFactor.factor} kg CO2e {calcFactor.unit} · {calcFactor.source}</p>
          </div>
          <Button className="w-full mt-4" onClick={() => openModal("carbonTx")}><Plus size={16} /> Log as Transaction</Button>
        </Card>
      )}

      {tab === "Emission Factors" && (
        <Card t={t} className="p-5">
          <DataTable t={t} columns={["Category", "Unit", "Factor (kg CO2e)", "Source"]} rows={EMISSION_FACTORS}
            renderRow={(f, i) => (
              <tr key={i} className={t.hoverRow}>
                <td className="px-5 py-3 font-medium">{f.category}</td>
                <td className="px-5 py-3">{f.unit}</td>
                <td className="px-5 py-3">{f.factor}</td>
                <td className="px-5 py-3"><span className={clsx("text-xs px-2 py-1 rounded-full", t.chip)}>{f.source}</span></td>
              </tr>
            )} />
        </Card>
      )}

      {tab === "Environmental Goals" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ENV_GOALS.map((g, i) => (
            <Card key={i} t={t} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <p className={clsx("font-medium max-w-[70%]", t.text)}>{g.title}</p>
                <StatusPill status={g.status} />
              </div>
              <div className="flex items-center gap-4">
                <ProgressRing t={t} value={g.progress} size={56} color={g.status === "At Risk" ? "#F59E0B" : "#10B981"} />
                <div>
                  <p className={clsx("text-xl font-bold", t.text)}>{g.progress}%</p>
                  <p className={clsx("text-xs", t.subtext)}>{g.dept}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function QuickActionButton({ t, icon: Icon, label, onClick }) {
  return (
    <button onClick={onClick} className={clsx("flex flex-col items-center justify-center gap-2 p-4 rounded-xl border text-center transition-all hover:-translate-y-0.5 hover:shadow-md", t.border, t.hoverRow)}>
      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center"><Icon size={16} /></div>
      <span className={clsx("text-xs font-medium", t.text)}>{label}</span>
    </button>
  );
}

function DashboardPage({ t, setPage, openModal, notifications, employees, transactions }) {
  return (
    <div className="space-y-6">
      <SectionHeader t={t} title="Executive Dashboard" subtitle="Real-time snapshot of your organization's ESG performance"
        action={<span className={clsx("text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5", t.chip)}><Radio size={12} className="text-emerald-500 animate-pulse" /> Live · updated just now</span>} />

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <KPICard t={t} icon={Target} label="Overall ESG Score" value="84.2" trend="+6.4" accent="emerald" sub="of 100" />
        <KPICard t={t} icon={Leaf} label="Environmental Score" value="83.0" trend="+5.1" accent="emerald" />
        <KPICard t={t} icon={Users} label="Social Score" value="85.4" trend="+3.8" accent="blue" />
        <KPICard t={t} icon={ShieldCheck} label="Governance Score" value="82.1" trend="+4.2" accent="violet" />
        <KPICard t={t} icon={Flame} label="Carbon Emissions" value="288 t" trend="-8.2%" trendDir="down" accent="amber" sub="CO2e this month" />
        <KPICard t={t} icon={Building2} label="Total Employees" value={fmt(1240)} trend="+2.1%" accent="blue" />
        <KPICard t={t} icon={HeartHandshake} label="Active CSR Activities" value="6" accent="emerald" sub="2 completed this week" />
        <KPICard t={t} icon={ShieldAlert} label="Compliance Issues" value="5" trend="-2" trendDir="down" accent="red" sub="3 open" />
        <KPICard t={t} icon={Trophy} label="Active Challenges" value="2" accent="violet" sub="156 participants" />
        <KPICard t={t} icon={GraduationCap} label="Training Completion" value="88%" trend="+4%" accent="blue" />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <ChartCard t={t} title="Carbon Emission Trend" subtitle="Monthly tCO2e vs target" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={CARBON_TREND}>
              <defs>
                <linearGradient id="emiss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} /><stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={t.dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: t.dark ? "#64748B" : "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: t.dark ? "#64748B" : "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle(t)} />
              <Area type="monotone" dataKey="target" stroke="#2563EB" strokeDasharray="4 4" fill="none" strokeWidth={2} />
              <Area type="monotone" dataKey="emissions" stroke="#10B981" fill="url(#emiss)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard t={t} title="Governance Compliance" subtitle="Policy compliance status">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={GOVERNANCE_COMPLIANCE} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3}>
                {GOVERNANCE_COMPLIANCE.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle(t)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {GOVERNANCE_COMPLIANCE.map((e, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: e.color }} />{e.name}</span>
                <span className={clsx("font-semibold", t.text)}>{e.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <ChartCard t={t} title="ESG Score Trend" subtitle="12-month composite trajectory">
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={ESG_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: t.dark ? "#64748B" : "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: t.dark ? "#64748B" : "#94A3B8" }} axisLine={false} tickLine={false} domain={[50, 90]} />
              <Tooltip contentStyle={tooltipStyle(t)} />
              <Line type="monotone" dataKey="overall" stroke="#10B981" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="social" stroke="#2563EB" strokeWidth={1.5} dot={false} strokeOpacity={0.6} />
              <Line type="monotone" dataKey="gov" stroke="#8B5CF6" strokeWidth={1.5} dot={false} strokeOpacity={0.6} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard t={t} title="Department Performance" subtitle="ESG score by department">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={DEPT_PERFORMANCE} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: t.dark ? "#64748B" : "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="dept" width={80} tick={{ fontSize: 11, fill: t.dark ? "#64748B" : "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle(t)} />
              <Bar dataKey="score" fill="#10B981" radius={[0, 6, 6, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard t={t} title="Monthly Sustainability Progress" subtitle="Goal completion %">
          <div className="space-y-4 pt-2">
            {SUSTAINABILITY_PROGRESS.map((g, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1.5"><span className={t.subtext}>{g.goal}</span><span className={clsx("font-semibold", t.text)}>{g.progress}%</span></div>
                <ProgressBar t={t} value={g.progress} color={g.progress > 70 ? "bg-emerald-500" : g.progress > 50 ? "bg-blue-500" : "bg-amber-500"} />
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Bottom grid: timeline, AI, notifications */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card t={t} className="p-5 xl:col-span-1">
          <h3 className={clsx("font-semibold mb-4", t.text)}>Recent Activity</h3>
          <div className="space-y-4">
            {ACTIVITY_TIMELINE.map((a, i) => {
              const Icon = ICONS[a.icon];
              const colorMap = { emerald: "text-emerald-500 bg-emerald-500/10", amber: "text-amber-500 bg-amber-500/10", blue: "text-blue-500 bg-blue-500/10", red: "text-red-500 bg-red-500/10", violet: "text-violet-500 bg-violet-500/10" };
              return (
                <div key={i} className="flex gap-3">
                  <div className={clsx("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", colorMap[a.color])}><Icon size={14} /></div>
                  <div>
                    <p className={clsx("text-sm leading-snug", t.text)}>{a.text}</p>
                    <p className={clsx("text-xs mt-0.5", t.subtext2)}>{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card t={t} className="p-5 xl:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-emerald-500" />
            <h3 className={clsx("font-semibold", t.text)}>AI Recommendations</h3>
          </div>
          <div className="space-y-3">
            {AI_RECOMMENDATIONS.map((r, i) => (
              <div key={i} className={clsx("p-3 rounded-xl border", t.border)}>
                <p className={clsx("text-sm font-medium leading-snug", t.text)}>{r.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-emerald-500 font-semibold">{r.impact}</span>
                  <span className={clsx("text-xs", t.subtext2)}>{r.confidence}% confidence</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setPage("copilot")} className="text-xs text-emerald-500 font-medium mt-4 flex items-center gap-1 hover:underline">
            Ask AI Copilot for more <ChevronRight size={12} />
          </button>
        </Card>

        <Card t={t} className="p-5 xl:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className={clsx("font-semibold", t.text)}>Notifications</h3>
            <button onClick={() => setPage("notifications")} className="text-xs text-emerald-500 font-medium hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {notifications.slice(0, 4).map(n => {
              const Icon = ICONS[n.icon];
              return (
                <div key={n.id} className="flex gap-3">
                  <div className={clsx("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", n.read ? t.chip : "bg-emerald-500/10 text-emerald-500")}><Icon size={14} /></div>
                  <div>
                    <p className={clsx("text-sm leading-snug", t.text)}>{n.title}</p>
                    <p className={clsx("text-xs mt-0.5", t.subtext2)}>{n.time}</p>
                  </div>
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 ml-auto shrink-0" />}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Bottom grid 2: audits, transactions, leaderboard */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card t={t} className="p-5">
          <h3 className={clsx("font-semibold mb-4", t.text)}>Upcoming Audits</h3>
          <div className="space-y-3">
            {AUDITS.filter(a => a.status !== "Completed").slice(0, 4).map(a => (
              <div key={a.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className={clsx("text-sm font-medium truncate", t.text)}>{a.title}</p>
                  <p className={clsx("text-xs", t.subtext2)}>{a.auditor} · {a.date}</p>
                </div>
                <StatusPill status={a.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card t={t} className="p-5">
          <h3 className={clsx("font-semibold mb-4", t.text)}>Recent Carbon Transactions</h3>
          <div className="space-y-3">
            {transactions.slice(0, 4).map(tx => (
              <div key={tx.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className={clsx("text-sm font-medium truncate", t.text)}>{tx.activity}</p>
                  <p className={clsx("text-xs", t.subtext2)}>{tx.dept} · {tx.date}</p>
                </div>
                <span className="text-sm font-semibold text-amber-500 shrink-0">{tx.co2e}t</span>
              </div>
            ))}
          </div>
        </Card>

        <Card t={t} className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className={clsx("font-semibold", t.text)}>Leaderboard Preview</h3>
            <button onClick={() => setPage("gamification")} className="text-xs text-emerald-500 font-medium hover:underline">Full board</button>
          </div>
          <div className="space-y-3">
            {employees.slice(0, 4).map((e, i) => (
              <div key={e.id} className="flex items-center gap-3">
                <span className={clsx("text-xs font-bold w-4", i === 0 ? "text-yellow-500" : t.subtext2)}>{i + 1}</span>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">{e.avatar}</div>
                <div className="min-w-0 flex-1">
                  <p className={clsx("text-sm font-medium truncate", t.text)}>{e.name}</p>
                  <p className={clsx("text-xs", t.subtext2)}>{e.dept}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-500 shrink-0">{fmt(e.xp)} XP</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card t={t} className="p-5">
        <h3 className={clsx("font-semibold mb-4", t.text)}>Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <QuickActionButton t={t} icon={Flame} label="Add Carbon Transaction" onClick={() => openModal("carbonTx")} />
          <QuickActionButton t={t} icon={HeartHandshake} label="Create CSR Activity" onClick={() => openModal("csrActivity")} />
          <QuickActionButton t={t} icon={Trophy} label="Add Challenge" onClick={() => openModal("challenge")} />
          <QuickActionButton t={t} icon={FileBarChart} label="Generate ESG Report" onClick={() => setPage("reports")} />
          <QuickActionButton t={t} icon={ClipboardList} label="Create Audit" onClick={() => openModal("audit")} />
        </div>
      </Card>
    </div>
  );
}

function LoginPage({ t, dark, setDark, onLogin }) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("priya.nair@ecosphere.io");
  const [password, setPassword] = useState("••••••••••");
  const [remember, setRemember] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 700);
  };

  return (
    <div className={clsx("min-h-screen w-full flex", t.appBg, t.text)}>
      <button onClick={() => setDark(!dark)} className={clsx("fixed top-5 right-5 z-10 p-2.5 rounded-xl border", t.card)}>
        {dark ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Left - form */}
      <div className="w-full lg:w-[46%] flex flex-col justify-center px-8 sm:px-16 py-12">
        <div className="max-w-sm mx-auto w-full">
          <Logo />
          <h1 className="text-3xl font-bold tracking-tight mt-10">{signUp ? "Create your account" : "Welcome back"}</h1>
          <p className={clsx("text-sm mt-2", t.subtext)}>
            {signUp ? "Start tracking your organization's ESG impact today." : "Sign in to your ESG Management Platform."}
          </p>

          <form onSubmit={submit} className="mt-8">
            <Field label="Email address">
              <div className="relative">
                <Mail size={16} className={clsx("absolute left-3.5 top-1/2 -translate-y-1/2", t.subtext2)} />
                <input value={email} onChange={e => setEmail(e.target.value)} type="email"
                  className={clsx("w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-emerald-500/40", t.inputBg)} />
              </div>
            </Field>
            <Field label="Password">
              <div className="relative">
                <Lock size={16} className={clsx("absolute left-3.5 top-1/2 -translate-y-1/2", t.subtext2)} />
                <input value={password} onChange={e => setPassword(e.target.value)} type={showPass ? "text" : "password"}
                  className={clsx("w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-emerald-500/40", t.inputBg)} />
                <button type="button" onClick={() => setShowPass(!showPass)} className={clsx("absolute right-3.5 top-1/2 -translate-y-1/2", t.subtext2)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            {!signUp && (
              <div className="flex items-center justify-between mb-6 text-sm">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="accent-emerald-500 w-4 h-4 rounded" />
                  <span className={t.subtext}>Remember me</span>
                </label>
                <a className="text-emerald-500 font-medium hover:underline">Forgot password?</a>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : (signUp ? "Create account" : "Log in")}
            </Button>
          </form>

          <p className={clsx("text-sm text-center mt-6", t.subtext)}>
            {signUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setSignUp(!signUp)} className="text-emerald-500 font-medium hover:underline">
              {signUp ? "Log in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>

      {/* Right - illustration */}
      <div className="hidden lg:flex lg:w-[54%] relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-800 items-center justify-center p-16">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative z-10 max-w-md text-white">
          <div className="flex gap-1.5 mb-6">
            {[1, 2, 3].map(i => <div key={i} className="w-8 h-1.5 rounded-full bg-white/40" />)}
          </div>
          <h2 className="text-3xl font-bold leading-tight mb-4">Turn ESG data into decisions your board can act on.</h2>
          <p className="text-emerald-50/80 text-sm mb-10">Real-time carbon accounting, workforce wellbeing, and governance compliance — unified in one command center.</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
              <p className="text-2xl font-bold">84.2</p>
              <p className="text-xs text-emerald-50/70 mt-1">Overall ESG Score</p>
              <div className="flex items-center gap-1 text-xs text-emerald-200 mt-2"><ArrowUpRight size={12} /> +6.4 this quarter</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
              <p className="text-2xl font-bold">-30%</p>
              <p className="text-xs text-emerald-50/70 mt-1">Carbon Emissions YoY</p>
              <div className="flex items-center gap-1 text-xs text-emerald-200 mt-2"><Leaf size={12} /> Ahead of target</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 col-span-2 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">1,240 employees</p>
                <p className="text-xs text-emerald-50/70">participating in sustainability challenges</p>
              </div>
              <Trophy size={28} className="text-yellow-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
