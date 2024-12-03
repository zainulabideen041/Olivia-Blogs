import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { tailChase } from "ldrs";

tailChase.register();

const ViewBlog = () => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(
          `https://backend-umber-chi-47.vercel.app/blog/blog/${id}`
        );
        setBlog(response.data || {});
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getBlog();
  }, [id]);
  return (
    <>
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
      )}
    </>
  );
};

export default ViewBlog;
