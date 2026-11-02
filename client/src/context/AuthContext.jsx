import { createContext, useContext, useState } from 'react'

// 全局认证状态：用户信息 + token + 登录/登出函数
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // 初始化时从 localStorage 恢复登录状态（刷新页面不掉线）
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
