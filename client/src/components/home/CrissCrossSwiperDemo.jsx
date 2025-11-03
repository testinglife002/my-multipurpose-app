// ✅ Final React Component (CrissCrossSwiperDemo.jsx)
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "./CrissCrossSwiperDemo.css";

const slides = [
  {
    id: 1,
    title: "Sunrise Beach",
    image: "https://cdn.wallpapersafari.com/47/81/GvPV8B.jpg",
  },
  {
    id: 2,
    title: "Forest Trail",
    image:
      "https://images.hdqwalls.com/download/canyonlands-sunrise-4k-dn-1360x768.jpg",
  },
  {
    id: 3,
    title: "Snowy Mountains",
    image:
      "https://thumbs.dreamstime.com/b/nature-thailand-rice-farm-44919269.jpg",
  },
  {
    id: 4,
    title: "Desert Dunes",
    image: "https://thumbs.dreamstime.com/b/rice-field-11331615.jpg",
  },
  {
    id: 5,
    title: "City Nights",
    image:
      "https://as1.ftcdn.net/v2/jpg/05/13/62/20/1000_F_513622056_aQR7ZWBkJ4NyzCByAgswMpNF3B6e9UIJ.jpg",
  },
];

const CrissCrossSwiperDemo = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="hero-section" style={{height:'100vh', marginBottom:'5%'}} >
      {/* Hero Area */}
      <div className="hero-area">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          className="hero-bg-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="hero-slide"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay Text */}
        <div className="hero-overlay">
          <div className="overlay-content">
            <h1 className="hero-title">Explore Nature</h1>
            <p className="hero-subtitle">
              Discover the world’s most stunning landscapes. Scroll through the beauty.
            </p>
            <a href="#explore" className="cta-button">
              Get Started
            </a>

            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Slider Panel */}
      <div className="slider-panel">
        <Swiper
          direction="vertical"
          modules={[Mousewheel, Autoplay, Pagination]}
          mousewheel
          loop={true}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={3}
          centeredSlides={true}
          className="vertical-swiper"
          onClick={(swiper) => swiper.slideNext()}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="slider-content">
                <img src={slide.image} alt={slide.title} />
                <h6>{slide.title}</h6>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Floating Action Button */}
        <button
          className="fab-button"
          onClick={() => setExpanded(!expanded)}
          title={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? <FaChevronDown /> : <FaChevronUp />}
          
        </button>
      </div>
    </div>
  );
};

export default CrissCrossSwiperDemo;

