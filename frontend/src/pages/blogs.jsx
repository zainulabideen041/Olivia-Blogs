import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import axios from "axios";
import AOS from "aos";
import "./style.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const Navigate = useNavigate();
  const location = useLocation();
  const authorId = location.state?.authorId; // Get authorId from state

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get(
          "https://backend-umber-chi-47.vercel.app/blog/display"
        );
        let allBlogs = response.data || [];
        if (authorId) {
          // Filter blogs by authorId if provided
          allBlogs = allBlogs.filter((blog) => blog.authorId === authorId);
        }
        setBlogs(allBlogs);
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
    <main className="blogs-container">
      <div className="grid-container">
        {blogs.length === 0 ? (
          <h2>No blogs found</h2>
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
                <p>{stripHtmlTags(blog.content.slice(0, 50))}</p>
              </div>
              <img
                src={`https://backend-umber-chi-47.vercel.app/${blog.image}`}
                alt={blog.title}
              />
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Blogs;
