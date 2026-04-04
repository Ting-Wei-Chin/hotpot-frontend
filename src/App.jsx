import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MenuPage from './pages/MenuPage'
import OrdersPage from './pages/OrdersPage'
import CheckoutPage from './pages/CheckoutPage'

function App() {
  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        <span style={styles.logo}>🍲 Hotpot App</span>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>菜單點餐</Link>
          <Link to="/orders" style={styles.link}>所有訂單</Link>
          <Link to="/checkout" style={styles.link}>結帳</Link>
        </div>
      </nav>
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    backgroundColor: '#e74c3c',
    color: 'white',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '15px',
  },
  container: {
    maxWidth: '800px',
    margin: '30px auto',
    padding: '0 20px',
  }
}

export default App
