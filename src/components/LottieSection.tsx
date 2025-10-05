import React, { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";

interface LottieSectionProps {
  animationPath: string; // path to your JSON file inside public
  maxWidth?: string;
}

export const LottieSection: React.FC<LottieSectionProps> = ({
  animationPath,
  maxWidth = "800px",
}) => {
  const lottieRef = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`flex justify-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      onMouseEnter={() => lottieRef.current?.pause()}
      onMouseLeave={() => lottieRef.current?.play()}
    >
      <Lottie
        lottieRef={lottieRef}
        path={animationPath}
        loop
        autoplay
        style={{ width: "100%", maxWidth }}
      />
    </div>
  );
};