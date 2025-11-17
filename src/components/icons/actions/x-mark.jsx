//x-mark.jsx
export default function IconX({ fill = 'currentColor', className = 'w-4 h-4' }) {
  return (
    <svg
      fill="none"
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      stroke={fill}
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
