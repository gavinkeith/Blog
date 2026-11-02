import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '../api.js'
import { useAuth } from '../context/AuthContext.jsx'
import PasswordInput from '../components/PasswordInput.jsx'
import { inputClass } from './Contact.jsx'

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await api('/users/register', { method: 'POST', body: form })
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
        <div className="blob w-56 h-56 bg-cyan-500 top-[-80px] left-[-60px]" style={{ animationDelay: '-5s' }} />
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl btn-gradient flex items-center justify-center mb-5">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold">Create account</h1>
          <p className="mt-1.5 text-sm text-muted">Join and start publishing.</p>

          {error && (
            <div className="mt-5 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Username</label>
              <input name="username" value={form.username} onChange={handleChange} required className={inputClass} placeholder="zyx" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password (min 6 chars)</label>
              <PasswordInput name="password" value={form.password} onChange={handleChange} required minLength={6} placeholder="••••••••" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white font-semibold btn-gradient"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted">
            Already have an account? <Link to="/login" className="text-accent-2 hover:underline font-medium">Log in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
