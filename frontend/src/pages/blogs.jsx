import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import blogImg from "../assets/img3.jpg";
import axiosInstance from "../components/axiosInstance";
import "aos/dist/aos.css";
import AOS from "aos";
import "./style.css";

import { tailChase } from "ldrs";

tailChase.register();

const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const Navigate = useNavigate();
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

  function stripHtmlTags(htmlString) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  const ViewBlog = (id) => {
    Navigate(`/blog/${id}`);
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
              blogs.map((blog) => (
                <div
                  onClick={() => ViewBlog(blog._id)}
                  className="blog-grid-item"
                  key={blog._id}
                  data-aos="fade-up"
                >
                  <div className="blog-content">
                    <h3>{blog.title}</h3>
                    <p>{stripHtmlTags(blog.content.slice(0, 100))}</p>
                  </div>
                  <img
                    // src={`https://backend-umber-chi-47.vercel.app/${blog.image}`}
                    src={blogImg}
                    alt={blog.title}
                  />
                </div>
              ))
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default Blogs;
