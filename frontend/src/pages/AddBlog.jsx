import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import LoginStatus from "../components/authentication/loginStatus";
import Swal from "sweetalert2";
import axios from "axios";

const AddBlog = () => {
  const [AuthorId, setAuthorId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await LoginStatus();
        setAuthorId(result.user._id);
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };

    fetchUser();
  }, [Location]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://backend-umber-chi-47.vercel.app/blog/categories"
        );
        setCategories(response.data || []);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch categories. Please try again later.",
        });
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && !["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid File Type",
        text: "Please upload a valid image (JPEG, JPG, PNG).",
      });
      return;
    }
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all the required fields.",
      });
      return;
    }

    if (!AuthorId) {
      Swal.fire({
        icon: "error",
        title: "Author Missing",
        text: "Author ID is required to create a blog.",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      await axios.post(
        `https://backend-umber-chi-47.vercel.app/blog/create/${AuthorId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Blog Created",
        text: "Your blog was created successfully!",
      });

      setTitle("");
      setContent("");
      setCategory("");
      setImage(null);
      navigate("/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          "Failed to create the blog. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="add-blog-section"
      style={{ width: "80%", margin: "0 auto", paddingTop: "20px" }}
    >
      <h2>Add Blog</h2>

      <label htmlFor="title">Title:</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        aria-label="Blog Title"
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
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        aria-label="Blog Category"
        disabled={categoriesLoading}
      >
        <option value="">Select a category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {categoriesLoading && <p>Loading categories...</p>}

      <label htmlFor="content">Content:</label>
      <ReactQuill
        value={content}
        onChange={(value) => setContent(value)}
        style={{
          height: "350px",
          background: "#f7f7f7",
          borderRadius: "4px",
          color: "black",
          marginBottom: "20px",
        }}
      />

      <label htmlFor="thumbnail">Thumbnail:</label>
      <input
        id="thumbnail"
        type="file"
        onChange={handleImageChange}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        aria-label="Blog Thumbnail"
      />

      <button
        className="create-blog-btn"
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Creating..." : "Create Blog"}
      </button>
    </div>
  );
};

export default AddBlog;
