// src/main/2️⃣ MainApp.jsx
import React from "react";
import Topbar from "./components/Topbar";
import MarqueeBar from "./components/MarqueeBar";
import HeroSection from "./components/HeroSection";
import FeaturedPostSlider from "./components/FeaturedPostSlider";
import TwoSidePosts from "./components/TwoSidePosts";
import TrendingSlider from "./components/TrendingSlider";
import BlogPostsList from "./components/BlogPostsList";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import "./main.css";

export default function MainApp() {
  return (
    <div className="main-app-root">

      <Topbar />
      <MarqueeBar />
      <HeroSection />

      <div className="main-app-page-container">

        <FeaturedPostSlider />
        <TwoSidePosts />
        <TrendingSlider />

        <div className="main-app-content-layout">
          <div className="content-main">
            <BlogPostsList />
          </div>
          <div className="content-sidebar">
            <Sidebar />
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

