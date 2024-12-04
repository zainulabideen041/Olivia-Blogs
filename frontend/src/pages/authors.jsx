import React, { useEffect, useState } from "react";
import AuthorPlaceholder from "../assets/author.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { tailChase } from "ldrs";

tailChase.register();

const Authors = () => {
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAuthors = async () => {
      try {
        const response = await axios.get(
          "https://backend-umber-chi-47.vercel.app/blog/authors"
        );
        setAuthors(response.data.Authors || []);
        setLoading(false);
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
    <>
      {loading ? (
        <div
          className="loader"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
        </div>
      ) : (
        <main className="authors-page">
          <div className="blog-cards">
            {authors.length === 0 ? (
              <h2
                style={{
                  minHeight: "50vh",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                No Authors found
              </h2>
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
                    <button className="author-blog-btn" onClick={() => ViewAuthorBlogs(author._id)}>
                      View Blogs
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default Authors;
