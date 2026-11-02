import { Link } from 'react-router-dom'
import { ArrowUpRight, MessageCircle } from 'lucide-react'

// 剥离 HTML 标签，生成纯文本摘要（富文本内容里的 <img>/<p> 等不显示）
const toExcerpt = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

// 博客卡片：通过 props 接收 post 数据
export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post._id}`}
      className="glass card-glow rounded-2xl p-6 flex flex-col group"
    >
      <h3 className="text-xl font-bold group-hover:text-accent-2 transition-colors">
        {post.title}
      </h3>
      <p className="mt-2.5 text-sm text-muted line-clamp-3 flex-1">{toExcerpt(post.content)}</p>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center text-xs font-bold text-white">
            {(post.author?.username || '?').charAt(0).toUpperCase()}
          </span>
          <span className="text-xs text-muted">{post.author?.username || 'Unknown'}</span>
          <span className="text-xs text-muted/60">·</span>
          <span className="text-xs text-muted">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </Link>
  )
}
