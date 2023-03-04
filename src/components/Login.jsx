import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const Login = ({ setIsAuthenticated }) => {
  const [data, setData] = useState({ username: "", password: "" })
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    console.log(process.env.REACT_APP_ADMIN_USERNAME)
    if (
      data.username == process.env.REACT_APP_ADMIN_USERNAME &&
      data.password == process.env.REACT_APP_ADMIN_USERNAME
    ) {
      setIsAuthenticated(true)
      navigate("/")
    }
  }
  function handleChange(e) {
    const newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)
  }
  return (
    <div>
      <Form
        className='d-flex justify-content-center align-items-center flex-column'
        onSubmit={e => handleSubmit(e)}
      >
        <Form.Group className='mb-3 mx-5' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            style={{
              backgroundColor: "#2e2e2e",
              color: "white",
              width: "200px",
            }}
            onChange={e => handleChange(e)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3 mx-5' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='text'
            style={{
              backgroundColor: "#2e2e2e",
              color: "white",
              width: "200px",
            }}
            onChange={e => handleChange(e)}
            required
          />
        </Form.Group>

        <Button variant='primary' type='submit' className='mx-5'>
          Login
        </Button>
      </Form>
    </div>
  )
}

export default Login
