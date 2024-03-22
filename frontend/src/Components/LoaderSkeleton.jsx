import React from "react";
import "../css/feed.css";

const LoaderSkeleton = () => {
  return (
    <div className="loader-skeleton">
      {/* First row */}
      <div className="loader-skeleton-item"></div>
      <div className="loader-skeleton-item"></div>
      <div className="loader-skeleton-item"></div>
      <div className="loader-skeleton-item"></div>

      {/* Second row */}
      <div className="loader-skeleton-item"></div>
      <div className="loader-skeleton-item"></div>
      <div className="loader-skeleton-item"></div>
      <div className="loader-skeleton-item"></div>

      {/* Third row */}
      <div className="loader-skeleton-item"></div>
      <div className="loader-skeleton-item"></div>
      <div className="loader-skeleton-item"></div>
      <div className="loader-skeleton-item"></div>
    </div>
  );
};

export default LoaderSkeleton;
