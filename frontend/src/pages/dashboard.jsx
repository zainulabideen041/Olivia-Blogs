import React, { useEffect, useState } from "react";
import LoginStatus from "../components/authentication/loginStatus";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import blogImg from "../assets/img3.jpg";
import Swal from "sweetalert2";
import axios from "axios";
import "./style.css";
import { tailChase } from "ldrs";

tailChase.register();

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [authorId, setAuthorId] = useState("");
  const [blogs, setBlogs] = useState([]);

  const Navigate = useNavigate();

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
  }, []);

  useEffect(() => {
    if (authorId) {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get(
            `https://backend-umber-chi-47.vercel.app/blog/author/blogs/${authorId}`
          );
          setBlogs(response.data);
          setLoading(false);
        } catch (error) {
          console.log("Error fetching blogs:", error);
        }
      };

      fetchBlogs();
    }
  }, [authorId]);

  function stripHtmlTags(htmlString) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://backend-umber-chi-47.vercel.app/blog/delete/${id}`
        );

        Swal.fire({
          title: "Blog Deleted!",
          text: "The selected blog has been successfully deleted.",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Update the blog list in state to remove the deleted blog
        setBlogs(blogs.filter((b) => b._id !== id));
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while deleting the blog.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleEditBlog = (id) => {
    Navigate(`/edit-blog/${id}`);
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
        <div className="author-dashboard">
          <div className="nav">
            <h2>Your Blogs</h2>
            <Link to="/create-blog">
              <button className="create-blog-btn">Create New Blog</button>
            </Link>
          </div>
          {blogs.length === 0 ? (
            <div>You don't have any Blogs</div>
          ) : (
            <table className="blogs-cards">
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>
                      <img src={blogImg} alt={"Blog Thumbnail"} />
                    </td>
                    <td>{blog.title}</td>
                    <td>{stripHtmlTags(blog.content).slice(0, 50)}...</td>
                    <td>{blog.category}</td>
                    <td>
                      {new Date(blog.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      <CiEdit
                        onClick={() => handleEditBlog(blog._id)}
                        className="action-icons edit-icon"
                      />
                      <CiTrash
                        onClick={() => handleDelete(blog._id)}
                        className="action-icons delete-icon"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
