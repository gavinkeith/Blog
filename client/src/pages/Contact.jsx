import { useState } from 'react'
import { Send } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { api } from '../api.js'

// 统一的表单输入样式（暗黑玻璃风）
export const inputClass =
  'w-full rounded-xl bg-bg-soft border border-line p-3.5 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/25 transition-all'

export default function Contact() {
  // 受控表单：三个 input 都绑定到 state
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    try {
      await api('/contact', { method: 'POST', body: form })
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <Reveal>
        <h1 className="text-4xl font-extrabold text-center">
          Get In <span className="text-gradient">Touch</span>
        </h1>
        <p className="mt-2 text-center text-muted">Leave a message and I'll get back to you soon.</p>
      </Reveal>

      {status === 'success' && (
        <div className="mt-6 p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm text-center">
          Message sent successfully!
        </div>
      )}
      {status === 'error' && (
        <div className="mt-6 p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm text-center">
          Error: {error}
        </div>
      )}

      <Reveal delay={0.1}>
        <form onSubmit={handleSubmit} className="mt-8 glass rounded-2xl p-7 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className={`${inputClass} resize-none`} placeholder="What's on your mind?" />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full inline-flex justify-center items-center gap-2 py-3.5 rounded-xl text-white font-semibold btn-gradient"
          >
            <Send className="w-4 h-4" />
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </Reveal>
    </div>
  )
}
