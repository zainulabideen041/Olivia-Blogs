import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const AddBlog = ({ AuthorId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const Navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  // const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleContentChange = (value) => setContent(value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          "https://backend-umber-chi-47.vercel.app/blog/categories"
        );
        setCategories(response.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    // Create FormData to send image and other data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        `https://backend-umber-chi-47.vercel.app/blog/create/${AuthorId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Blog Created!",
        text: "Your blog was created successfully.",
        confirmButtonText: "Okay",
      });
      setTitle("");
      setContent("");
      setCategory("");
      setImage(null);
      setSuccess(true);
      Navigate("/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response
          ? err.response.data.message
          : "There was an error creating the blog. Please try again.",
        confirmButtonText: "Okay",
      });
      console.error(err);
      setError("There was an error creating the blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="add-blog-section"
      style={{ width: "80%", margin: "0 auto", paddingTop: "20px" }}
    >
      <h2>Add Blog Here..</h2>

      {/* Blog Title */}
      <label htmlFor="">Title:</label>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter blog title"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat.id || cat.name} value={cat.name}>
            {cat}
          </option>
        ))}
      </select>

      <label htmlFor="">Content:</label>
      {/* React Quill Editor */}
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        style={{
          height: "350px",
          background: "#f7f7f7",
          borderRadius: "4px",
          color: "black",
          marginBottom: "60px",
        }}
      />
      <label htmlFor="">Thumbnail:</label>
      <input
        type="file"
        onChange={handleImageChange}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "15px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Blog created successfully!</p>}

      <button
        className="create-blog-btn"
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          marginBottom: "50px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Create Blog
      </button>
    </div>
  );
};

export default AddBlog;
