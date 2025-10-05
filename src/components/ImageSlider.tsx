import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: string[];
}

interface ImageGroup {
  images: string[];
  aspectRatio: 'landscape' | 'portrait' | 'square';
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [imageGroups, setImageGroups] = useState<ImageGroup[]>([]);
  const [currentIndices, setCurrentIndices] = useState<number[]>([]);
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);

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
      setCurrentIndices(new Array(grouped.length).fill(0));
    };

    loadImages();
  }, [images]);

  useEffect(() => {
    const intervals = imageGroups.map((group, groupIndex) => {
      if (group.images.length <= 1 || hoveredGroup === groupIndex) return null;

      return setInterval(() => {
        setCurrentIndices((prev) => {
          const newIndices = [...prev];
          newIndices[groupIndex] = (newIndices[groupIndex] + 1) % group.images.length;
          return newIndices;
        });
      }, 3000);
    });

    return () => {
      intervals.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, [imageGroups, hoveredGroup]);

  const goToNext = (groupIndex: number) => {
    setCurrentIndices((prev) => {
      const newIndices = [...prev];
      const group = imageGroups[groupIndex];
      newIndices[groupIndex] = (newIndices[groupIndex] + 1) % group.images.length;
      return newIndices;
    });
  };

  const goToPrevious = (groupIndex: number) => {
    setCurrentIndices((prev) => {
      const newIndices = [...prev];
      const group = imageGroups[groupIndex];
      newIndices[groupIndex] =
        newIndices[groupIndex] === 0
          ? group.images.length - 1
          : newIndices[groupIndex] - 1;
      return newIndices;
    });
  };

  return (
    <div className="w-full space-y-6">
      {imageGroups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className="relative w-full"
          onMouseEnter={() => setHoveredGroup(groupIndex)}
          onMouseLeave={() => setHoveredGroup(null)}
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
            <div className="relative w-full group">
              <div className="w-full overflow-hidden">
                <img
                  src={group.images[currentIndices[groupIndex]]}
                  alt={`Screenshot ${groupIndex + 1}-${currentIndices[groupIndex] + 1}`}
                  className="w-full h-auto transition-opacity duration-500"
                />
              </div>

              <button
                onClick={() => goToPrevious(groupIndex)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => goToNext(groupIndex)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 px-3 py-2 rounded-full">
                {group.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndices((prev) => {
                        const newIndices = [...prev];
                        newIndices[groupIndex] = index;
                        return newIndices;
                      });
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndices[groupIndex]
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/75 w-2"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm [font-family:'Sometype_Mono',Helvetica]">
                {currentIndices[groupIndex] + 1} / {group.images.length}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
