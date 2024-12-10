import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../components/axiosInstance";
import "react-quill/dist/quill.snow.css";
import Cloudinary from "../utils/cloudinary";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // State to hold the existing image URL
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
        setImageUrl(response.data.image); // Set the existing image URL
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

  const handleEdit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // If a new image is selected, upload it to Cloudinary; otherwise, use the existing image URL
    let imageUrlToUse = imageUrl;

    if (image) {
      // If a new image is selected, upload it to Cloudinary
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", Cloudinary.upload_preset);
      data.append("cloud_name", Cloudinary.cloud_name);

      const cloudinaryResponse = await fetch(Cloudinary.api, {
        method: "POST",
        body: data,
      }).then((res) => res.json());

      if (!cloudinaryResponse.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      imageUrlToUse = cloudinaryResponse.secure_url; // Use the new image URL
    }

    const values = {
      title,
      content,
      category,
      image: imageUrlToUse, // Use the image URL (either from Cloudinary or fetched)
    };

    try {
      await AxiosInstance.put(`/blog/update/${id}`, values);

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
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "15px",
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
          fontSize: "13px",
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
        onChange={(newValue) => setContent(newValue)}
        style={{
          height: "350px",
          border: "1px solid #ccc",
          background: "#f7f7f7",
          borderRadius: "4px",
          color: "black",
          marginBottom: "60px",
        }}
      />

      <div className="thumbnail-edit" style={{ marginTop: "70px" }}>
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
        {imageUrl && !image && (
          <img
            src={imageUrl}
            alt="Current Thumbnail"
            style={{ width: "100px", marginTop: "10px" }}
          />
        )}
      </div>

      {loading && <p style={{ color: "black" }}>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Blog Updated Successfully!</p>}

      <button
        className="create-blog-btn"
        onClick={handleEdit}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#4CAF50",
          color: "white",
          margin: "10px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Edit
      </button>
      <button
        style={{
          padding: "10px 20px",
          color: "white",
          border: "none",
          borderRadius: "4px",
          marginBottom: "20px",
          marginLeft: "20px",
        }}
        onClick={() => navigate("/dashboard")}
      >
        Back
      </button>
    </div>
  );
};

export default EditBlog;
