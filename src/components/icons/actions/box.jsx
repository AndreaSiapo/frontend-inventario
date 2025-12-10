//box.jsx
export function IconMinBox({ 
    fill = 'currentColor', 
    className = 'w-4 h-4' }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={fill} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round">
        -
    </svg>
  );
}

export function IconPlusBox({ 
    fill = 'currentColor', 
    className = 'w-4 h-4' }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={fill} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round">
        +
    </svg>
  );
}
