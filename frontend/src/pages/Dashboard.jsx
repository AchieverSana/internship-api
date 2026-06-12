import { useState, useEffect } from 'react'

const API = 'https://glorious-couscous-g46wrpvxjrx5cj95-5000.app.github.dev/api/v1'

const emptyForm = { name: '', description: '', price: '', category: '', stock: '' }

export default function Dashboard({ user, token, onLogout }) {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }

  const showMsg = (type, text) => {
    setMsg({ type, text })
    setTimeout(() => setMsg(null), 3000)
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/products`, { headers })
      const data = await res.json()
      if (data.success) setProducts(data.data)
    } catch {
      showMsg('error', 'Failed to load products')
    }
  }

  useEffect(() => { fetchProducts() }, [])

  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.price || !form.category) {
      return showMsg('error', 'Please fill all required fields')
    }
    setLoading(true)
    try {
      const url = editId ? `${API}/products/${editId}` : `${API}/products`
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.success) {
        showMsg('success', editId ? '✅ Product updated!' : '✅ Product added!')
        setForm(emptyForm)
        setEditId(null)
        fetchProducts()
      } else {
        showMsg('error', data.message)
      }
    } catch {
      showMsg('error', 'Server error')
    }
    setLoading(false)
  }

  const handleEdit = (product) => {
    setEditId(product._id)
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    try {
      const res = await fetch(`${API}/products/${id}`, { method: 'DELETE', headers })
      const data = await res.json()
      if (data.success) {
        showMsg('success', '🗑️ Product deleted')
        fetchProducts()
      } else {
        showMsg('error', data.message)
      }
    } catch {
      showMsg('error', 'Server error')
    }
  }

  return (
    <div className="dashboard">
      {/* Navbar */}
      <div className="navbar">
        <h1>📦 Product Manager</h1>
        <div>
          <span>👤 {user.name} — <strong>{user.role}</strong></span>
          <button onClick={onLogout} className="danger" style={{ padding: '6px 14px' }}>Logout</button>
        </div>
      </div>

      <div className="main">
        {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}

        {/* Add / Edit Form */}
        <div className="card">
          <h3>{editId ? '✏️ Edit Product' : '➕ Add New Product'}</h3>
          <div className="form-row">
            <input
              placeholder="Product Name *"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Category *"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            />
          </div>
          <input
            placeholder="Description *"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <div className="form-row">
            <input
              type="number" placeholder="Price (₹) *"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />
            <input
              type="number" placeholder="Stock"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Saving...' : editId ? 'Update Product' : 'Add Product'}
            </button>
            {editId && (
              <button className="secondary" onClick={() => { setEditId(null); setForm(emptyForm) }}>
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Product List */}
        <div className="card">
          <h3>📋 All Products ({products.length})</h3>
          {products.length === 0 ? (
            <p style={{ color: '#999', fontSize: 14 }}>No products yet. Add one above!</p>
          ) : (
            <div className="product-grid">
              {products.map(p => (
                <div key={p._id} className="product-card">
                  <div className="badge">{p.category}</div>
                  <h4>{p.name}</h4>
                  <p>{p.description}</p>
                  <p style={{ fontSize: 12, color: '#aaa' }}>Stock: {p.stock}</p>
                  <div className="price">₹{p.price}</div>
                  <p style={{ fontSize: 11, color: '#bbb' }}>
                    By: {p.createdBy?.name || 'Unknown'}
                  </p>
                  <div className="actions">
                    <button onClick={() => handleEdit(p)}>Edit</button>
                    {user.role === 'admin' && (
                      <button className="danger" onClick={() => handleDelete(p._id)}>Delete</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
