import React from "react";
import { CiInstagram, CiFacebook, CiTwitter } from "react-icons/ci";
import "./style.css";

const footer = () => {
  return (
    <>
      <div className="footer">
        <div className="left">
          <h2>Olivia Blogs</h2>
          <p className="foot-desc">
            Olivia Blogs allows users to create and publish blogs, offering a
            platform to express ideas and share content.
          </p>
        </div>
        <div className="mid">
          <h4>Checkout</h4>
          <li>
            <a>Blogs</a>
          </li>
          <li>
            <a>Categories</a>
          </li>
          <li>
            <a>Authors</a>
          </li>
        </div>
        <div className="mid">
          <h4>Personal</h4>
          <li>
            <a>Login</a>
          </li>
          <li></li>
          <a>Signup</a>
          <li>
            <a>Authors</a>
          </li>
        </div>
        <div className="right">
          <h4>Visit</h4>
          <li>
            <CiFacebook className="contact-icons" />
            <CiInstagram className="contact-icons" />
            <CiTwitter className="contact-icons" />
          </li>
        </div>
      </div>
      <div className="outer-footer">
        <p>&copy; 2022 Blogging. All rights reserved.</p>
      </div>
    </>
  );
};

export default footer;
