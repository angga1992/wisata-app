// components/Slider.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

// Impor gaya Swiper
import 'swiper/swiper-bundle.css';

// Inisialisasi modul Swiper
SwiperCore.use([Navigation, Pagination, Autoplay]);

const images = [
  '/image1.jpg',
  '/image2.jpg',
  '/image3.jpg',
  // ...Tambahkan path gambar tambahan jika diperlukan
];

const Slider = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="h-screen bg-fixed bg-cover" style={{ backgroundImage: `url(${image})` }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
