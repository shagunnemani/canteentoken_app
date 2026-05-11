import { useState, useEffect } from "react";
import { formatTime, getTokens } from "../data/index.js";

const AVG_TIME = 4; // minutes per token

const QueuePage = ({ user }) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const load = () => setTokens(getTokens());
    load();
    const iv = setInterval(load, 2000);
    return () => clearInterval(iv);
  }, []);

  const waiting  = tokens.filter(t => t.status === "waiting");
  const serving  = tokens.find(t => t.status === "serving");
  const served   = tokens.filter(t => t.status === "served");

  const myAhead = tokens
    .filter(t => t.username === user.username && t.status === "waiting")
    .map(t => {
      const idx = waiting.findIndex(w => w.id === t.id);
      return { ...t, ahead: idx, wait: (idx + 1) * AVG_TIME };
    });

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Queue Status 🔢</h1>
          <p className="page-subtitle">Live view of the canteen queue — updates every 2s</p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"var(--green)" }}>
          <span style={{ width:6, height:6, borderRadius:3, background:"var(--green)", display:"inline-block", animation:"pulse 1.5s infinite" }} />
          Live
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom:28 }}>
        <div className="stat-card">
          <span className="stat-label">Now Serving</span>
          <span className="stat-num" style={{ color:"var(--accent)" }}>{serving ? `#${serving.tokenNumber}` : "—"}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">In Queue</span>
          <span className="stat-num" style={{ color:"var(--blue)" }}>{waiting.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Est. Wait (last)</span>
          <span className="stat-num" style={{ color:"var(--green)" }}>{waiting.length ? `${waiting.length * AVG_TIME}m` : "0m"}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Served Today</span>
          <span className="stat-num">{served.length}</span>
        </div>
      </div>

      {/* My position */}
      {myAhead.length > 0 && (
        <div className="card" style={{ marginBottom:24, border:"1px solid var(--accent)", background:"rgba(245,166,35,.05)" }}>
          <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, marginBottom:14 }}>📍 Your Position</div>
          {myAhead.map(t => (
            <div key={t.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", background:"var(--surface2)", borderRadius:10, marginBottom:8 }}>
              <div>
                <div style={{ fontFamily:"Syne", fontWeight:700 }}>Token #{t.tokenNumber}</div>
                <div style={{ fontSize:13, color:"var(--muted)" }}>
                  {t.ahead === 0 ? "You're next! 🎉" : `${t.ahead} ahead of you`}
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:22, color:"var(--accent)" }}>~{t.wait}m</div>
                <div style={{ fontSize:11, color:"var(--muted)" }}>est. wait</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Queue list */}
      <div className="card">
        <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, marginBottom:16 }}>Current Queue</div>
        {waiting.length === 0 ? (
          <div className="empty-state" style={{ padding:"40px 0" }}>
            <div className="icon">✅</div>
            <h3>Queue is empty</h3>
            <p>No tokens waiting right now</p>
          </div>
        ) : (
          waiting.map((t, i) => (
            <div key={t.id} className={`queue-item${serving?.id === t.id ? " active-token" : ""}`}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{
                  width:36, height:36, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
                  background: i === 0 ? "linear-gradient(135deg,var(--accent),var(--accent2))" : "var(--border)",
                  fontFamily:"Syne", fontWeight:800, fontSize:14,
                  color: i === 0 ? "#0d0f14" : "var(--muted)"
                }}>{i + 1}</div>
                <div>
                  <div style={{ fontWeight:600, fontSize:14 }}>
                    Token #{t.tokenNumber}
                    {t.username === user.username && <span style={{ fontSize:11, color:"var(--accent)", marginLeft:8, fontWeight:700 }}>● YOU</span>}
                  </div>
                  <div style={{ fontSize:12, color:"var(--muted)" }}>
                    {t.items.length} item{t.items.length > 1 ? "s" : ""} · ₹{t.total} · {formatTime(t.createdAt)}
                  </div>
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:13, color:"var(--muted)" }}>~{(i + 1) * AVG_TIME}m wait</div>
                {i === 0 && <span className="badge badge-orange" style={{ fontSize:10 }}>Next up</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QueuePage;
