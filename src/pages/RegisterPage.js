import { useState } from "react";

const FIELDS = [
  { label:"Full Name",           name:"name",     placeholder:"John Doe",           type:"text" },
  { label:"Username",            name:"username", placeholder:"johndoe",            type:"text" },
  { label:"Email (optional)",    name:"email",    placeholder:"john@example.com",   type:"email" },
  { label:"Password",            name:"password", placeholder:"Min 4 characters",  type:"password" },
  { label:"Confirm Password",    name:"confirm",  placeholder:"Re-enter password",  type:"password" },
];

const RegisterPage = ({ onGo, showToast }) => {
  const [form, setForm] = useState({ name:"", username:"", email:"", password:"", confirm:"" });
  const [err, setErr]   = useState("");
  const [loading, setLoading] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = () => {
    setErr("");
    if (!form.name || !form.username || !form.password) { setErr("Please fill all required fields"); return; }
    if (form.password !== form.confirm) { setErr("Passwords don't match"); return; }
    if (form.password.length < 4) { setErr("Password must be at least 4 characters"); return; }
    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("ct_users") || "[]");
      if (users.find(u => u.username === form.username)) { setErr("Username already taken"); setLoading(false); return; }
      users.push({ name:form.name, username:form.username, email:form.email, password:form.password, role:"user" });
      localStorage.setItem("ct_users", JSON.stringify(users));
      showToast("Account created! Please sign in.", "success");
      onGo("login");
      setLoading(false);
    }, 600);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card fade-up">
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:40, marginBottom:12 }}>✨</div>
          <h2 style={{ fontSize:28, fontWeight:800, marginBottom:4 }}>Create Account</h2>
          <p style={{ color:"var(--muted)", fontSize:14 }}>Join the canteen ecosystem</p>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {FIELDS.map(f => (
            <div key={f.name}>
              <label className="label">{f.label}</label>
              <input className="input" name={f.name} type={f.type} placeholder={f.placeholder}
                value={form[f.name]} onChange={handle} />
            </div>
          ))}
          {err && <div style={{ color:"var(--red)", fontSize:13, background:"rgba(239,68,68,.1)", padding:"10px 14px", borderRadius:8 }}>{err}</div>}
          <button className="btn btn-primary" style={{ width:"100%", padding:14, marginTop:4 }} onClick={submit} disabled={loading}>
            {loading ? <span className="spinner" /> : "Create Account →"}
          </button>
        </div>

        <div className="divider" />
        <p style={{ textAlign:"center", fontSize:13, color:"var(--muted)" }}>
          Already have an account?{" "}
          <span style={{ color:"var(--accent)", cursor:"pointer", fontWeight:600 }} onClick={() => onGo("login")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
