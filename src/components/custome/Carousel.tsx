import React, { useState } from 'react';

interface CarouselProps {
  data: {
    caption: string;
    size_sm: string;
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  console.log('sss',data)
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + data.length) % data.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {data.map((item, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={item.size_sm} alt={item.caption} className="w-40 h-auto" />
            <div className="caption">{item.caption}</div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="carousel-btn prev">&#10094;</button>
      <button onClick={nextSlide} className="carousel-btn next">&#10095;</button>
    </div>
  );
};

export default Carousel;
