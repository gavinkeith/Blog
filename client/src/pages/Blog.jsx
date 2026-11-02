import { useEffect, useState } from 'react'
import { api } from '../api.js'
import BlogCard from '../components/BlogCard.jsx'
import Skeleton from '../components/Skeleton.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api('/blog')
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <Reveal>
        <h1 className="text-4xl font-extrabold">
          The <span className="text-gradient">Blog</span>
        </h1>
        <p className="mt-2 text-muted">Thoughts, notes and things I'm learning.</p>
      </Reveal>

      <div className="mt-10">
        {loading ? (
          <Skeleton count={2} />
        ) : error ? (
          <p className="text-center text-red-400 py-16 glass rounded-2xl">Error: {error}</p>
        ) : posts.length === 0 ? (
          <EmptyState text="No posts yet — stay tuned!" />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <Reveal key={post._id} delay={(i % 2) * 0.1}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
