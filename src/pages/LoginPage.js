import { useState } from "react";

const LoginPage = ({ onLogin, onGo }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr]   = useState("");
  const [loading, setLoading] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = () => {
    setErr("");
    if (!form.username || !form.password) { setErr("Please fill all fields"); return; }
    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("ct_users") || "[]");
      const u = users.find(u => u.username === form.username && u.password === form.password);
      if (u) {
        onLogin(u);
      } else if (form.username === "admin" && form.password === "admin123") {
        onLogin({ username:"admin", name:"Administrator", role:"admin" });
      } else {
        setErr("Invalid username or password");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card fade-up">
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:40, marginBottom:12 }}>🏪</div>
          <h2 style={{ fontSize:28, fontWeight:800, marginBottom:4 }}>Welcome Back</h2>
          <p style={{ color:"var(--muted)", fontSize:14 }}>Sign in to your canteen account</p>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <label className="label">Username</label>
            <input className="input" name="username" placeholder="Enter your username"
              value={form.username} onChange={handle}
              onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" name="password" type="password" placeholder="Enter your password"
              value={form.password} onChange={handle}
              onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
          {err && <div style={{ color:"var(--red)", fontSize:13, background:"rgba(239,68,68,.1)", padding:"10px 14px", borderRadius:8 }}>{err}</div>}
          <button className="btn btn-primary" style={{ width:"100%", padding:14, marginTop:4 }} onClick={submit} disabled={loading}>
            {loading ? <span className="spinner" /> : "Sign In →"}
          </button>
        </div>

        <div className="divider" />
        <p style={{ textAlign:"center", fontSize:13, color:"var(--muted)" }}>
          Don't have an account?{" "}
          <span style={{ color:"var(--accent)", cursor:"pointer", fontWeight:600 }} onClick={() => onGo("register")}>
            Register here
          </span>
        </p>
        <p style={{ textAlign:"center", fontSize:11, color:"var(--muted)", marginTop:12 }}>
          Admin: <code style={{ color:"var(--accent)" }}>admin / admin123</code>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
