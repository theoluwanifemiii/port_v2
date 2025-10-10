import React, { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";

interface LottieSectionProps {
  animationPath: string; // path to your JSON file inside public
  maxWidth?: string;
  autoplay?: boolean;
}

export const LottieSection: React.FC<LottieSectionProps> = ({
  animationPath,
  maxWidth = "800px",
  autoplay = false,
}) => {
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
      className="flex items-center justify-center w-full h-full bg-transparent bg-red-400"
      style={{ width: "100%", height: "100%", background: "none" }}
      onMouseEnter={() => {
        if (lottieRef.current && typeof lottieRef.current.play === "function") {
          lottieRef.current.play();
        }
      }}
      onMouseLeave={() => {
        if (lottieRef.current && typeof lottieRef.current.stop === "function") {
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
