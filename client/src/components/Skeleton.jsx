// 骨架屏占位：加载时替代 "Loading..." 文字
export default function Skeleton({ count = 3, type = 'card' }) {
  return (
    <div className={type === 'card' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass rounded-2xl p-5">
          {type === 'card' && <div className="skeleton h-40 w-full mb-4" />}
          <div className="skeleton h-5 w-2/3 mb-3" />
          <div className="skeleton h-3.5 w-full mb-2" />
          <div className="skeleton h-3.5 w-5/6" />
        </div>
      ))}
    </div>
  )
}
