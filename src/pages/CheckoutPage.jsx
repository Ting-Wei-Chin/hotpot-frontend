import { useState } from 'react'

function CheckoutPage() {
  const [tableId, setTableId] = useState('')
  const [message, setMessage] = useState('')

  const checkout = () => {
    if (!tableId) return setMessage('請輸入桌號')

    fetch(`/api/checkout/${tableId}`, { method: 'PUT' })
      .then(res => res.json())
      .then(data => {
        setMessage(`✅ ${data.message}`)
        setTableId('')
      })
      .catch(() => setMessage('❌ 結帳失敗'))
  }

  return (
    <div>
      <h2>💳 結帳</h2>
      <p>輸入桌號，將該桌所有訂單設為已付款。</p>

      <div style={styles.row}>
        <input
          type="number"
          value={tableId}
          onChange={e => setTableId(e.target.value)}
          placeholder="輸入桌號"
          style={styles.input}
        />
        <button onClick={checkout} style={styles.btn}>確認結帳</button>
      </div>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  )
}

const styles = {
  row: { display: 'flex', gap: '12px', alignItems: 'center', marginTop: '20px' },
  input: { padding: '10px', fontSize: '16px', borderRadius: '6px', border: '1px solid #ccc', width: '150px' },
  btn: { padding: '10px 20px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' },
  message: { marginTop: '16px', fontWeight: 'bold', fontSize: '16px' }
}

export default CheckoutPage
