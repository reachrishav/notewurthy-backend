import { useEffect, useState } from "react"
import axios from "axios"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const UpsertBlog = ({
  blogRef,
  blogTitle,
  blogDescription,
  setIsViewBlogsVisible,
  isViewBlogsVisible,
  setSelectedBlogRef,
  setBlogs,
}) => {
  const [data, setData] = useState({ title: "", description: "" })
  useEffect(() => {
    if (blogRef) setData({ title: blogTitle, description: blogDescription })
  }, [blogRef, blogTitle, blogDescription])
  async function handleAddSubmit(e) {
    e.preventDefault()
    const config = {
      headers: {
        "access-token": process.env.REACT_APP_POST_TOKEN,
      },
    }
    await axios
      .post(
        "/api/addBlog",
        {
          title: data.title,
          description: data.description,
        },
        config
      )
      .then(() => {
        axios.get("/api/fetchBlogs").then(res => setBlogs(res.data))
        setIsViewBlogsVisible(true)
      })
      .catch(e => console.log(e))
  }

  async function handleEditSubmit(e) {
    e.preventDefault()
    const config = {
      headers: {
        "access-token": process.env.REACT_APP_POST_TOKEN,
      },
    }
    await axios
      .post(
        "/api/editBlog",
        {
          id: blogRef,
          title: data.title,
          description: data.description,
        },
        config
      )
      .then(() => {
        axios.get("/api/fetchBlogs").then(res => setBlogs(res.data))
        setIsViewBlogsVisible(true)
      })
      .catch(event => console.log(event))
  }

  function handleChange(e) {
    const newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  return (
    <>
      <Button
        className='back-home-btn'
        variant='primary'
        onClick={() => {
          setIsViewBlogsVisible(!isViewBlogsVisible)
          setSelectedBlogRef(0)
        }}
      >
        <i
          className='fa-solid fa-arrow-left'
          style={{ backgroundColor: "#676bdc", marginRight: "4px" }}
        ></i>
        Back to Home
      </Button>
      <Form
        onSubmit={e => (blogRef ? handleEditSubmit(e) : handleAddSubmit(e))}
      >
        <Form.Group className='mb-3 mx-5' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            style={{ backgroundColor: "#2e2e2e", color: "white" }}
            onChange={e => handleChange(e)}
            defaultValue={blogRef ? blogTitle : ""}
            required
            autoFocus
          />
          <Form.Control.Feedback type='invalid'>
            Please provide a title.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3 mx-5' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            style={{ backgroundColor: "#2e2e2e", color: "white" }}
            as='textarea'
            rows={10}
            cols={10}
            defaultValue={blogRef ? blogDescription : ""}
            onChange={e => handleChange(e)}
            required
          />
          <Form.Control.Feedback type='invalid'>
            Please provide a description.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant='primary' type='submit' className='mx-5'>
          {blogRef ? "Update" : "Add"}
        </Button>
      </Form>
    </>
  )
}

export default UpsertBlog
