import React from "react";

interface ImageSliderProps {
  images: string[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full"
          >
            <img
              src={image}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
