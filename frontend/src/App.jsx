import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import './index.css'

export default function App() {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))

  const handleLogin = (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setToken(token)
    setUser(user)
    setPage('dashboard')
  }

  const handleLogout = () => {
    localStorage.clear()
    setToken('')
    setUser(null)
    setPage('login')
  }

  if (token && page !== 'dashboard') {
    return <Dashboard user={user} token={token} onLogout={handleLogout} />
  }

  if (page === 'dashboard' && token) {
    return <Dashboard user={user} token={token} onLogout={handleLogout} />
  }

  if (page === 'register') {
    return <Register onSwitch={() => setPage('login')} />
  }

  return <Login onLogin={handleLogin} onSwitch={() => setPage('register')} />
}
