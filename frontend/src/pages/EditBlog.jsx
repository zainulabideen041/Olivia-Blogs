import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../components/axiosInstance";
import Swal from "sweetalert2";

const EditBlog = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await AxiosInstance.get("/blog/categories");
        setCategories(response.data || []);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch categories. Please try again later.",
        });
      }
    };

    const fetchBlog = async () => {
      try {
        const response = await AxiosInstance.get(`/blog/blog/${id}`);

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
    fetchCategories();
    fetchBlog();
  }, [id]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleContentChange = (value) => setContent(value);

  const handleEdit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      const response = await AxiosInstance.put(`/blog/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);

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
        text:
          error.response?.data?.message ||
          "There was an error updating the blog. Please try again.",
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
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        aria-label="Blog Category"
      >
        <option value="">Select a category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

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
