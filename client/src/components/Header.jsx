import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Sun, Moon, Menu, X, LayoutDashboard, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

// 玻璃拟态导航：滚动感知、auth-aware、明暗切换、移动端汉堡菜单
export default function Header() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
      isActive
        ? 'text-white btn-gradient'
        : 'text-muted hover:text-ink hover:bg-line/60'
    }`

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  const navLinks = (
    <>
      <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
      <NavLink to="/projects" className={linkClass} onClick={() => setOpen(false)}>Projects</NavLink>
      <NavLink to="/blog" className={linkClass} onClick={() => setOpen(false)}>Blog</NavLink>
      <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>Contact</NavLink>
      {user && (
        <NavLink to="/admin" className={linkClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
      )}
    </>
  )

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="glass rounded-2xl mt-3 px-4 h-14 flex items-center justify-between shadow-lg shadow-black/20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setOpen(false)}>
            <span className="w-7 h-7 rounded-lg btn-gradient flex items-center justify-center text-sm text-white">Z</span>
            <span>Zyx<span className="text-gradient">.dev</span></span>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center gap-1">{navLinks}</nav>

          {/* 右侧操作区 */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              title="Toggle theme"
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-ink hover:bg-line/60 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-xs text-muted">Hi, <span className="text-accent-2 font-semibold">{user.username}</span></span>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="hidden md:inline-flex px-4 py-1.5 rounded-full text-sm font-semibold btn-gradient"
              >
                Login
              </Link>
            )}

            {/* 移动端汉堡 */}
            <button
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-ink"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 移动端下拉菜单 */}
        {open && (
          <div className="md:hidden glass rounded-2xl mt-2 p-3 flex flex-col gap-1">
            {navLinks}
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium text-red-400 hover:bg-red-500/10"
              >
                <LayoutDashboard className="w-4 h-4" /> Logout ({user.username})
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="px-3.5 py-2 rounded-full text-sm font-semibold btn-gradient text-center">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
