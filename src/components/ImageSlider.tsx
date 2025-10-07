import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

interface ImageSliderProps {
  images: string[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={800}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        fadeEffect={{
          crossFade: true,
        }}
        className="w-[400px] h-auto"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`slide-${index}`}
              className="object-cover w-full h-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
