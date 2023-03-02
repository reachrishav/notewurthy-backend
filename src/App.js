import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Blogs from "./components/Blogs";
import AddBlog from "./components/AddBlog";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [isViewBlogsVisible, setIsViewBlogsVisible] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogRef, setSelectedBlogRef] = useState(0)

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get("/api/fetchBlogs");
      setBlogs(res.data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="App">
      <Header
        setIsViewBlogsVisible={setIsViewBlogsVisible}
        isViewBlogsVisible={isViewBlogsVisible}
      />
      {isViewBlogsVisible ? (
        <Blogs blogs={blogs} setBlogs={setBlogs} setSelectedBlogRef={setSelectedBlogRef} setIsViewBlogsVisible={setIsViewBlogsVisible} />
      ) : (
        <AddBlog blogRef={selectedBlogRef}/>
      )}
      <Footer />
    </div>
  );
}
