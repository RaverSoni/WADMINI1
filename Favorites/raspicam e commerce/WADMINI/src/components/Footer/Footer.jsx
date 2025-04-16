// import React from "react";
// import "./Footer.css";
// import { ImGithub } from "react-icons/im";
// import { SiLinkedin } from "react-icons/si";
// import { BsTwitter } from "react-icons/bs";
// import { Link } from "react-router-dom";

// export const Footer = () => {
//   const copyrightYear = new Date().getFullYear();

//   return (
//     <div className="footer">
//       <small> &copy; {copyrightYear}WADL MINI PROJECT Developed By Ribhav, Sheel, Harshad</small>
//       <div className="social-links">
//            <ImGithub />
        
       
          
       
//       </div>
//     </div>
//   );
// };

import React from "react";
import "./Footer.css";
import { ImGithub } from "react-icons/im";
import { SiLinkedin } from "react-icons/si";
import { BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Footer = () => {
  const copyrightYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="footer-content">
        <small className="copyright">
          &copy; {copyrightYear} WADL MINI PROJECT | Developed By Ribhav, Sheel, Harshad
        </small>
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <ImGithub className="social-icon" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <SiLinkedin className="social-icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <BsTwitter className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};