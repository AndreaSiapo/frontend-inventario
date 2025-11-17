//save.jsx
export default function Save({ fill = 'currentColor', className = 'w-4 h-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 350 350"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none">
	    <path strokeLinecap="round" class="st0" d="M242,216H102 M172,296h-70 M242,256H102 M67,16v85h150V16 M172,101V16" stroke={fill} strokeWidth="18" />
	    <path strokeLinecap="round" class="st1" d="M67,336V196c0-11,9-20,20-20h170c11,0,20,9,20,20v140 M32,16c-11,0-20,9-20,20v280c0,11,9,20,20,20h280 c11,0,20-9,20-20V91l-75-75H32z" stroke={fill} strokeWidth="18" />
      </g>
    </svg>
  );
}
