import React from "react";

const SkeletonLoader = () => {
  return (
    <div
      style={{
        width: "90%",
        height: "350px",
        margin: "50px auto",
        background: "#e0e0e0",
        borderRadius: "10px",
        animation: "pulse 1.5s infinite"
      }}
    >LODING CHART...
      <style>
        {`
        @keyframes pulse {
          0% { opacity: 0.5 }
          50% { opacity: 1 }
          100% { opacity: 0.5 }
        }
        `}
      </style>
    </div>
  );
};

export default SkeletonLoader;