import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewBlog = () => {
  const [blog, setBlog] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/blog/blog/${id}`
        );
        setBlog(response.data || {});
      } catch (error) {
        console.log(error);
      }
    };
    getBlog();
  }, [id]);
  return (
    <div style={{ width: "80%", margin: "0 auto", paddingTop: "20px" }}>
      <h1>{blog.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: blog.content }} // Set the blog content as HTML
        style={{
          marginTop: "20px",
          fontSize: "16px",
          color: "black",
          lineHeight: "1.6",
        }}
      />
    </div>
  );
};

export default ViewBlog;
