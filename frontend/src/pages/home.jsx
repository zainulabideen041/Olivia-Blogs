import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import AiImg from "../assets/img2.jpg";
import "aos/dist/aos.css";
import axios from "axios";
import AOS from "aos";
import "./style.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const Navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get("https://backend-umber-chi-47.vercel.app/blog/display");
        setBlogs(response.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    const getCategories = async () => {
      try {
        const response = await axios.get(
          "https://backend-umber-chi-47.vercel.app/blog/categories"
        );
        setCategories(["All", ...(response.data.categories || [])]);
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
        <h2 data-aos="fade-up">Welcome to Olivia Blog</h2>
        <p data-aos="fade-up">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonummy
          semper nisi. Aenean eget dui id velit placerat dignissim. Vestibulum
          auctor dapibus neque.
        </p>
        <button className="hero-btn" onClick={scrollToBlogs} data-aos="fade-up">
          Read More <IoMdArrowForward className="arrow-icon" />
        </button>
      </div>
      <div className="category-section">
        <h2 data-aos="fade-up">Explore Popular Categories</h2>
        <p data-aos="fade-up">
          Explore popular categories Lorem ipsum dolor sit amet Lorem ipsum
          dolor sit..
        </p>
        <div className="category-items">
          {categories.map((category) => (
            <div
              key={category}
              className={`category-item ${
                selectedCategory === category ? "active" : ""
              }`}
              data-aos="fade-up"
              onClick={() => setSelectedCategory(category)}
            >
              <img src={AiImg} alt={category} />
              <h3>{category}</h3>
            </div>
          ))}
        </div>
        <hr />
      </div>

      <div className="blogs-section">
        <h2 id="blogs" data-aos="fade-up">
          {selectedCategory === "All"
            ? "All Blogs"
            : `Blogs in "${selectedCategory}"`}
        </h2>
        <div className="blog-cards">
          {filteredBlogs.length === 0 ? (
            <div>No blogs found</div>
          ) : (
            filteredBlogs.slice(0, 8).map((blog) => (
              <div
                data-aos="fade-up"
                className="card"
                key={blog._id || blog.title}
                onClick={() => ViewBlog(blog._id)}
              >
                <img src={`https://backend-umber-chi-47.vercel.app/${blog.image}`} alt="" />
                <div className="card-content">
                  <span className="card-content-date">
                    {new Date(blog.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <h4>{blog.title}</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugiat, architecto. Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Quos, dolorem!
                  </p>
                  <p>Author: {blog.author}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
