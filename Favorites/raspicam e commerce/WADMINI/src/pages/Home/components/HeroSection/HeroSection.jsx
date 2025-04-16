import React from "react";
import Tilt from "react-parallax-tilt";
import "./HeroSection.css";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Welcome to <span>RoboTech Nexus</span>
        </h1>
        <p className="hero-subtitle">
          Explore cutting-edge robotics, AI systems, and smart automation solutions
        </p>
        <Link to="/product-listing" className="hero-cta">
          Discover Innovations
        </Link>
      </div>
      
      <Tilt 
        className="hero-image-tilt"
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        scale={1.05}
        transitionSpeed={2500}
        glareEnable={true}
        glareMaxOpacity={0.3}
        glareColor="#00ffff"
        glarePosition="all"
      >
        <div className="hero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1685&q=80" 
            alt="Advanced robotic arm in industrial setting" 
            className="hero-image" 
            loading="eager"
          />
          <div className="tech-badge">
            <span className="ai-badge">AI-Powered</span>
            <span className="iot-badge">IoT Connected</span>
          </div>
        </div>
      </Tilt>
    </section>
  );
};