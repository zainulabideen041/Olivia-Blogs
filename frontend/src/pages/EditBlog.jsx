import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://backend-umber-chi-47.vercel.app/blog/blog/${id}`
        );
        setTitle(response.data.title);
        setContent(response.data.content);
        setCategory(response.data.category);
        setLoading(false);
        setSuccess(true);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
    fetchBlog();
  }, [id]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleContentChange = (value) => setContent(value);

  const handleEdit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    console.log(image);

    try {
      const response = await axios.post(
        `https://backend-umber-chi-47.vercel.app/blog/update/${id}`,
        {
          title,
          content,
          category,
          image,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Blog Updated!",
        text: "Your blog was updated successfully.",
        confirmButtonText: "Okay",
      });
      setSuccess(true);
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response
          ? error.response.data.message
          : "There was an error updating the blog. Please try again.",
        confirmButtonText: "Okay",
      });

      setError("There was an error updating the blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", paddingTop: "20px" }}>
      <h1>Edit Your Blog</h1>

      {/* Blog Title */}
      <label htmlFor="">Title: </label>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter blog title"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "24px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <label htmlFor="">Category: </label>
      <input
        type="text"
        value={category}
        onChange={handleCategoryChange}
        placeholder="Enter Blog Category"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "24px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      <label htmlFor="">Content: </label>
      {/* React Quill Editor */}
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        style={{
          height: "350px",
          border: "1px solid #ccc",
          background: "#f7f7f7",
          borderRadius: "4px",
          color: "black",
          marginBottom: "60px",
        }}
      />

      <label htmlFor="">Thumbnail:</label>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "15px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {loading && <p style={{ color: "black" }}>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Blog Updated Successfully!</p>}

      <button
        className="create-blog-btn"
        onClick={handleEdit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          margin: "10px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default EditBlog;
