//minus.jsx
export default function IconMinus({ fill = 'currentColor', className = 'w-4 h-4' }) {
  return (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke={fill} 
    className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
  </svg>
  );
}
