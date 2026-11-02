import { Inbox } from 'lucide-react'

// 统一的空状态提示
export default function EmptyState({ text = 'Nothing here yet' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
        <Inbox className="w-7 h-7 text-accent-2" />
      </div>
      <p className="text-muted">{text}</p>
    </div>
  )
}
