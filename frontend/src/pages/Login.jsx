import { useState } from 'react'

const API = 'https://internship-api-dqrh.onrender.com/api/v1'

export default function Login({ onLogin, onSwitch }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setMsg(null)
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        onLogin(data.token, data.user)
      } else {
        setMsg({ type: 'error', text: data.message })
      }
    } catch {
      setMsg({ type: 'error', text: 'Server error. Is the backend running?' })
    }
    setLoading(false)
  }

  return (
    <div className="container">
      <h2>🔐 Login</h2>
      {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
      <input
        type="email" placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password" placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
      />
      <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', marginBottom: 14 }}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p style={{ fontSize: 14 }}>
        Don't have an account?{' '}
        <button className="link" onClick={onSwitch}>Register here</button>
      </p>
    </div>
  )
}
