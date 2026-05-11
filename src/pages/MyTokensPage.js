import { useState, useEffect } from "react";
import { formatTime, formatDate, getTokens } from "../data/index.js";

const statusBadge = s => s === "served" ? "badge-green" : s === "serving" ? "badge-orange" : "badge-blue";

const TokenTicket = ({ t }) => (
  <div style={{ marginTop:20, paddingTop:20, borderTop:"1px solid var(--border)" }}>
    <div className="ticket">
      <div style={{ position:"relative", zIndex:1 }}>
        <div style={{ fontSize:11, color:"var(--muted)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:4 }}>Token Number</div>
        <div className="token-number">#{t.tokenNumber}</div>
        <div style={{ fontFamily:"Syne", fontWeight:600, fontSize:16, marginBottom:4 }}>Hello, {t.name}!</div>
        <div style={{ fontSize:13, color:"var(--muted)", marginBottom:20 }}>{formatDate(t.createdAt)} · {formatTime(t.createdAt)}</div>

        <div style={{ textAlign:"left", background:"var(--surface2)", borderRadius:12, padding:16, marginBottom:16 }}>
          {t.items.map(i => (
            <div key={i.id} style={{ display:"flex", justifyContent:"space-between", marginBottom:8, fontSize:14 }}>
              <span>{i.emoji} {i.name} × {i.qty}</span>
              <span style={{ fontWeight:600 }}>₹{i.subtotal}</span>
            </div>
          ))}
          <div style={{ borderTop:"1px dashed var(--border)", marginTop:10, paddingTop:10, display:"flex", justifyContent:"space-between", fontFamily:"Syne", fontWeight:800, fontSize:16 }}>
            <span>Total</span>
            <span style={{ color:"var(--accent)" }}>₹{t.total}</span>
          </div>
        </div>

        <span className={`badge ${statusBadge(t.status)}`} style={{ fontSize:13, padding:"6px 16px" }}>
          {t.status === "waiting" ? "⏳ Waiting in queue" : t.status === "serving" ? "🔥 Now Serving!" : "✅ Collected"}
        </span>
      </div>
    </div>
  </div>
);

const MyTokensPage = ({ user }) => {
  const [tokens, setTokens] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const load = () => setTokens(getTokens().filter(t => t.username === user.username).reverse());
    load();
    const iv = setInterval(load, 3000);
    return () => clearInterval(iv);
  }, [user]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Tokens 🎫</h1>
          <p className="page-subtitle">Track your orders & collection status</p>
        </div>
        <span className="badge badge-blue">{tokens.length} Total</span>
      </div>

      {tokens.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🎫</div>
          <h3>No tokens yet</h3>
          <p>Place an order from the menu to get your first token</p>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {tokens.map(t => (
            <div key={t.id} className="card"
              style={{ cursor:"pointer", transition:"transform .2s", border: selected?.id === t.id ? "1px solid var(--accent)" : "1px solid var(--border)" }}
              onClick={() => setSelected(s => s?.id === t.id ? null : t)}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:20 }}>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:11, color:"var(--muted)", marginBottom:2 }}>TOKEN</div>
                    <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:36, color:"var(--accent)", lineHeight:1 }}>#{t.tokenNumber}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight:600, fontSize:15, marginBottom:4 }}>{t.items.length} item{t.items.length > 1 ? "s" : ""} ordered</div>
                    <div style={{ fontSize:12, color:"var(--muted)" }}>📅 {formatDate(t.createdAt)} at {formatTime(t.createdAt)}</div>
                    <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
                      {t.items.slice(0, 3).map(i => (
                        <span key={i.id} style={{ fontSize:11, background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:6, padding:"2px 8px", color:"var(--muted)" }}>
                          {i.emoji} {i.name}
                        </span>
                      ))}
                      {t.items.length > 3 && <span style={{ fontSize:11, color:"var(--muted)" }}>+{t.items.length - 3} more</span>}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <span className={`badge ${statusBadge(t.status)}`} style={{ marginBottom:8, display:"inline-flex" }}>
                    {t.status === "serving" && <span style={{ width:6, height:6, borderRadius:3, background:"var(--accent)", animation:"pulse 1s infinite", display:"inline-block", marginRight:4 }} />}
                    {t.status}
                  </span>
                  <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:20 }}>₹{t.total}</div>
                </div>
              </div>
              {selected?.id === t.id && <TokenTicket t={t} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTokensPage;
