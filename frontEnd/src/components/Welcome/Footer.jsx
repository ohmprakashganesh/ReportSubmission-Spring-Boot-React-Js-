import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#EBEFF3] py-8 px-6 md:px-10 text-center text-[#6B7280] text-sm">
            <p>&copy; 2025 BugCheck. All rights reserved.</p>
            <div className="mt-4 space-x-4">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Terms of Service</a>
                <a href="#" className="hover:underline">About Us</a>
                <a href="#" className="hover:underline">Support</a>
            </div>
            <div className="mt-4 text-lg space-x-4">
                <a href="#" className="hover:text-[#1A4B6B]"><i className="fab fa-facebook"></i></a>
                <a href="#" className="hover:text-[#1A4B6B]"><i className="fab fa-twitter"></i></a>
                <a href="#" className="hover:text-[#1A4B6B]"><i className="fab fa-linkedin"></i></a>
            </div>
        </footer>
  )
}

export default Footer
