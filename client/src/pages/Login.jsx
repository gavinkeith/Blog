import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '../api.js'
import { useAuth } from '../context/AuthContext.jsx'
import PasswordInput from '../components/PasswordInput.jsx'
import { inputClass } from './Contact.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await api('/users/login', { method: 'POST', body: form })
      login({ _id: data._id, username: data.username, email: data.email, role: data.role }, data.token)
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto pt-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden glass rounded-3xl p-8"
      >
        <div className="blob w-56 h-56 bg-indigo-600 top-[-80px] right-[-60px]" />
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl btn-gradient flex items-center justify-center mb-5">
            <LogIn className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold">Welcome back</h1>
          <p className="mt-1.5 text-sm text-muted">Log in to manage your content.</p>

          {error && (
            <div className="mt-5 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email or Username</label>
              <input name="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <PasswordInput name="password" value={form.password} onChange={handleChange} required placeholder="••••••••" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white font-semibold btn-gradient"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted">
            No account? <Link to="/register" className="text-accent-2 hover:underline font-medium">Create one now</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
