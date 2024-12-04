import React, { useEffect, useState } from "react";
import LoginStatus from "./components/authentication/loginStatus";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Profile from "./components/Profile";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/dashboard";
import Modal from "react-bootstrap/Modal";
import ViewBlog from "./pages/ViewBlog";
import Home from "./pages/home";
import Blogs from "./pages/blogs";
import Authors from "./pages/authors";
import AddBlog from "./pages/AddBlog";
import EditBlogs from "./pages/EditBlog";
import "./App.css";

const App = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [authorId, setAuthorId] = useState(null);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const Location = useLocation();

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await LoginStatus();
        if (result.loggedIn) {
          setLoggedin(true);
          if (loggedin) {
            setAuthorId(result.user._id);
          }
        } else {
          setLoggedin(false);
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };

    fetchUser();
  }, [Location]);

  const OpenLoginModal = () => {
    setLoginModal(true);
  };
  const CloseModal = () => {
    setRegisterModal(false);
    setLoginModal(false);
    setProfileModal(false);
  };
  const OpenRegisterModal = () => {
    setRegisterModal(true);
  };
  const OpenProfileModal = () => {
    setProfileModal(true);
  };

  return (
    <>
      <div className="navigation">
        <Navbar
          isScrolled={isScrolled}
          LoginModal={OpenLoginModal}
          RegisterModal={OpenRegisterModal}
          ProfileModal={OpenProfileModal}
        />
      </div>
      {loggedin ? (
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/create-blog" element={<AddBlog />} />
          <Route path="/edit-blog/:id" element={<EditBlogs />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<ViewBlog />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/dashboard" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <footer>
        <Footer LoginModal={OpenLoginModal} RegisterModal={OpenRegisterModal} />
      </footer>
      {/* MODAL FOR ACCOUNT LOGIN  */}
      <Modal
        show={loginModal}
        onHide={CloseModal}
        keyboard={true}
        size="xl"
        fullscreen={true}
        animation={true}
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#555" }}>
            Login to your Account
          </Modal.Title>
        </Modal.Header>
        <Login closeModal={CloseModal} />
      </Modal>
      {/* MODAL FOR REGISTER ACCOUNT  */}
      <Modal
        show={registerModal}
        onHide={CloseModal}
        keyboard={true}
        size="xl"
        fullscreen={true}
        animation={true}
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#555" }}>
            Register Account Here
          </Modal.Title>
        </Modal.Header>
        <Register closeModal={CloseModal} />
      </Modal>
      {/* MODAL FOR AUTHOR PROFILE */}
      <Modal
        show={profileModal}
        onHide={CloseModal}
        keyboard={true}
        size="xl"
        animation={true}
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#555" }}>
            Register Account Here
          </Modal.Title>
        </Modal.Header>
        <Profile closeModal={CloseModal} />
      </Modal>
    </>
  );
};

export default App;
