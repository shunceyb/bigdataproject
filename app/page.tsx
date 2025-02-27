"use client";
import Navbar from "./components/Navbar";
import HomeSection from "./components/Introduction";
import AboutSection from "./components/About";
import LinkProduct from "./components/LinkProduct";
import Footer from "./components/Footer";

const Home = () => {
  
  return (
    <div className="">
      <Navbar />
      <HomeSection />
      <AboutSection />
      <LinkProduct />
      <Footer />
    </div>
  );
}

export default Home
