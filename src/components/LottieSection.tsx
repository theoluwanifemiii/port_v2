import React, { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";

interface LottieSectionProps {
  animationPath: string; // path to your JSON file inside public
  maxWidth?: string;
  autoplay?: boolean;
}

export const LottieSection: React.FC<LottieSectionProps> = ({ animationPath, maxWidth = "800px", autoplay = false }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const lottieRef = useRef<any>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(animationPath)
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, [animationPath]);

  return (
    <div
      ref={sectionRef}
      className="w-full h-full flex items-center justify-center bg-transparent"
      style={{ width: "100%", height: "100%", maxWidth, background: "none" }}
      onMouseEnter={() => {
        if (lottieRef.current && typeof lottieRef.current.play === 'function') {
          lottieRef.current.play();
        }
      }}
      onMouseLeave={() => {
        if (lottieRef.current && typeof lottieRef.current.stop === 'function') {
          lottieRef.current.stop();
        }
      }}
    >
      {animationData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop
          autoplay={autoplay}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      )}
    </div>
  );
};