import { useEffect, useState } from 'react'
import { api } from '../api.js'
import ProjectCard from '../components/ProjectCard.jsx'
import Skeleton from '../components/Skeleton.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api('/projects')
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <Reveal>
        <h1 className="text-4xl font-extrabold">
          My <span className="text-gradient">Projects</span>
        </h1>
        <p className="mt-2 text-muted">A collection of things I've built.</p>
      </Reveal>

      <div className="mt-10">
        {loading ? (
          <Skeleton count={3} />
        ) : error ? (
          <p className="text-center text-red-400 py-16 glass rounded-2xl">Error: {error}</p>
        ) : projects.length === 0 ? (
          <EmptyState text="No projects yet — check back soon!" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Reveal key={p._id} delay={(i % 3) * 0.1}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
