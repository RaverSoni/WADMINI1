import React from "react";
import { Footer } from "../../components/Footer/Footer";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { CategoriesSection } from "./components/CategoriesSection/CategoriesSection";
import { useData } from "../../contexts/DataProvider";
import "./Home.css";

export const Home = () => {
  const { loading } = useData();
  
  return (
    !loading && (
      <div className="home-page">
        <HeroSection />
        <CategoriesSection />
        <Footer />
      </div>
    )
  );
};