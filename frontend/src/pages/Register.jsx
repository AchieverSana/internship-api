import { useState } from 'react'

const API = 'https://internship-api-dqrh.onrender.com/api/v1'

export default function Register({ onSwitch }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' })
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setMsg(null)
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        setMsg({ type: 'success', text: '✅ Registered! Please login.' })
        setTimeout(onSwitch, 1500)
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
      <h2>📝 Register</h2>
      {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
      <input
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email" placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password" placeholder="Password (min 6 chars)"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', marginBottom: 14 }}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      <p style={{ fontSize: 14 }}>
        Already have an account?{' '}
        <button className="link" onClick={onSwitch}>Login here</button>
      </p>
    </div>
  )
}
