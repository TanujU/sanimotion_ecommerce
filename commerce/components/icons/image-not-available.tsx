import React from 'react';

interface ImageNotAvailableProps {
  className?: string;
  size?: number;
}

export default function ImageNotAvailable({ 
  className = "", 
  size = 200
}: ImageNotAvailableProps) {
  return (
    <div 
      className={`relative flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Image Icon */}
      <svg 
        className="w-12 h-12 text-gray-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" 
        />
      </svg>
      
      {/* Text */}
      <div className="absolute bottom-2 text-xs text-gray-500 text-center px-2">
        No Image
      </div>
    </div>
  );
}
