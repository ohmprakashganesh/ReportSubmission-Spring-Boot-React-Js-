import React from "react";
import { footerData } from "../Constants";

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Company Info Section */}
          <div className="space-y-8 xl:col-span-1">
            <span className="text-xl font-bold text-white">SmartReport</span>
            <p className="text-gray-300 text-base">
              Making report submission smarter, faster, and more efficient for
              professionals worldwide.
            </p>
          </div>

          {/* Links Sections */}
          <div className="mt-12 xl:mt-0 xl:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerData.map((data, index) => (
                <div key={index}>
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                    {data.title}
                  </h3>
                  <ul className="mt-4 space-y-0.5">
                    {data.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className=" text-sm text-gray-400 hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; 2023 SmartReport. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;