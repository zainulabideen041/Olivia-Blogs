import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './style.css'
import axios from "axios";

const ViewBlog = () => {
  const [blog, setBlog] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(
          `https://backend-umber-chi-47.vercel.app/blog/blog/${id}`
        );
        setBlog(response.data || {});
      } catch (error) {
        console.log(error);
      }
    };
    getBlog();
  }, [id]);
  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
        paddingTop: "20px",
        color: "black",
      }}
    >
      <h1 style={{ color: "black" }}>{blog.title}</h1>
      <div
        className="blog-content-view"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default ViewBlog;
