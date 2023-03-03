import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Blogs from "./components/Blogs";
import UpsertBlog from "./components/UpsertBlog";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [isViewBlogsVisible, setIsViewBlogsVisible] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogRef, setSelectedBlogRef] = useState(0)
  const [selectedBlogDescription, setSelectedBlogDescription] = useState('')
  const [selectedBlogTitle, setSelectedBlogTitle] = useState('')
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get("/api/fetchBlogs");
      setBlogs(res.data);
      setLoading(true)
    };
    fetchBlogs();
  }, []);

  return (
    <div className="App">
      <Header
        setIsViewBlogsVisible={setIsViewBlogsVisible}
        isViewBlogsVisible={isViewBlogsVisible}
        setSelectedBlogRef={setSelectedBlogRef}
      />
      {isViewBlogsVisible ? (
        <Blogs blogs={blogs.sort((a,b) => b.created_at - a.created_at)} 
          setBlogs={setBlogs} 
          setSelectedBlogRef={setSelectedBlogRef} 
          setSelectedBlogTitle={setSelectedBlogTitle} 
          setSelectedBlogDescription={setSelectedBlogDescription} 
          setIsViewBlogsVisible={setIsViewBlogsVisible} 
          loading={loading}
        />
      ) : (
        <UpsertBlog 
          blogRef={selectedBlogRef} 
          blogTitle={selectedBlogTitle} 
          blogDescription={selectedBlogDescription}
        />
      )}
      <Footer />
    </div>
  );
}
