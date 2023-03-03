import { useEffect, useState } from "react"
import axios from "axios"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const AddBlog = ({ blogRef, blogTitle, blogDescription }) => {
  const [data, setData] = useState({ title: "", description: "" })
  const [validated, setValidated] = useState(false)
  useEffect(() => {
    if (blogRef) setData({ title: blogTitle, description: blogDescription })
  }, [])
  async function handleAddSubmit(e) {
    // e.preventDefault()
    // const form = e.currentTarget
    // if (form.checkValidity() === false) {
    //   e.stopPropagation()
    // }
    // setValidated(true)
    // if (!validated) return

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
    // e.preventDefault()
    // const form = e.currentTarget
    // if (form.checkValidity() === false) {
    //   e.stopPropagation()
    // }
    // setValidated(true)
    // if (!validated) return

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
    <Form
      // noValidate
      // validated={validated}
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
  )
}

export default AddBlog
