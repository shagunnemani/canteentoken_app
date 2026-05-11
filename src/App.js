import { useState, useEffect } from "react";
import GlobalStyle from "./components/GlobalStyle.js";
import { Toast, Nav } from "./components/shared.js";
import LoginPage    from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import MenuPage     from "./pages/MenuPage.js";
import MyTokensPage from "./pages/MyTokensPage.js";
import QueuePage    from "./pages/QueuePage.js";
import AdminPage    from "./pages/AdminPage.js";
import AllTokensPage from "./pages/AllTokensPage.js";

export default function App() {
  const [user, setUser]   = useState(() => {
    try { return JSON.parse(localStorage.getItem("ct_session") || "null"); } catch { return null; }
  });
  const [page, setPage]   = useState("login");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (user) setPage(user.role === "admin" ? "admin" : "menu");
  }, [user]);

  const showToast = (msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const login = u => {
    setUser(u);
    localStorage.setItem("ct_session", JSON.stringify(u));
    setPage(u.role === "admin" ? "admin" : "menu");
    showToast(`Welcome, ${u.name || u.username}! 🎉`, "success");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ct_session");
    setPage("login");
    showToast("Logged out successfully", "info");
  };

  const renderPage = () => {
    switch (page) {
      case "menu":       return <MenuPage      user={user} onGo={setPage} showToast={showToast} />;
      case "myTokens":   return <MyTokensPage  user={user} />;
      case "queue":      return <QueuePage     user={user} />;
      case "admin":      return <AdminPage     showToast={showToast} />;
      case "allTokens":  return <AllTokensPage />;
      default:           return <MenuPage      user={user} onGo={setPage} showToast={showToast} />;
    }
  };

  if (!user) {
    return (
      <>
        <GlobalStyle />
        {toast && <Toast {...toast} />}
        {page === "login"
          ? <LoginPage    onLogin={login} onGo={setPage} showToast={showToast} />
          : <RegisterPage onGo={setPage}  showToast={showToast} />
        }
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      {toast && <Toast {...toast} />}
      <Nav user={user} page={page} onGo={setPage} onLogout={logout} />
      {renderPage()}
    </>
  );
}