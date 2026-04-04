import { useState, useEffect } from 'react'

function MenuPage() {
  const [menu, setMenu] = useState([])
  const [tableId, setTableId] = useState('')
  const [cart, setCart] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(() => setMessage('無法載入菜單，請確認後端是否啟動'))
  }, [])

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const submitOrder = () => {
    if (!tableId) return setMessage('請輸入桌號')
    if (cart.length === 0) return setMessage('請選擇至少一項餐點')

    fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: parseInt(tableId), items: cart })
    })
      .then(res => res.json())
      .then(data => {
        setMessage(`✅ 訂單建立成功！訂單編號：${data.orderId}`)
        setCart([])
        setTableId('')
      })
      .catch(() => setMessage('❌ 訂單建立失敗'))
  }

  return (
    <div>
      <h2>🍲 菜單點餐</h2>

      <div style={styles.inputRow}>
        <label>桌號：</label>
        <input
          type="number"
          value={tableId}
          onChange={e => setTableId(e.target.value)}
          placeholder="輸入桌號"
          style={styles.input}
        />
      </div>

      <div style={styles.menuGrid}>
        {menu.map(item => (
          <div key={item.id} style={styles.card}>
            <h3>{item.name}</h3>
            <p style={styles.price}>NT$ {item.price}</p>
            <button onClick={() => addToCart(item)} style={styles.btn}>
              加入購物車
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={styles.cart}>
          <h3>購物車</h3>
          {cart.map(item => (
            <div key={item.id} style={styles.cartItem}>
              <span>{item.name}</span>
              <span>x{item.qty}</span>
              <span>NT$ {item.price * item.qty}</span>
            </div>
          ))}
          <button onClick={submitOrder} style={styles.orderBtn}>送出訂單</button>
        </div>
      )}

      {message && <p style={styles.message}>{message}</p>}
    </div>
  )
}

const styles = {
  inputRow: { marginBottom: '20px', fontSize: '16px' },
  input: { marginLeft: '8px', padding: '6px 10px', fontSize: '16px', borderRadius: '6px', border: '1px solid #ccc' },
  menuGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  card: { border: '1px solid #ddd', borderRadius: '10px', padding: '16px', textAlign: 'center' },
  price: { color: '#e74c3c', fontWeight: 'bold', fontSize: '18px' },
  btn: { padding: '8px 16px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  cart: { marginTop: '30px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '10px' },
  cartItem: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  orderBtn: { marginTop: '12px', padding: '10px 24px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' },
  message: { marginTop: '16px', fontWeight: 'bold', color: '#2c3e50' }
}

export default MenuPage
