import React, { useState, useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

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
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    fetch(animationPath)
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Error loading animation:", error));
  }, [animationPath]);

  const handleMouseEnter = () => {
    if (pauseOnHover && lottieRef.current) {
      lottieRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && lottieRef.current) {
      lottieRef.current.play();
    }
  };

  if (!animationData) return null;

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
      />
    </div>
  );
};
