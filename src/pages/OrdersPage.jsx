import { useState, useEffect } from 'react'

function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const fetchOrders = () => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data)
        setLoading(false)
      })
      .catch(() => {
        setMessage('無法載入訂單，請確認後端是否啟動')
        setLoading(false)
      })
  }

  useEffect(() => { fetchOrders() }, [])

  const updateStatus = (id, status) => {
    fetch(`/api/order/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then(() => fetchOrders())
      .catch(() => setMessage('更新失敗'))
  }

  const statusColor = (status) => {
    if (status === 'pending') return '#e67e22'
    if (status === 'done') return '#27ae60'
    if (status === 'paid') return '#2980b9'
    return '#999'
  }

  if (loading) return <p>載入中...</p>

  return (
    <div>
      <h2>📋 所有訂單</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      {orders.length === 0 ? (
        <p>目前沒有訂單</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={styles.card}>
            <div style={styles.row}>
              <strong>訂單 #{order.id}</strong>
              <span>桌號：{order.table_id}</span>
              <span style={{ color: statusColor(order.status), fontWeight: 'bold' }}>
                {order.status}
              </span>
            </div>
            <div style={styles.items}>
              {JSON.parse(order.items).map((item, i) => (
                <span key={i} style={styles.itemTag}>{item.name} x{item.qty}</span>
              ))}
            </div>
            <div style={styles.actions}>
              <button onClick={() => updateStatus(order.id, 'done')} style={styles.doneBtn}>標記完成</button>
              <button onClick={() => updateStatus(order.id, 'paid')} style={styles.paidBtn}>標記付款</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

const styles = {
  card: { border: '1px solid #ddd', borderRadius: '10px', padding: '16px', marginBottom: '12px' },
  row: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  items: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' },
  itemTag: { backgroundColor: '#f0f0f0', padding: '4px 10px', borderRadius: '20px', fontSize: '14px' },
  actions: { display: 'flex', gap: '8px' },
  doneBtn: { padding: '6px 14px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  paidBtn: { padding: '6px 14px', backgroundColor: '#2980b9', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }
}

export default OrdersPage
