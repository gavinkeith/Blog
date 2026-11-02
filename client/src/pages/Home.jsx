import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Rocket, Code2, Database, Server, Sparkles } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { useAuth } from '../context/AuthContext.jsx'

// 打字机效果
const ROLES = ['Full-Stack Developer', 'React Enthusiast', 'Node.js Craftsman', 'Problem Solver']
function useTypewriter() {
  const [text, setText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = ROLES[roleIdx]
    const speed = deleting ? 40 : 90
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, text.length + 1)
        setText(next)
        if (next === full) setTimeout(() => setDeleting(true), 1400)
      } else {
        const next = full.slice(0, text.length - 1)
        setText(next)
        if (next === '') {
          setDeleting(false)
          setRoleIdx((i) => (i + 1) % ROLES.length)
        }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [text, deleting, roleIdx])

  return text
}

const STACK = [
  { icon: Code2, name: 'React', desc: 'SPA · Router · Context API' },
  { icon: Server, name: 'Node.js', desc: 'Express · REST API · JWT' },
  { icon: Database, name: 'MongoDB', desc: 'Atlas · Mongoose · CRUD' },
]

export default function Home() {
  const typed = useTypewriter()
  const { user } = useAuth()

  return (
    <div>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden rounded-3xl border border-line -mx-4 px-4 pt-20 pb-24">
        {/* 背景层：网格 + 光斑 */}
        <div className="absolute inset-0 bg-grid" />
        <div className="blob w-96 h-96 bg-indigo-600 top-[-120px] left-[-80px]" />
        <div className="blob w-80 h-80 bg-cyan-500 top-10 right-[-100px]" style={{ animationDelay: '-6s' }} />
        <div className="blob w-72 h-72 bg-fuchsia-600 bottom-[-140px] left-1/3" style={{ animationDelay: '-3s' }} />

        <div className="relative text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-2" />
            Welcome to my digital garden
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Hi, I'm <span className="text-gradient">Zyx</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 text-xl md:text-2xl text-muted h-8"
          >
            {typed}
            <span className="type-caret" />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold btn-gradient"
            >
              <Rocket className="w-4.5 h-4.5" /> View My Projects
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass font-semibold text-ink hover:border-accent/60 transition-all"
            >
              Get In Touch
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* 技术栈速览胶囊 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-2.5"
          >
            {['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'].map((t) => (
              <span key={t} className="glass rounded-full px-4 py-1.5 text-xs font-medium text-muted hover:text-accent-2 transition-colors">
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {user && (
        <Reveal className="text-center mt-8">
          <p className="text-sm text-muted">
            Welcome back, <span className="font-semibold text-accent-2">{user.username}</span>!
          </p>
        </Reveal>
      )}

      {/* ===== 技术栈 ===== */}
      <section className="mt-20">
        <Reveal>
          <h2 className="text-3xl font-bold text-center">
            What I <span className="text-gradient">Work With</span>
          </h2>
          <p className="text-center text-muted mt-2">The tools I use to bring ideas to life</p>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {STACK.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.12}>
              <div className="glass card-glow rounded-2xl p-7 h-full">
                <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{s.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <Reveal className="mt-20">
        <div className="relative overflow-hidden rounded-3xl border border-line px-8 py-14 text-center">
          <div className="blob w-72 h-72 bg-indigo-600 top-[-100px] left-1/4" />
          <div className="relative">
            <h2 className="text-3xl font-bold">Have a project in mind?</h2>
            <p className="text-muted mt-3">Let's build something amazing together.</p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold btn-gradient"
            >
              Say Hello <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
