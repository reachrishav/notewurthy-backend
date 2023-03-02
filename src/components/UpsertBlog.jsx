import { useEffect, useState } from "react"
import axios from "axios"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const AddBlog = ({ blogRef, blogTitle, blogDescription }) => {
  const [data, setData] = useState({ title: "", description: "" })
  useEffect(() => {
    if (blogRef) setData({ title: blogTitle, description: blogDescription })
  }, [])
  async function handleAddSubmit(e) {
    e.preventDefault()
    await axios
      .post("/api/addBlog", {
        title: data.title,
        description: data.description,
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(e => console.log(e))
    window.location.reload()
  }

  async function handleEditSubmit(e) {
    e.preventDefault()
    await axios
      .post("/api/editBlog", {
        id: blogRef,
        title: data.title,
        description: data.description,
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(event => console.log(event))
    window.location.reload()
  }

  function handleChange(e) {
    const newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  return (
    <Form onSubmit={e => (blogRef ? handleEditSubmit(e) : handleAddSubmit(e))}>
      <Form.Group className='mb-3 mx-5' controlId='title'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          style={{ backgroundColor: "#3f4655", color: "white" }}
          onChange={e => handleChange(e)}
          defaultValue={blogRef ? blogTitle : ""}
        />
      </Form.Group>
      <Form.Group className='mb-3 mx-5' controlId='description'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          style={{ backgroundColor: "#3f4655", color: "white" }}
          as='textarea'
          rows={10}
          cols={10}
          defaultValue={blogRef ? blogDescription : ""}
          onChange={e => handleChange(e)}
        />
      </Form.Group>

      <Button variant='primary' type='submit' className='mx-5'>
        {blogRef ? "Update" : "Add"}
      </Button>
    </Form>
  )
}

export default AddBlog
