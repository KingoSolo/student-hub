import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const Landing = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Toggle FAQ visibility
  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="font-montserrat scroll-smooth">
      {/* Navbar */}
      <header className="bg-white shadow-md py-4 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-blue-600">Study Hub</h1>
          <nav className="hidden md:flex space-x-8">
            <Link to="hero" smooth={true} duration={500} className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="about" smooth={true} duration={500} className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="features" smooth={true} duration={500} className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link to="faqs" smooth={true} duration={500} className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors">
              FAQs
            </Link>
          </nav>
          <RouterLink to="/login">
          <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100">
            Login
          </button>
          </RouterLink>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6 pt-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Share Knowledge, Empower Minds</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Join a vibrant community where students share, discover, and learn from the best study resources available.
        </p>
        <RouterLink to="/signup">
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105">
          Get Started
        </button>
        </RouterLink>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-blue-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">About Study Hub</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Study Hub is designed to foster a community-driven approach to learning. By enabling students to easily share and access study materials, our platform promotes collaboration and knowledge sharing.
          </p>
          <p className="text-lg md:text-xl text-gray-700">
            Experience seamless access to a world of knowledge, shared by students just like you. Our mission is to empower students with the tools and resources they need to succeed academically.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-10">Key Features</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-6">
          {['Upload Resources', 'Search and Discover', 'Collaborative Learning'].map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-lg p-8 w-full md:w-1/3 h-64 flex flex-col justify-between transform hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4">{feature}</h3>
              <p className="text-gray-700">
                {feature === 'Upload Resources'
                  ? 'Easily share your study notes, past questions, and other resources with fellow students.'
                  : feature === 'Search and Discover'
                  ? 'Quickly find relevant resources using our powerful search feature.'
                  : 'Engage with your peers through collaborative study sessions.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-20 bg-white text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-10">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            { question: "What is Study Hub?", answer: "Study Hub is a platform for students to share and access study materials." },
            { question: "How can I upload resources?", answer: "Click on the 'Upload Resources' option in the sidebar to share your materials." },
            { question: "Is Study Hub free?", answer: "Yes, Study Hub is completely free to use for all students." },
          ].map((faq, index) => (
            <div key={index} className="text-left">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-lg font-semibold py-4 border-b border-gray-200 flex justify-between items-center"
              >
                <span>{faq.question}</span>
                <span>{activeFAQ === index ? '-' : '+'}</span>
              </button>
              {activeFAQ === index && (
                <p className="text-gray-600 mt-2 transition-opacity duration-300 ease-in-out">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p>&copy; 2024 Study Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;