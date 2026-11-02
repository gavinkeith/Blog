import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// 路由守卫：未登录则重定向到 /login
export default function ProtectedRoute({ children }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}
