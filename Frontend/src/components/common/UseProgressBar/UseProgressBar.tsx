import React from "react";

interface UseProgressBarProps {
  progress: number; // The progress value (0-100)
  title?: string;
}

const UseProgressBar: React.FC<UseProgressBarProps> = ({ progress, title }) => {
  const progressColor = progress >= 80 ? "red" : "#00c853";

  return (
    <div>
      <h3 className="progress-title">{title}</h3>
      <div
        className="range"
        style={
          {
            "--p": `${progress}`,
            "--progress-color": progressColor,
          } as React.CSSProperties
        }
      >
        {/* <div className="range__label">Progress</div> */}
      </div>
    </div>
  );
};

export default UseProgressBar;
