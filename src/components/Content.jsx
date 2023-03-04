import Blogs from "./Blogs"
import UpsertBlog from "./UpsertBlog"
import { useState, useEffect } from "react"
import axios from "axios"

const Content = () => {
  const [blogs, setBlogs] = useState([])
  const [selectedBlogDescription, setSelectedBlogDescription] = useState("")
  const [selectedBlogTitle, setSelectedBlogTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [isViewBlogsVisible, setIsViewBlogsVisible] = useState(true)
  const [selectedBlogRef, setSelectedBlogRef] = useState(0)

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get("/api/fetchBlogs")
      setBlogs(res.data)
      setLoading(true)
    }
    fetchBlogs()
  }, [])

  return (
    <>
      {isViewBlogsVisible ? (
        <Blogs
          blogs={blogs.sort((a, b) => b.created_at - a.created_at)}
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
    </>
  )
}

export default Content
