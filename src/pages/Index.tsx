
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Examples from '../components/Examples';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      
      <main>
        <Hero />
        <Examples />
        <Features />
        <FAQ />
        <Pricing />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
