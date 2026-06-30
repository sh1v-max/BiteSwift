import '../css/Shimmer.css'

const ShimmerCard = () => (
  <div className="shimmer-card">
    <div className="shimmer-img-wrap">
      <div className="shimmer-pulse shimmer-img" />
    </div>
    <div className="shimmer-body">
      <div className="shimmer-pulse shimmer-line w-75" />
      <div className="shimmer-meta-row">
        <div className="shimmer-pulse shimmer-badge" />
        <div className="shimmer-pulse shimmer-line w-40" />
        <div className="shimmer-pulse shimmer-line w-30" />
      </div>
      <div className="shimmer-pulse shimmer-line w-85" />
      <div className="shimmer-pulse shimmer-line w-50" />
    </div>
  </div>
)

const Shimmer = () => (
  <div className="shimmer-grid">
    {Array(8).fill('').map((_, i) => (
      <ShimmerCard key={i} />
    ))}
  </div>
)

export default Shimmer
