import { useState, useEffect } from "react";
import { formatTime, formatDate, getTokens } from "../data/index.js";

const AllTokensPage = () => {
  const [tokens, setTokens] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = () => setTokens(getTokens().reverse());
    load();
    const iv = setInterval(load, 3000);
    return () => clearInterval(iv);
  }, []);

  const filtered = tokens
    .filter(t => filter === "all" || t.status === filter)
    .filter(t =>
      t.tokenNumber?.toString().includes(search) ||
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.username?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">All Issued Tokens 📋</h1>
          <p className="page-subtitle">Complete ledger of all canteen tokens</p>
        </div>
      </div>

      <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
        {["all","waiting","serving","served"].map(f => (
          <button key={f} className={`cat-pill${filter === f ? " active" : ""}`} onClick={() => setFilter(f)} style={{ textTransform:"capitalize" }}>{f}</button>
        ))}
        <div className="search-wrap" style={{ marginLeft:"auto", minWidth:200 }}>
          <span className="search-icon">🔍</span>
          <input className="input search-input" placeholder="Search token, name…" value={search}
            onChange={e => setSearch(e.target.value)} style={{ height:36 }} />
        </div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {filtered.map(t => (
          <div key={t.id} className="card fade-up" style={{ padding:"16px 20px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:32, color:"var(--accent)", minWidth:60 }}>#{t.tokenNumber}</div>
                <div>
                  <div style={{ fontWeight:600, fontSize:15 }}>
                    {t.name} <span style={{ color:"var(--muted)", fontWeight:400, fontSize:13 }}>@{t.username}</span>
                  </div>
                  <div style={{ fontSize:12, color:"var(--muted)", marginTop:2 }}>
                    {formatDate(t.createdAt)} · {formatTime(t.createdAt)} · {t.items.length} items
                  </div>
                  <div style={{ marginTop:6, display:"flex", gap:4, flexWrap:"wrap" }}>
                    {t.items.map(i => (
                      <span key={i.id} style={{ fontSize:11, background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:5, padding:"2px 7px", color:"var(--muted)" }}>
                        {i.emoji} {i.name} ×{i.qty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:20 }}>₹{t.total}</div>
                <span className={`badge ${t.status === "served" ? "badge-green" : t.status === "serving" ? "badge-orange" : "badge-blue"}`} style={{ marginTop:6, display:"inline-flex" }}>
                  {t.status}
                </span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="icon">📋</div>
            <h3>No tokens found</h3>
            <p>Try adjusting your filters or search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTokensPage;
