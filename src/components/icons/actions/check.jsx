//x-mark.jsx
export default function IconCheck({ fill = 'currentColor', className = 'w-4 h-4' }) {
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
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>

  );
}
