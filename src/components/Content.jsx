import Blogs from "./Blogs"
import UpsertBlog from "./UpsertBlog"
import { useState } from "react"

const Content = () => {
  const [selectedBlogDescription, setSelectedBlogDescription] = useState("")
  const [selectedBlogTitle, setSelectedBlogTitle] = useState("")
  const [isViewBlogsVisible, setIsViewBlogsVisible] = useState(true)
  const [selectedBlogRef, setSelectedBlogRef] = useState(0)

  return (
    <>
      {isViewBlogsVisible ? (
        <div>
          <Blogs
            setSelectedBlogRef={setSelectedBlogRef}
            setSelectedBlogTitle={setSelectedBlogTitle}
            setSelectedBlogDescription={setSelectedBlogDescription}
            setIsViewBlogsVisible={setIsViewBlogsVisible}
            isViewBlogsVisible={isViewBlogsVisible}
          />
        </div>
      ) : (
        <UpsertBlog
          blogRef={selectedBlogRef}
          blogTitle={selectedBlogTitle}
          blogDescription={selectedBlogDescription}
          setIsViewBlogsVisible={setIsViewBlogsVisible}
          isViewBlogsVisible={isViewBlogsVisible}
          setSelectedBlogRef={setSelectedBlogRef}
        />
      )}
    </>
  )
}

export default Content
