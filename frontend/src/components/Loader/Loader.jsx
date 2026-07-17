import "./Loader.css";

export function PageLoader() {
  return (
    <div className="page-loader">
      <div className="page-loader__spinner" />
      <span>Lucky Couture</span>
    </div>
  );
}

export function Skeleton({ height = 220, radius = 18 }) {
  return (
    <div
      className="skeleton"
      style={{ height, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}

export function SkeletonGrid({ count = 6, height = 320 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <Skeleton height={height} />
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line skeleton--short" />
        </div>
      ))}
    </div>
  );
}
