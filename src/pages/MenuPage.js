import { useState } from "react";
import { MENU_ITEMS, CATEGORIES, getTokens, saveTokens } from "../data/index.js";

// ─── QTY CONTROL ─────────────────────────────────────────────────────────────
const QtyCtrl = ({ qty, onDec, onInc, small }) => (
  <div className="qty-ctrl">
    <button className="qty-btn" style={small ? { width:28, height:28 } : {}} onClick={onDec}>−</button>
    <span className="qty-val" style={small ? { fontSize:13 } : {}}>{qty}</span>
    <button className="qty-btn" style={small ? { width:28, height:28 } : {}} onClick={onInc}>+</button>
  </div>
);

// ─── CHECKOUT MODAL ───────────────────────────────────────────────────────────
const CheckoutModal = ({ cartItems, total, onQty, onClose, onPlace }) => (
  <div className="overlay" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
        <h2 style={{ fontSize:22, fontWeight:800 }}>Your Order 🛒</h2>
        <button className="btn btn-ghost" style={{ padding:"6px 10px" }} onClick={onClose}>✕</button>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
        {cartItems.map(item => (
          <div key={item.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", background:"var(--surface2)", borderRadius:10, border:"1px solid var(--border)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:22 }}>{item.emoji}</span>
              <div>
                <div style={{ fontWeight:600, fontSize:14 }}>{item.name}</div>
                <div style={{ fontSize:12, color:"var(--muted)" }}>₹{item.price} × {item.qty}</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <QtyCtrl small qty={item.qty} onDec={() => onQty(item.id, -1)} onInc={() => onQty(item.id, +1)} />
              <span style={{ fontFamily:"Syne", fontWeight:700, fontSize:15, minWidth:52, textAlign:"right" }}>₹{item.price * item.qty}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="divider" />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
        <span style={{ fontSize:15, fontWeight:600 }}>Total Amount</span>
        <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:24, color:"var(--accent)" }}>₹{total}</span>
      </div>

      <div style={{ background:"rgba(245,166,35,.07)", border:"1px solid rgba(245,166,35,.2)", borderRadius:10, padding:"12px 14px", marginBottom:20, fontSize:13, color:"var(--muted)" }}>
        🎫 A token number will be issued after placing your order. Collect your food when your token is called.
      </div>

      <button className="btn btn-primary" style={{ width:"100%", padding:14, fontSize:15 }} onClick={onPlace}>
        🎫 Place Order & Get Token
      </button>
    </div>
  </div>
);

// ─── MENU PAGE ────────────────────────────────────────────────────────────────
const MenuPage = ({ user, onGo, showToast }) => {
  const [cart, setCart]         = useState({});
  const [cat, setCat]           = useState("All");
  const [search, setSearch]     = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [placed, setPlaced]     = useState(null);

  const filtered = MENU_ITEMS.filter(i =>
    (cat === "All" || i.category === cat) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = Object.entries(cart).reduce((s, [id, q]) => {
    const item = MENU_ITEMS.find(i => i.id === +id);
    return s + (item ? item.price * q : 0);
  }, 0);

  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);
  const cartItems = Object.entries(cart).map(([id, q]) => ({ ...MENU_ITEMS.find(i => i.id === +id), qty: q }));

  const setQty = (id, delta) => {
    setCart(c => {
      const next = Math.max(0, (c[id] || 0) + delta);
      if (next === 0) { const { [id]:_, ...rest } = c; return rest; }
      return { ...c, [id]: next };
    });
  };

  const placeOrder = () => {
    if (cartCount === 0) return;
    const tokens = getTokens();
    const nextNum = (tokens.length ? Math.max(...tokens.map(t => t.tokenNumber)) : 0) + 1;
    const items = Object.entries(cart).map(([id, q]) => {
      const item = MENU_ITEMS.find(i => i.id === +id);
      return { ...item, qty: q, subtotal: item.price * q };
    });
    const token = {
      id: Date.now(),
      tokenNumber: nextNum,
      username: user.username,
      name: user.name || user.username,
      items,
      total,
      status: "waiting",
      createdAt: new Date().toISOString(),
    };
    saveTokens([...tokens, token]);
    setPlaced(token);
    setCart({});
    setShowCheckout(false);
    showToast(`Token #${nextNum} issued successfully!`, "success");
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Today's Menu 🍽️</h1>
          <p className="page-subtitle">Fresh, hot & ready — pick your favourites</p>
        </div>
      </div>

      {/* Order placed banner */}
      {placed && (
        <div style={{ background:"rgba(34,197,94,.08)", border:"1px solid var(--green)", borderRadius:16, padding:"20px 24px", marginBottom:24, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:28 }}>🎉</span>
            <div>
              <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16 }}>Token <span style={{ color:"var(--accent)" }}>#{placed.tokenNumber}</span> placed!</div>
              <div style={{ fontSize:13, color:"var(--muted)" }}>Your order is in queue · ₹{placed.total}</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn btn-success" onClick={() => onGo("myTokens")}>View Token</button>
            <button className="btn btn-ghost" style={{ fontSize:12 }} onClick={() => setPlaced(null)}>✕</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20, alignItems:"center" }}>
        {CATEGORIES.map(c => (
          <button key={c} className={`cat-pill${cat === c ? " active" : ""}`} onClick={() => setCat(c)}>{c}</button>
        ))}
        <div className="search-wrap" style={{ marginLeft:"auto", minWidth:200 }}>
          <span className="search-icon">🔍</span>
          <input className="input search-input" placeholder="Search items…" value={search}
            onChange={e => setSearch(e.target.value)} style={{ height:36 }} />
        </div>
      </div>

      {/* Grid */}
      <div className="grid-4">
        {filtered.map((item, i) => (
          <div key={item.id} className="menu-card fade-up" style={{ animationDelay:`${i * 0.04}s` }}>
            <div className="menu-img">{item.emoji}</div>
            <div style={{ padding:"14px 16px" }}>
              <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:15, marginBottom:4 }}>{item.name}</div>
              <div style={{ fontSize:12, color:"var(--muted)", marginBottom:12, lineHeight:1.4 }}>{item.desc}</div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:17, color:"var(--accent)" }}>₹{item.price}</span>
                {cart[item.id] ? (
                  <QtyCtrl qty={cart[item.id]} onDec={() => setQty(item.id, -1)} onInc={() => setQty(item.id, +1)} />
                ) : (
                  <button className="btn btn-primary" style={{ padding:"7px 14px", fontSize:13 }} onClick={() => setQty(item.id, +1)}>
                    + Add
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state" style={{ gridColumn:"1/-1" }}>
            <div className="icon">🍽️</div>
            <h3>No items found</h3>
            <p>Try a different category or search term</p>
          </div>
        )}
      </div>

      {/* Cart strip */}
      {cartCount > 0 && (
        <div className="cart-strip" onClick={() => setShowCheckout(true)}>
          <div style={{ background:"rgba(0,0,0,.25)", borderRadius:20, padding:"3px 10px", fontSize:13 }}>
            {cartCount} item{cartCount > 1 ? "s" : ""}
          </div>
          <span>View Cart & Checkout</span>
          <span>₹{total} →</span>
        </div>
      )}

      {/* Checkout modal */}
      {showCheckout && (
        <CheckoutModal
          cartItems={cartItems}
          total={total}
          onQty={setQty}
          onClose={() => setShowCheckout(false)}
          onPlace={placeOrder}
        />
      )}
    </div>
  );
};

export default MenuPage;
