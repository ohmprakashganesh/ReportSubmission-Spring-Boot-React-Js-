import React from 'react';
import Features from './Features';
import Navbar from './Navbar';
import Hero from './Hero';
import Working from './Working';
import Testimonials from './Testimonials';
import Footer from './Footer';

const LandPage = () => {
  return (
    <div className="font-sans text-gray-800 bg-white">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </header>

      <section className="bg-gray-50">
       <Hero />
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Key Features
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Everything you need for efficient report management
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Features />         
          </div>
        </div>
      </section>

      {/* How It Works Section */}
          <Working />


      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Trusted by professionals across industries
            </p>
          </div>

          <Testimonials />

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2563eb]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to simplify your report submissions?</span>
            <span className="block">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#2563eb] bg-white hover:bg-gray-50">
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandPage;