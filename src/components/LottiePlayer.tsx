import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";

interface LottiePlayerProps {
  animationPath: string;
  autoplay?: boolean;
  loop?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export const LottiePlayer: React.FC<LottiePlayerProps> = ({
  animationPath,
  autoplay = false,
  loop = true,
  pauseOnHover = true,
  className = ""
}) => {
  const [animationData, setAnimationData] = useState<any>(null);
  const [isPaused, setIsPaused] = useState(!autoplay);

  useEffect(() => {
    fetch(animationPath)
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Error loading animation:", error));
  }, [animationPath]);

  if (!animationData) return null;

  return (
    <div
      className={className}
      onMouseEnter={() => pauseOnHover && setIsPaused(!autoplay)}
      onMouseLeave={() => pauseOnHover && setIsPaused(autoplay ? false : true)}
    >
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        isPaused={isPaused}
      />
    </div>
  );
};
