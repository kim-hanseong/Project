export const RatingIcons = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="url(#gradient)"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6"
    aria-label="Cube Icon"
  >
    <defs>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fec7c8" stopOpacity={1} />
        <stop offset="25%" stopColor="#ffbdad" stopOpacity={1} />
        <stop offset="50%" stopColor="#fad0c4" stopOpacity={1} />
        <stop offset="95%" stopColor="#d0e0ff" stopOpacity={1} />
      </linearGradient>
    </defs>

    <path
      fill="none"
      stroke="url(#gradient2)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15L15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
    />
  </svg>
);
