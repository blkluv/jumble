export default function BloodAButton({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="45" fill="#E12B38" />
      
      {/* Inner circle with gradient */}
      <defs>
        <radialGradient id="bloodGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stop-color="#FF0000" />
          <stop offset="100%" stop-color="#A00000" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="38" fill="url(#bloodGradient)" />
      
      {/* Letter A */}
      <path
        d="M50 30 L65 70 L60 70 L55 55 L45 55 L40 70 L35 70 Z"
        fill="#FFF"
      />
      <path
        d="M50 40 L53 50 L47 50 Z"
        fill="#FFF"
      />
      
      {/* Blood drip effects */}
      <path
        d="M35 75 Q40 80 45 75 Q50 85 55 75 Q60 80 65 75"
        fill="none"
        stroke="#500"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
