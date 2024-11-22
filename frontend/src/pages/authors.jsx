import React, { useEffect, useState } from "react";
import AuthorPlaceholder from "../assets/author.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAuthors = async () => {
      try {
        const response = await axios.get("https://backend-umber-chi-47.vercel.app/blog/authors");
        setAuthors(response.data.Authors || []);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    getAuthors();
  }, []);

  const ViewAuthorBlogs = (authorId) => {
    navigate("/blogs", { state: { authorId } }); // Pass authorId via state
  };

  return (
    <main className="authors-page">
      <h1>All Authors</h1>
      <div className="blog-cards">
        {authors.length === 0 ? (
          <div>No Authors found</div>
        ) : (
          authors.map((author) => (
            <div data-aos="fade-up" className="card" key={author._id}>
              <img
                src={author.profileImage || AuthorPlaceholder}
                alt={author.username || "Author"}
              />
              <div className="card-content author-card-content">
                <h3>{author.username}</h3>
                <span className="card-content-date">
                  Total Blogs: {author.totalBlogs}
                </span>
                <button onClick={() => ViewAuthorBlogs(author._id)}>
                  View Blogs
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Authors;
