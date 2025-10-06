import React, { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";

interface LottieSectionProps {
  animationPath: string; // path to your JSON file inside public
  maxWidth?: string;
}

export const LottieSection: React.FC<LottieSectionProps> = ({ animationPath, maxWidth = "800px" }) => {
  const lottieRef = useRef<any>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
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
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      style={{ width: "100%", height: "100%", maxWidth, background: "none" }}
    >
      {animationData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop
          autoplay={false}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      )}
    </div>
  );
};
