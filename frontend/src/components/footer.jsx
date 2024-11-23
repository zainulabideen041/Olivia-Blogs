import React from "react";
import { CiInstagram, CiFacebook, CiTwitter } from "react-icons/ci";
import { Link } from "react-router-dom";
import "./style.css";

const footer = ({LoginModal, RegisterModal}) => {
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
            <Link to="/blogs">
              <a>Blogs</a>
            </Link>
          </li>
          <li>
            <Link>
              <a>Categories</a>
            </Link>
          </li>
          <li>
            <Link to="authors">
              <a>Authors</a>
            </Link>
          </li>
        </div>
        <div className="mid">
          <h4>Personal</h4>
          <li>
            <a onClick={LoginModal}>Login</a>
          </li>
          <li></li>
          <a onClick={RegisterModal}>Signup</a>
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
        <p>Olivia Blog &copy; 2024 Blogging Web. All rights reserved.</p>
      </div>
    </>
  );
};

export default footer;
