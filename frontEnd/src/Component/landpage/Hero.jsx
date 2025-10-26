import React from 'react'

 import Image from "../../assets/bg.png";
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:mt-16">
          <div className="md:flex   md:items-center md:justify-between ">
            <div className="md:w-1/2 md:order-1 order-2 lg:order-1">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Project  Submission System</span>
                <span className="block tracking-widest text-3xl pt-3 text-green-600">Made Simple</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Submit, track, and manage reports effortlessly with our intelligent platform
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center md:justify-start">
                <div className="rounded-md shadow">
                  <Link to={"/login"} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#2563eb] hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                    Get Started
                  </Link>
                </div>

              </div>
            </div>
            <div className="mt-12 md:order-2 lg:order-2 order-1 md:mt-0 md:w-1/2">
              <img className="w-full max-w-lg mx-auto" src={Image} alt="Report submission interface" />
            </div>
          </div>
        </div>
  )
}

export default Hero
