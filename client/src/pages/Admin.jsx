import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill-new'
import { FolderKanban, FileText, Pencil, Trash2 } from 'lucide-react'
import { api } from '../api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { inputClass } from './Contact.jsx'

// 富文本编辑器工具栏配置：字体/字号/颜色/对齐/图片/链接等
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean'],
  ],
}

// Admin Dashboard：管理 Projects 和 Blog Posts 的完整 CRUD
export default function Admin() {
  const { user } = useAuth()
  return (
    <div>
      <h1 className="text-3xl font-extrabold">
        Admin <span className="text-gradient">Dashboard</span>
      </h1>
      <p className="text-muted mt-1.5 mb-8">
        Logged in as <span className="text-accent-2 font-semibold">{user.username}</span>. Manage your portfolio content below.
      </p>
      <div className="grid lg:grid-cols-2 gap-8">
        <ProjectManager />
        <BlogManager />
      </div>
    </div>
  )
}

/* ---------------- Projects 管理 ---------------- */
function ProjectManager() {
  const emptyForm = { title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' }
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null) // null = 新建模式
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const fetchProjects = () => {
    api('/projects')
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }
  useEffect(fetchProjects, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      if (editingId) {
        const updated = await api(`/projects/${editingId}`, { method: 'PUT', body: form, auth: true })
        setProjects(projects.map((p) => (p._id === editingId ? updated : p)))
      } else {
        const created = await api('/projects', { method: 'POST', body: form, auth: true })
        setProjects([created, ...projects])
      }
      setForm(emptyForm)
      setEditingId(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (p) => {
    setEditingId(p._id)
    setForm({ title: p.title, description: p.description, imageUrl: p.imageUrl || '', repoUrl: p.repoUrl || '', liveUrl: p.liveUrl || '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return
    try {
      await api(`/projects/${id}`, { method: 'DELETE', auth: true })
      setProjects(projects.filter((p) => p._id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="flex items-center gap-2 text-xl font-bold mb-5">
        <FolderKanban className="w-5 h-5 text-accent-2" /> Manage Projects
      </h2>
      {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title *" required className={inputClass} />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description *" required rows={3} className={inputClass} />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className={inputClass} />
        <input name="repoUrl" value={form.repoUrl} onChange={handleChange} placeholder="Repo URL" className={inputClass} />
        <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="Live URL" className={inputClass} />
        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl text-white text-sm font-semibold btn-gradient">
            {saving ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm) }} className="px-5 py-2 rounded-xl border border-line text-sm text-muted hover:text-ink hover:border-accent/50 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="space-y-2">
          <div className="skeleton h-11 w-full" />
          <div className="skeleton h-11 w-full" />
        </div>
      ) : (
        <ul className="space-y-2">
          {projects.map((p) => (
            <li key={p._id} className="flex items-center justify-between p-3 rounded-xl bg-bg-soft border border-line hover:border-accent/40 transition-colors">
              <span className="text-sm font-medium truncate">{p.title}</span>
              <span className="flex gap-3 shrink-0 ml-2">
                <button onClick={() => startEdit(p)} className="inline-flex items-center gap-1 text-xs text-accent-2 hover:underline"><Pencil className="w-3 h-3" />Edit</button>
                <button onClick={() => handleDelete(p._id)} className="inline-flex items-center gap-1 text-xs text-red-400 hover:underline"><Trash2 className="w-3 h-3" />Delete</button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/* ---------------- Blog 管理 ---------------- */
function BlogManager() {
  const { user } = useAuth()
  const emptyForm = { title: '', content: '' }
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const fetchPosts = () => {
    api('/blog')
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }
  useEffect(fetchPosts, [])

  const handleChange = (content) => setForm({ ...form, content })

  // 注意：Quill 工具栏按钮会误触发表单提交，所以这里用 div 而不是 <form>
  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required')
      return
    }
    setSaving(true)
    setError(null)
    try {
      if (editingId) {
        const updated = await api(`/blog/${editingId}`, { method: 'PUT', body: form, auth: true })
        setPosts(posts.map((p) => (p._id === editingId ? { ...p, ...updated } : p)))
      } else {
        const created = await api('/blog', { method: 'POST', body: form, auth: true })
        setPosts([created, ...posts])
      }
      setForm(emptyForm)
      setEditingId(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  // 列表接口只返回内容摘要，编辑前先拉取完整文章
  const startEdit = async (p) => {
    try {
      const full = await api(`/blog/${p._id}`)
      setEditingId(p._id)
      setForm({ title: full.post.title, content: full.post.content })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post (and its comments)?')) return
    try {
      await api(`/blog/${id}`, { method: 'DELETE', auth: true })
      setPosts(posts.filter((p) => p._id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="flex items-center gap-2 text-xl font-bold mb-5">
        <FileText className="w-5 h-5 text-accent-2" /> Manage Blog Posts
      </h2>
      {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

      <div className="space-y-3 mb-6">
        <input name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title *" required className={inputClass} />
        {/* 富文本编辑器：支持本地插图（base64）、字体、字号、颜色、对齐等 */}
        <ReactQuill
          theme="snow"
          value={form.content}
          onChange={handleChange}
          modules={quillModules}
          placeholder="Write your post... You can insert local images with the image button."
        />
        <div className="flex gap-2">
          <button type="button" onClick={handleSubmit} disabled={saving} className="px-5 py-2 rounded-xl text-white text-sm font-semibold btn-gradient">
            {saving ? 'Saving...' : editingId ? 'Update Post' : 'Add Post'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm) }} className="px-5 py-2 rounded-xl border border-line text-sm text-muted hover:text-ink hover:border-accent/50 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          <div className="skeleton h-11 w-full" />
          <div className="skeleton h-11 w-full" />
        </div>
      ) : (
        <ul className="space-y-2">
          {posts.map((p) => {
            // 作者本人或管理员（root）可编辑/删除，其他人只读
            const isAuthor = p.author && user && p.author._id === user._id
            const canManage = isAuthor || user?.role === 'admin'
            return (
              <li key={p._id} className="flex items-center justify-between p-3 rounded-xl bg-bg-soft border border-line hover:border-accent/40 transition-colors">
                <span className="text-sm font-medium truncate">
                  {p.title}
                  {!isAuthor && canManage && <span className="ml-2 text-xs text-muted/70">by {p.author?.username || 'Unknown'}</span>}
                </span>
                <span className="flex gap-3 shrink-0 ml-2">
                  {canManage ? (
                    <>
                      <button onClick={() => startEdit(p)} className="inline-flex items-center gap-1 text-xs text-accent-2 hover:underline"><Pencil className="w-3 h-3" />Edit</button>
                      <button onClick={() => handleDelete(p._id)} className="inline-flex items-center gap-1 text-xs text-red-400 hover:underline"><Trash2 className="w-3 h-3" />Delete</button>
                    </>
                  ) : (
                    <span className="text-xs text-muted/50">read-only</span>
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
