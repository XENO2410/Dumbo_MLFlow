"use client";
import React, { useState } from 'react';
import AboutUs from './about/AboutUs';
import Silly from './Sylly/page';
const Main = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar
        toggleMobileMenu={toggleMobileMenu}
        mobileMenuOpen={mobileMenuOpen}
      /> */}
      {/* <HeroComponent />
      <FeatureCards /> */}
      <Silly />
      {/* <AboutUs />
      <Footer /> */}
    </div>
  );
};

export default Main;
