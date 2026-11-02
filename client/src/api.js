// 统一的 API 请求封装
// 开发环境走 Vite 代理（/api -> localhost:5000）；部署时用 VITE_API_URL 指向线上后端
const API_URL = import.meta.env.VITE_API_URL || '/api'

// 从 localStorage 读取 token
export const getToken = () => localStorage.getItem('token')

// 通用请求函数：自动加 JSON 头和 Authorization
export async function api(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {}
  if (body) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`)
  }
  return data
}
