import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-2">
        <div>
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="w-7 h-7 rounded-lg btn-gradient flex items-center justify-center text-sm text-white">Z</span>
            Zyx<span className="text-gradient">.dev</span>
          </Link>
          <p className="mt-3 text-sm text-muted max-w-xs">
            Full-Stack Developer building modern web experiences with React, Node.js and MongoDB.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/projects" className="hover:text-accent-2 transition-colors">Projects</Link></li>
            <li><Link to="/blog" className="hover:text-accent-2 transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-accent-2 transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted flex items-center justify-center gap-1">
        &copy; {new Date().getFullYear()} Zyx's Portfolio · Crafted with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> and caffeine
      </div>
    </footer>
  )
}
