import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../components/axiosInstance";
import "aos/dist/aos.css";
import AOS from "aos";
import "./style.css";

import { tailChase } from "ldrs";

tailChase.register();

const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // New state to track screen size
  const navigate = useNavigate();
  const location = useLocation();
  const authorId = location.state?.authorId; // Get authorId from state

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axiosInstance.get("/blog/display");
        let allBlogs = response.data || [];
        if (authorId) {
          // Filter blogs by authorId if provided
          allBlogs = allBlogs.filter((blog) => blog.authorId === authorId);
        }
        setBlogs(allBlogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    getBlogs();
  }, [authorId]);

  useEffect(() => {
    // Add event listener to track screen resize
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 480);
    };

    handleResize(); // Initialize on load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  // Updated stripHtmlTags function to clean HTML and return text
  function stripHtmlTags(htmlString) {
    // Remove all image tags
    htmlString = htmlString.replace(/<img[^>]*>/g, "");

    // Remove all HTML tags except for text content
    htmlString = htmlString.replace(/<\/?[^>]+(>|$)/g, "");

    // Replace any instances of &nbsp; (non-breaking spaces) with a regular space
    htmlString = htmlString.replace(/&nbsp;/g, " ");

    // Trim leading and trailing spaces
    return htmlString.trim();
  }

  // Determine the slice length based on the blog index and screen size
  const getSliceLength = (index) => {
    if (isSmallScreen) {
      return 100; // Always slice to 100 words on small screens
    }
    return (index + 1) % 4 === 1 ? 300 : 100; // If 4n-3, slice to 250 characters, else 100
  };

  const ViewBlog = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <>
      {loading ? (
        <div
          className="loader"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
        </div>
      ) : (
        <main className="blogs-container">
          <div className="grid-container">
            {blogs.length === 0 ? (
              <h2
                style={{
                  minHeight: "50vh",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                No blogs found
              </h2>
            ) : (
              blogs.map((blog, index) => {
                // Determine the slice length based on screen size and grid position
                const sliceLength = getSliceLength(index);

                return (
                  <div
                    onClick={() => ViewBlog(blog._id)}
                    className="blog-grid-item"
                    key={blog._id}
                    data-aos="fade-up"
                  >
                    <div className="blog-content">
                      <h3>{blog.title}</h3>
                      <p>
                        {stripHtmlTags(blog.content).slice(0, sliceLength)}...
                      </p>
                    </div>
                    <img
                      // src={`https://backend-umber-chi-47.vercel.app/${blog.image}`}
                      src={blog.image}
                      alt={blog.title}
                    />
                  </div>
                );
              })
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default Blogs;
