import React from "react";

interface UseProgressBarProps {
  progress: number; // The progress value (0-100)
  title?: string;
  isLoading?: boolean; // Add a loading state
}

const UseProgressBar: React.FC<UseProgressBarProps> = ({
  progress,
  title,
  isLoading = false, // Default loading state is false
}) => {
  if (isLoading) {
    return (
      <div>
        <h3 className="skeleton-title skeleton"></h3>
        <div className="range skeleton" />
      </div>
    );
  }

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
      />
    </div>
  );
};

export default UseProgressBar;
