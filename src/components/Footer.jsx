import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6  w-full">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        <div className="flex justify-center  gap-3 w-full  flex-wrap sm:flex-nowrap max-w-md">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
            <a href="mailto:Pixelate@gmail.com" className="hover:text-blue-500">
              Pixelate@gmail.com{" "}
            </a>
          </div>
          <span>Folow us </span>
          <div className="social-icons flex items-center gap-2">
            <a href="https://www.facebook.com" target="_blank">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        <div className="text-center">
          <p>© 2024 Pixelate. All rights reserved.</p>
          <p>
            Made with by{" "}
            <span style={{ color: "rgb(250 255 101)" }}> Devminds Team</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
