const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    

    :root {
      --bg: #0d0f14;
      --surface: #161820;
      --surface2: #1e2028;
      --border: #2a2d38;
      --accent: #f5a623;
      --accent2: #ff6b35;
      --green: #22c55e;
      --red: #ef4444;
      --blue: #3b82f6;
      --text: #f0f2f8;
      --muted: #7a7f99;
      --radius: 16px;
    }

  
  html {
    height: auto;
    overflow-y: auto !important;
    overflow-x: clip;
    scroll-behavior: auto;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    height: auto;
    overflow: visible;
    position: static;
  }

  #root {
    min-height: 100vh;
    overflow: visible;
    position: static;
  }

    h1,h2,h3,h4,h5 { font-family: 'Syne', sans-serif; }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pop {
      0%   { transform: scale(1); }
      50%  { transform: scale(1.18); }
      100% { transform: scale(1); }
    }
    @keyframes pulse {
      0%,100% { opacity: 1; }
      50%      { opacity: .45; }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to   { transform: translateX(0);   opacity: 1; }
    }

    .fade-up { animation: fadeUp .45s ease both; }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
    }

    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      padding: 10px 20px; border-radius: 10px; border: none; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
      transition: all .2s ease; white-space: nowrap;
    }
    .btn:active { transform: scale(.96); }
    .btn-primary {
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      color: #0d0f14;
    }
    .btn-primary:hover { filter: brightness(1.1); box-shadow: 0 4px 20px rgba(245,166,35,.35); }
    .btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--text); }
    .btn-ghost:hover { background: var(--surface2); }
    .btn-danger { background: var(--red); color: #fff; }
    .btn-success { background: var(--green); color: #fff; }

    .input {
      width: 100%; padding: 12px 16px; background: var(--surface2);
      border: 1px solid var(--border); border-radius: 10px;
      color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px;
      outline: none; transition: border-color .2s;
    }
    .input:focus { border-color: var(--accent); }
    .input::placeholder { color: var(--muted); }

    .label { display: block; font-size: 12px; color: var(--muted); margin-bottom: 6px; font-weight: 500; letter-spacing: .04em; text-transform: uppercase; }

    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700;
      letter-spacing: .03em; text-transform: uppercase;
    }
    .badge-green  { background: rgba(34,197,94,.15);  color: var(--green); }
    .badge-orange { background: rgba(245,166,35,.15); color: var(--accent); }
    .badge-red    { background: rgba(239,68,68,.15);  color: var(--red); }
    .badge-blue   { background: rgba(59,130,246,.15); color: var(--blue); }

    .token-number {
      font-family: 'Syne', sans-serif;
      font-size: 72px; font-weight: 800; line-height: 1;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }

    .queue-bar { height: 8px; border-radius: 4px; background: var(--surface2); overflow: hidden; }
    .queue-fill {
      height: 100%; border-radius: 4px;
      background: linear-gradient(90deg, var(--green), var(--accent));
      transition: width .6s ease;
    }

    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(13,15,20,.85); backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 24px; height: 64px;
    }
    .nav-logo { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; }
    .nav-logo span { color: var(--accent); }
    .nav-links { display: flex; gap: 4px; }
    .nav-link {
      padding: 7px 14px; border-radius: 8px; cursor: pointer;
      font-size: 13px; font-weight: 500; color: var(--muted);
      transition: all .2s; border: none; background: none; font-family: 'DM Sans', sans-serif;
    }
    .nav-link:hover   { color: var(--text); background: var(--surface2); }
    .nav-link.active  { color: var(--accent); background: rgba(245,166,35,.1); }
    .nav-user { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--muted); }
    .avatar {
      width: 34px; height: 34px; border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      display: flex; align-items: center; justify-content: center;
      font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 800; color: #0d0f14;
    }

    /* Fix: padding-top accounts for fixed nav so first items are always visible */
    .page { min-height: 100vh; padding: 88px 24px 120px; max-width: 1100px; margin: 0 auto; }

    .menu-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); overflow: hidden;
      transition: transform .2s, box-shadow .2s;
    }
    .menu-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,.4); }
    .menu-img {
      width: 100%; height: 160px;
      background: linear-gradient(135deg, #1e2028, #2a2d38);
      display: flex; align-items: center; justify-content: center;
      font-size: 48px;
    }

    .qty-ctrl {
      display: flex; align-items: center;
      background: var(--surface2); border-radius: 8px; overflow: hidden;
      border: 1px solid var(--border);
    }
    .qty-btn {
      width: 34px; height: 34px; border: none; background: none;
      color: var(--text); font-size: 18px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background .15s;
    }
    .qty-btn:hover { background: var(--border); }
    .qty-val { min-width: 32px; text-align: center; font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; }

    .cart-strip {
      position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
      z-index: 200; background: linear-gradient(135deg, var(--accent), var(--accent2));
      color: #0d0f14; border-radius: 50px; padding: 14px 28px;
      display: flex; align-items: center; gap: 16px; cursor: pointer;
      box-shadow: 0 8px 32px rgba(245,166,35,.4);
      animation: slideIn .35s ease;
      font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px;
      min-width: 280px; justify-content: space-between;
      transition: transform .2s; white-space: nowrap;
    }
    .cart-strip:hover { transform: translateX(-50%) scale(1.03); }

    .overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.7);
      backdrop-filter: blur(4px); z-index: 300;
      display: flex; align-items: center; justify-content: center; padding: 20px;
    }
    .modal {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 20px; padding: 32px; width: 100%; max-width: 480px;
      max-height: 90vh; overflow-y: auto;
      animation: fadeUp .3s ease;
    }

    .ticket {
      background: var(--surface); border: 2px dashed var(--accent);
      border-radius: 20px; padding: 32px; text-align: center;
      position: relative; overflow: hidden;
    }
    .ticket::before {
      content: '';
      position: absolute; top: -40px; right: -40px;
      width: 140px; height: 140px; border-radius: 50%;
      background: radial-gradient(circle, rgba(245,166,35,.15), transparent 70%);
    }

    .table { width: 100%; border-collapse: collapse; }
    .table th {
      text-align: left; padding: 10px 14px; font-size: 11px;
      color: var(--muted); text-transform: uppercase; letter-spacing: .05em;
      border-bottom: 1px solid var(--border); font-weight: 600;
    }
    .table td { padding: 13px 14px; border-bottom: 1px solid var(--border); font-size: 14px; }
    .table tr:last-child td { border-bottom: none; }
    .table tr:hover td { background: var(--surface2); }

    .stat-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 20px;
      display: flex; flex-direction: column; gap: 6px;
    }
    .stat-num { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; }
    .stat-label { font-size: 12px; color: var(--muted); font-weight: 500; text-transform: uppercase; letter-spacing: .05em; }

    .divider { height: 1px; background: var(--border); margin: 20px 0; }

    .toast {
      position: fixed; top: 80px; right: 20px; z-index: 999;
      background: var(--surface2); border: 1px solid var(--border);
      border-radius: 12px; padding: 14px 20px;
      font-size: 14px; font-weight: 500;
      animation: slideIn .3s ease; box-shadow: 0 8px 32px rgba(0,0,0,.4);
      display: flex; align-items: center; gap: 10px;
    }

    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
    .grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
    @media(max-width:768px) {
      .grid-3, .grid-4 { grid-template-columns: 1fr 1fr; }
      .grid-2 { grid-template-columns: 1fr; }
    }
    @media(max-width:480px) {
      .grid-3, .grid-4 { grid-template-columns: 1fr; }
    }

    .auth-wrap {
      min-height: 100%; display: flex; align-items: center; justify-content: center;
      padding: 24px;
      background: radial-gradient(ellipse at 20% 50%, rgba(245,166,35,.06) 0%, transparent 60%),
                  radial-gradient(ellipse at 80% 20%, rgba(255,107,53,.05) 0%, transparent 50%),
                  var(--bg);
    }
    .auth-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 24px; padding: 40px 36px; width: 100%; max-width: 420px;
    }

    .page-header {
      margin-bottom: 32px; padding-bottom: 20px;
      border-bottom: 1px solid var(--border);
      display: flex; align-items: flex-end; justify-content: space-between;
      flex-wrap: wrap; gap: 12px;
    }
    .page-title { font-size: 28px; font-weight: 800; }
    .page-subtitle { color: var(--muted); font-size: 14px; margin-top: 4px; }

    .current-serving {
      background: linear-gradient(135deg, rgba(245,166,35,.1), rgba(255,107,53,.08));
      border: 2px solid var(--accent);
      border-radius: var(--radius); padding: 28px; text-align: center;
    }
    .cs-label { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
    .cs-num {
      font-family: 'Syne', sans-serif; font-size: 96px; font-weight: 800; line-height: 1;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }

    .queue-item {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px; border-radius: 10px; background: var(--surface2);
      margin-bottom: 8px; border: 1px solid var(--border); transition: all .2s;
    }
    .queue-item.active-token { border-color: var(--accent); background: rgba(245,166,35,.05); }

    .spinner {
      width: 20px; height: 20px; border: 2px solid var(--border);
      border-top-color: var(--accent); border-radius: 50%;
      animation: spin .7s linear infinite;
    }

    .empty-state { text-align: center; padding: 60px 20px; color: var(--muted); }
    .empty-state .icon { font-size: 56px; margin-bottom: 16px; opacity: .5; }
    .empty-state h3 { font-size: 18px; color: var(--text); margin-bottom: 8px; }

    .cat-pill {
      padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600;
      cursor: pointer; border: 1px solid var(--border); background: transparent;
      color: var(--muted); transition: all .2s; font-family: 'DM Sans',sans-serif;
    }
    .cat-pill.active { background: var(--accent); color: #0d0f14; border-color: var(--accent); }
    .cat-pill:hover:not(.active) { background: var(--surface2); color: var(--text); }

    .search-wrap { position: relative; }
    .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 16px; pointer-events: none; }
    .search-input { padding-left: 40px !important; }
  `}</style>
);

export default GlobalStyle;
