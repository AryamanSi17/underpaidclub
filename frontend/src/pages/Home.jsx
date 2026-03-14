import React from 'react';
import Hero from '../components/Hero';
import WaitlistForm from '../components/WaitlistForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="flex-1 container flex flex-col lg:flex-row items-center justify-between py-16 lg:py-0 gap-16 relative z-10">
        <Hero className="flex-1" />
        <div className="flex-1 flex justify-center lg:justify-end">
          <WaitlistForm />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
