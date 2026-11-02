import { Link } from 'react-router-dom'
import { Code2, ExternalLink } from 'lucide-react'

// 项目卡片：通过 props 接收 project 数据
export default function ProjectCard({ project }) {
  return (
    <div className="glass card-glow rounded-2xl overflow-hidden flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-600/70 via-purple-600/50 to-cyan-500/60 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <span className="text-white/90 text-5xl font-extrabold">{project.title.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold group-hover:text-accent-2 transition-colors">{project.title}</h3>
        <p className="mt-2 text-sm text-muted flex-1">{project.description}</p>
        <div className="mt-4 flex gap-4">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent-2 transition-colors"
            >
              <Code2 className="w-4 h-4" /> Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-2 hover:underline"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
