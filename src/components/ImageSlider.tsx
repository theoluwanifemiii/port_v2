import React, { useState, useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

interface ImageSliderProps {
  images: string[];
  enableFadeEffect?: boolean;
}

interface ImageGroup {
  images: string[];
  aspectRatio: 'landscape' | 'portrait' | 'square';
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images, enableFadeEffect = false }) => {
  const [imageGroups, setImageGroups] = useState<ImageGroup[]>([]);
  const [visibleGroups, setVisibleGroups] = useState<Set<number>>(new Set());
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    if (!enableFadeEffect) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-group-index') || '0');
          setVisibleGroups((prev) => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(index);
            } else {
              newSet.delete(index);
            }
            return newSet;
          });
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    groupRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [imageGroups, enableFadeEffect]);

  return (
    <div className="w-full space-y-6">
      {imageGroups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          ref={(el) => (groupRefs.current[groupIndex] = el)}
          data-group-index={groupIndex}
          className={`relative w-full transition-all duration-700 ${
            enableFadeEffect
              ? visibleGroups.has(groupIndex)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
              : 'opacity-100'
          }`}
        >
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
