import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import axiosInstance from "../components/axiosInstance";
import "react-multi-carousel/lib/styles.css";
import { IoMdArrowForward } from "react-icons/io";
import AiImg from "../assets/img2.jpg";
import blogImg from "../assets/img3.jpg";
import { Typewriter } from "react-simple-typewriter";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";

import { tailChase } from "ldrs";

tailChase.register();

function stripHtmlTags(htmlString) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || "";
}
const Home = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const Navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axiosInstance.get("/blog/display");
        setBlogs(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const getCategories = async () => {
      try {
        const response = await axiosInstance.get("/blog/categories");
        setCategories(["All", ...(response.data || [])]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getBlogs();
    getCategories();
  }, []);

  const scrollToBlogs = () => {
    const blogsSection = document.getElementById("blogs");
    if (blogsSection) {
      blogsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ViewBlog = (id) => {
    Navigate(`/blog/${id}`);
  };

  // Filter blogs based on selected category
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <main className="home-section">
      <div className="hero-section">
        <h2 data-aos="fade-up">
          Welcome to&nbsp;
          <Typewriter
            words={[
              "Olivia Blog",
              "Blogs World",
              "Your Learning Hub",
              "Stories That Matter",
              "Your Daily Reads",
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={200}
            deleteSpeed={80}
            delaySpeed={1000}
          />
        </h2>
        <p data-aos="fade-up">
          Dive into a world of knowledge, inspiration, and creativity! Discover
          blogs on topics you love, learn something new every day, and explore a
          variety of categories.
        </p>
        <button className="hero-btn" onClick={scrollToBlogs} data-aos="fade-up">
          Read More <IoMdArrowForward className="arrow-icon" />
        </button>
      </div>
      <div className="category-section">
        <h2 data-aos="fade-up">Explore Popular Categories</h2>
        <p data-aos="fade-up">
          Discover a range of topics on our blog, from lifestyle and tech to
          health and travel. Slide vertically to find more of what interests
          you!
        </p>
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={false}
          autoPlay={true}
          autoPlaySpeed={1000}
          pauseOnHover={true}
          className="category-slider"
        >
          {loading ? (
            <div
              className="loader"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "20vh",
              }}
            >
              <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
            </div>
          ) : (
            categories.map((category) => (
              <div
                data-aos="fade-up"
                key={category}
                className={`category-item ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <img src={AiImg} alt={category} />
                <h3>{category}</h3>
              </div>
            ))
          )}
        </Carousel>
        <hr />
      </div>

      <div className="blogs-section">
        <h2 id="blogs" data-aos="fade-up">
          {selectedCategory === "All"
            ? "All Blogs"
            : `Blogs in "${selectedCategory}"`}
        </h2>
        <div className="blog-cards">
          {loading ? (
            <div className="loader" style={{ height: "20vh" }}>
              <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div>No blogs found</div>
          ) : (
            filteredBlogs.slice(0, 8).map((blog) => (
              <div
                data-aos="fade-up"
                className="card"
                key={blog._id || blog.title}
                onClick={() => ViewBlog(blog._id)}
              >
                <img
                  // src={`https://backend-umber-chi-47.vercel.app/${blog.image}`}
                  src={blogImg}
                  alt=""
                />
                <div className="card-content">
                  <span className="card-content-date">
                    {new Date(blog.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <h3>{blog.title}</h3>
                  <p>{stripHtmlTags(blog.content).slice(0, 50)}...</p>
                  <p>Author: {blog.author}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="email-section" data-aos="fade-up">
        <div className="email-section-content">
          <h1 data-aos="fade-right">Get in Touch</h1>
          <p data-aos="fade-left">
            Subscribe to our newsletter to receive new blog notifications first
          </p>
          <div className="email-input" data-aos="fade-right">
            <input type="email" placeholder="Enter Your Email Address" />
            <button className="email-submit">Subscribe</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
