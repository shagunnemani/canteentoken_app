import { useState, useEffect, useCallback } from "react";
import { formatTime, getTokens, saveTokens } from "../data/index.js";

const AdminPage = ({ showToast }) => {
  const [tokens, setTokens] = useState([]);
  const [tab, setTab]       = useState("active");

  const load = useCallback(() => setTokens(getTokens()), []);
  useEffect(() => { load(); const iv = setInterval(load, 2000); return () => clearInterval(iv); }, [load]);

  const serving = tokens.find(t => t.status === "serving");
  const waiting = tokens.filter(t => t.status === "waiting");
  const served  = tokens.filter(t => t.status === "served");
  const revenue = served.reduce((s, t) => s + t.total, 0);

  const callNext = () => {
    let all = getTokens().map(t => t.status === "serving" ? { ...t, status:"served" } : t);
    const next = all.filter(t => t.status === "waiting").sort((a, b) => a.tokenNumber - b.tokenNumber)[0];
    if (next) all = all.map(t => t.id === next.id ? { ...t, status:"serving" } : t);
    saveTokens(all);
    load();
    showToast(next ? `Now serving Token #${next.tokenNumber}` : "No more tokens in queue", "info");
  };

  const markServed = id => {
    saveTokens(getTokens().map(t => t.id === id ? { ...t, status:"served" } : t));
    load();
    showToast("Token marked as served", "success");
  };

  const clearAll = () => {
    saveTokens([]);
    load();
    showToast("All tokens cleared", "info");
  };

  const displayTokens = tokens
    .filter(t => tab === "all" ? true : tab === "served" ? t.status === "served" : t.status !== "served")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Admin Dashboard ⚡</h1>
          <p className="page-subtitle">Manage tokens, queue & operations</p>
        </div>
        <button className="btn btn-danger" style={{ fontSize:12, padding:"8px 14px" }} onClick={clearAll}>Clear All Tokens</button>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom:28 }}>
        <div className="stat-card">
          <span className="stat-label">Waiting</span>
          <span className="stat-num" style={{ color:"var(--blue)" }}>{waiting.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Served</span>
          <span className="stat-num" style={{ color:"var(--green)" }}>{served.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Tokens</span>
          <span className="stat-num">{tokens.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Revenue</span>
          <span className="stat-num" style={{ color:"var(--accent)", fontSize:28 }}>₹{revenue}</span>
        </div>
      </div>

      {/* Current serving + queue preview */}
      <div className="grid-2" style={{ marginBottom:28 }}>
        <div className="current-serving">
          <div className="cs-label">Now Serving</div>
          {serving ? (
            <>
              <div className="cs-num">#{serving.tokenNumber}</div>
              <div style={{ fontSize:14, color:"var(--muted)", marginTop:4 }}>{serving.name}</div>
              <div style={{ fontSize:13, color:"var(--muted)", marginTop:2 }}>{serving.items.length} items · ₹{serving.total}</div>
              <div style={{ marginTop:16, display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                <button className="btn btn-success" onClick={() => markServed(serving.id)}>✅ Mark Served</button>
                <button className="btn btn-primary" onClick={callNext}>⏭ Call Next</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:48, color:"var(--muted)", lineHeight:1 }}>—</div>
              <div style={{ color:"var(--muted)", fontSize:14, marginTop:8 }}>No token being served</div>
              <button className="btn btn-primary" style={{ marginTop:16 }} onClick={callNext} disabled={waiting.length === 0}>
                ▶ Start Queue
              </button>
            </>
          )}
        </div>

        <div className="card">
          <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, marginBottom:16 }}>Queue Preview</div>
          {waiting.length === 0 ? (
            <div style={{ textAlign:"center", color:"var(--muted)", padding:"20px 0", fontSize:14 }}>No tokens waiting</div>
          ) : waiting.slice(0, 5).map((t, i) => (
            <div key={t.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid var(--border)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:12, color:"var(--muted)", minWidth:18 }}>#{i + 1}</span>
                <span style={{ fontWeight:600 }}>Token #{t.tokenNumber}</span>
                <span style={{ fontSize:12, color:"var(--muted)" }}>{t.name}</span>
              </div>
              <span style={{ fontSize:12, color:"var(--accent)", fontWeight:600 }}>₹{t.total}</span>
            </div>
          ))}
          {waiting.length > 5 && <div style={{ fontSize:12, color:"var(--muted)", textAlign:"center", marginTop:10 }}>+{waiting.length - 5} more</div>}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {["active", "served", "all"].map(t => (
          <button key={t} className={`cat-pill${tab === t ? " active" : ""}`} onClick={() => setTab(t)} style={{ textTransform:"capitalize" }}>
            {t === "active" ? "Active (Waiting/Serving)" : t === "served" ? "Served" : "All"}
          </button>
        ))}
      </div>

      {/* Tokens table */}
      <div className="card" style={{ overflowX:"auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Token</th><th>Customer</th><th>Items</th>
              <th>Amount</th><th>Time</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayTokens.map(t => (
              <tr key={t.id}>
                <td><span style={{ fontFamily:"Syne", fontWeight:800, color:"var(--accent)", fontSize:16 }}>#{t.tokenNumber}</span></td>
                <td>
                  <div style={{ fontWeight:600, fontSize:14 }}>{t.name}</div>
                  <div style={{ fontSize:11, color:"var(--muted)" }}>@{t.username}</div>
                </td>
                <td>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap", maxWidth:200 }}>
                    {t.items.map(i => <span key={i.id} style={{ fontSize:11, background:"var(--surface2)", borderRadius:4, padding:"2px 6px" }}>{i.emoji}{i.name.split(" ")[0]}</span>)}
                  </div>
                </td>
                <td><span style={{ fontFamily:"Syne", fontWeight:700 }}>₹{t.total}</span></td>
                <td style={{ fontSize:12, color:"var(--muted)" }}>{formatTime(t.createdAt)}</td>
                <td>
                  <span className={`badge ${t.status === "served" ? "badge-green" : t.status === "serving" ? "badge-orange" : "badge-blue"}`}>
                    {t.status}
                  </span>
                </td>
                <td>
                  {t.status === "waiting" && (
                    <button className="btn btn-primary" style={{ padding:"5px 10px", fontSize:11 }} onClick={callNext}>Serve</button>
                  )}
                  {t.status === "serving" && (
                    <button className="btn btn-success" style={{ padding:"5px 10px", fontSize:11 }} onClick={() => markServed(t.id)}>Done</button>
                  )}
                  {t.status === "served" && <span style={{ fontSize:12, color:"var(--green)" }}>✔ Done</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tokens.length === 0 && (
          <div className="empty-state">
            <div className="icon">📋</div>
            <h3>No tokens yet</h3>
            <p>Tokens will appear here when customers place orders</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
