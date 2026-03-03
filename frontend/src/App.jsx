import React, { useState } from 'react';
import Hero from './components/Hero';
import WaitlistForm from './components/WaitlistForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { DotPattern } from './components/ui/DotPattern';
import './App.css';

function App() {
  return (
    <div className="app-container dark">
      <DotPattern className="opacity-80" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 container flex flex-col lg:flex-row items-center justify-between py-16 lg:py-0 gap-16">
          <Hero className="flex-1" />
          <div className="flex-1 flex justify-center lg:justify-end">
            <WaitlistForm />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
