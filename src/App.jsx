import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MenuPage from './pages/MenuPage'
import ActiveTablesPage from './pages/ActiveTablesPage'
import HistoryPage from './pages/HistoryPage'

function NavBar({ onLogout, isTestMode }) {
  const location = useLocation()
  const links = [
    { to: '/', label: '🍽️ 點餐' },
    { to: '/active', label: '🪑 未結帳' },
    { to: '/history', label: '📊 歷史記錄' },
  ]
  return (
    <nav style={s.nav}>
      <span style={s.logo}>🍲 光明石頭火鍋{isTestMode && <span style={s.testBadge}>🧪 測試模式</span>}</span>
      <div style={s.links}>
        {links.map(l => (
          <Link key={l.to} to={l.to} style={{
            ...s.link,
            ...(location.pathname === l.to ? s.linkActive : {})
          }}>{l.label}</Link>
        ))}
        <button style={s.logoutBtn} onClick={onLogout}>登出</button>
      </div>
    </nav>
  )
}

function AppInner({ onLogout, isTestMode }) {
  return (
    <>
      <NavBar onLogout={onLogout} isTestMode={isTestMode} />
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/active" element={<ActiveTablesPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </>
  )
}

function App() {
  const [mode, setMode] = useState(null)

  const handleLogin = (m) => {
    sessionStorage.setItem('appMode', m)
    setMode(m)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('appMode')
    setMode(null)
  }

  if (!mode) return <LoginPage onLogin={handleLogin} />

  return (
    <BrowserRouter>
      <AppInner onLogout={handleLogout} isTestMode={mode === 'test'} />
    </BrowserRouter>
  )
}

const s = {
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', backgroundColor: '#c62828', color: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' },
  logo: { fontSize: '17px', fontWeight: 'bold' },
  links: { display: 'flex', gap: '6px', alignItems: 'center' },
  link: { color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontWeight: '500', fontSize: '14px', padding: '6px 12px', borderRadius: '6px' },
  linkActive: { backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' },
  logoutBtn: { marginLeft: '8px', padding: '6px 12px', backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
  testBadge: { marginLeft: '10px', fontSize: '12px', backgroundColor: '#ff9800', color: 'white', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' },
}

export default App
