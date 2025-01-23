"use client";
export default function SkeletonLoader({ className = "h-24" }) {
  return (
    <div className={`bg-gray-200 mb-2 rounded-md ${className}`}>
      <div className="loader p-4 h-full"></div>
      <style jsx>{`
        .loader {
          min-height: 16px;
          border-radius: 8px;
          background-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0) 5%,
            rgba(0, 0, 0, 0.05),
            rgba(0, 0, 0, 0) 95%
          );
          background-size: 50% auto;
          background-repeat: no-repeat;
          animation: baseloader 1s linear infinite;
          display: block;
          will-change: background;
        }

        @keyframes baseloader {
          0% {
            background-position-x: -50%;
          }
          100% {
            background-position-x: 200%;
          }
        }
      `}</style>
    </div>
  );
}
