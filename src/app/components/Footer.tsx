import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="h-5 justify-center z-10 text-xs bg-gray-50 opacity-90 flex gap-5 py-0.5 px-8 w-full">
        <p>{new Date().getFullYear()} Hisotri All rights reserved &#169;</p>
        <div className="flex space-x-2 social-icons gap- ">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="self-center"
          >
            <FaFacebook />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="self-center"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="self-center"
          >
            <FaInstagram />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
