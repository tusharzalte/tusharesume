import React from "react";
import "../Resources/Stylesheets/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        Made with ♥️ by{" "}
        <a
          href="https://www.linkedin.com/in/tushar-zalte-5aa8121aa/"
          className="link"
        >
          Tushar07
        </a>
      </p>
      <p>
        <a href="https://github.com/tusharzalte/">
          <i className="fa fa-github fa-2x link"></i>
        </a>
      </p>
    </div>
  );
};

export default Footer;
