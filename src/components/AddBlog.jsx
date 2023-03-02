import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddBlog = () => {
  const [data, setData] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/addBlog", {
        title: data.title,
        description: data.description,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e));
    setData({ title: "", description: "" });
    window.location.reload();
  };

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group
        className="mb-3 mx-5"
        controlId="title"
      >
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          style={{ backgroundColor: "#3f4655", color: 'white' }}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3 mx-5" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          style={{ backgroundColor: "#3f4655", color: 'white' }}
          as="textarea"
          rows={5}
          cols={5}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mx-5">
        Add
      </Button>
    </Form>
  );
};

export default AddBlog;
