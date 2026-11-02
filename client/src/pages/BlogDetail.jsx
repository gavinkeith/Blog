import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DOMPurify from 'dompurify'
import { Trash2, Send, MessageCircle } from 'lucide-react'
import { api } from '../api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function BlogDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [data, setData] = useState(null) // { post, comments }
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 评论表单（受控组件）
  const [commentBody, setCommentBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [commentError, setCommentError] = useState(null)

  const fetchPost = () => {
    api(`/blog/${id}`)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(fetchPost, [id])

  const handleComment = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setCommentError(null)
    try {
      await api(`/blog/${id}/comments`, { method: 'POST', body: { body: commentBody }, auth: true })
      setCommentBody('')
      fetchPost() // 重新拉取评论列表
    } catch (err) {
      setCommentError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return
    try {
      await api(`/blog/${id}`, { method: 'DELETE', auth: true })
      navigate('/blog')
    } catch (err) {
      setCommentError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="skeleton h-10 w-2/3" />
        <div className="skeleton h-4 w-1/3" />
        <div className="skeleton h-64 w-full mt-8" />
      </div>
    )
  }
  if (error) return <p className="text-center text-red-400 py-16 glass rounded-2xl">Error: {error}</p>

  const { post, comments } = data
  const isAuthor = user && post.author && user._id === post.author._id

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{post.title}</h1>
      <div className="mt-4 flex items-center gap-3 text-sm text-muted">
        <span className="w-9 h-9 rounded-full btn-gradient flex items-center justify-center text-xs font-bold text-white">
          {(post.author?.username || '?').charAt(0).toUpperCase()}
        </span>
        <span className="font-medium text-ink">{post.author?.username || 'Unknown'}</span>
        <span>·</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        {isAuthor && (
          <button
            onClick={handleDelete}
            className="ml-auto inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete Post
          </button>
        )}
      </div>

      {/* 富文本渲染：先经过 DOMPurify 消毒，防止 XSS 攻击 */}
      <div className="mt-8 glass rounded-2xl p-8 ql-snow">
        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
      </div>

      {/* 评论区 */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <MessageCircle className="w-5.5 h-5.5 text-accent-2" />
          Comments <span className="text-muted text-lg">({comments.length})</span>
        </h2>

        {user ? (
          <form onSubmit={handleComment} className="mt-5 glass rounded-2xl p-4">
            <textarea
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Share your thoughts..."
              required
              rows={3}
              className="w-full bg-transparent text-sm text-ink placeholder:text-muted/60 focus:outline-none resize-none"
            />
            {commentError && <p className="mt-1 text-sm text-red-400">{commentError}</p>}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white btn-gradient"
              >
                <Send className="w-3.5 h-3.5" />
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </form>
        ) : (
          <p className="mt-5 glass rounded-2xl p-4 text-sm text-muted">
            Please <a href="/login" className="text-accent-2 hover:underline font-medium">log in</a> to join the discussion.
          </p>
        )}

        <div className="mt-6 space-y-3">
          {comments.length === 0 ? (
            <p className="text-sm text-muted">No comments yet. Be the first!</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-7 h-7 rounded-full bg-line flex items-center justify-center text-xs font-bold text-accent-2">
                    {(c.author?.username || '?').charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm font-medium">{c.author?.username || 'Unknown'}</span>
                  <span className="text-xs text-muted">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-muted">{c.body}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </motion.article>
  )
}
