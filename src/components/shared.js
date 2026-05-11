// ─── TOAST ────────────────────────────────────────────────────────────────────
export const Toast = ({ msg, type }) => {
  const icons = { success: "✅", error: "❌", info: "ℹ️" };
  return (
    <div className="toast">
      <span>{icons[type] || "ℹ️"}</span>
      <span>{msg}</span>
    </div>
  );
};

// ─── NAV ─────────────────────────────────────────────────────────────────────
export const Nav = ({ user, page, onGo, onLogout }) => {
  const links = user.role === "admin"
    ? [{ key:"admin", label:"Dashboard" }, { key:"allTokens", label:"All Tokens" }, { key:"queue", label:"Queue Status" }]
    : [{ key:"menu", label:"Menu" }, { key:"myTokens", label:"My Tokens" }, { key:"queue", label:"Queue Status" }];

  return (
    <nav className="nav">
      <div className="nav-logo">Canteen<span>Pass</span></div>
      <div className="nav-links">
        {links.map(l => (
          <button key={l.key} className={`nav-link${page === l.key ? " active" : ""}`} onClick={() => onGo(l.key)}>
            {l.label}
          </button>
        ))}
      </div>
      <div className="nav-user">
        <span>{user.name || user.username}</span>
        <div className="avatar">{(user.name || user.username).charAt(0).toUpperCase()}</div>
        <button className="btn btn-ghost" style={{ padding:"6px 12px", fontSize:12 }} onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};
