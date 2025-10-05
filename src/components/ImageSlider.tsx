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
            className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white border-2 border-gray-900 shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={image}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
