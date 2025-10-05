import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

interface ImageSliderProps {
  images: string[];
}

interface ImageGroup {
  images: string[];
  aspectRatio: 'landscape' | 'portrait' | 'square';
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [imageGroups, setImageGroups] = useState<ImageGroup[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        images.map((src) => {
          return new Promise<{ src: string; width: number; height: number }>((resolve) => {
            const img = new Image();
            img.onload = () => {
              resolve({ src, width: img.naturalWidth, height: img.naturalHeight });
            };
            img.onerror = () => {
              resolve({ src, width: 1, height: 1 });
            };
            img.src = src;
          });
        })
      );

      const grouped: ImageGroup[] = [];
      const used = new Set<number>();

      loadedImages.forEach((img, index) => {
        if (used.has(index)) return;

        const aspectRatio = img.width / img.height;
        let type: 'landscape' | 'portrait' | 'square';

        if (aspectRatio > 1.2) {
          type = 'landscape';
        } else if (aspectRatio < 0.8) {
          type = 'portrait';
        } else {
          type = 'square';
        }

        const group: ImageGroup = {
          images: [img.src],
          aspectRatio: type
        };

        for (let i = index + 1; i < loadedImages.length; i++) {
          if (used.has(i)) continue;

          const nextImg = loadedImages[i];
          const nextAspectRatio = nextImg.width / nextImg.height;
          let nextType: 'landscape' | 'portrait' | 'square';

          if (nextAspectRatio > 1.2) {
            nextType = 'landscape';
          } else if (nextAspectRatio < 0.8) {
            nextType = 'portrait';
          } else {
            nextType = 'square';
          }

          if (nextType === type) {
            group.images.push(nextImg.src);
            used.add(i);
          }
        }

        used.add(index);
        grouped.push(group);
      });

      setImageGroups(grouped);
    };

    loadImages();
  }, [images]);

  return (
    <div className="w-full space-y-6">
      {imageGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="relative w-full">
          {group.images.length === 1 ? (
            <div className="w-full">
              <img
                src={group.images[0]}
                alt={`Screenshot ${groupIndex + 1}`}
                className="w-full h-auto"
              />
            </div>
          ) : (
            <Splide
              options={{
                type: 'loop',
                autoplay: true,
                interval: 3000,
                pauseOnHover: true,
                arrows: true,
                pagination: true,
                gap: '0',
                speed: 800,
              }}
              aria-label={`Image group ${groupIndex + 1}`}
            >
              {group.images.map((image, imgIndex) => (
                <SplideSlide key={imgIndex}>
                  <img
                    src={image}
                    alt={`Screenshot ${groupIndex + 1}-${imgIndex + 1}`}
                    className="w-full h-auto"
                  />
                </SplideSlide>
              ))}
            </Splide>
          )}
        </div>
      ))}
    </div>
  );
};
