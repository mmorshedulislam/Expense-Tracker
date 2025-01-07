import React from "react";

interface UseProgressBarProps {
  progress: number; // The progress value (0-100)
  title?: string;
}

const UseProgressBar: React.FC<UseProgressBarProps> = ({ progress, title }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div
        className="range"
        style={{ "--p": `${progress}` } as React.CSSProperties}
      >
        {/* <div className="range__label">Progress</div> */}
      </div>
    </div>
  );
};

export default UseProgressBar;
