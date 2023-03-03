import Button from "react-bootstrap/Button"
import { useTable } from "react-table"
import { useMemo, useState } from "react"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import axios from "axios"
import Spinner from "../assets/rolling-spinner.svg"

export default function Blogs({
  blogs,
  setSelectedBlogRef,
  setSelectedBlogTitle,
  setSelectedBlogDescription,
  setIsViewBlogsVisible,
  loading,
}) {
  const [modalShow, setModalShow] = useState(false)
  const [selectedId, setSelectedId] = useState(0)
  const handleModalShow = () => setModalShow(true)

  const handleDelete = async event => {
    event.preventDefault()
    await axios
      .post("/api/removeBlog", { id: selectedId })
      .then(res => {
        console.log(res.data)
      })
      .catch(event => console.log(event))
    window.location.reload()
  }

  const data = useMemo(
    () =>
      blogs.map((blog, index) => {
        return {
          slno: index + 1,
          title: blog.title,
          description:
            blog.description.split(" ").slice(0, 25).join(" ") + "...",
          actions: (
            <div className='action-buttons'>
              <Button
                onClick={event => {
                  setSelectedBlogRef(blog.id)
                  setSelectedBlogTitle(blog.title)
                  setSelectedBlogDescription(blog.description)
                  setIsViewBlogsVisible(false)
                }}
                variant='info'
                className='edit-btn'
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  setSelectedId(blog.id)
                  handleModalShow()
                }}
                variant='danger'
              >
                Remove
              </Button>
            </div>
          ),
        }
      }),
    [blogs, setIsViewBlogsVisible, setSelectedBlogRef]
  )

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "slno", // accessor is the "key" in the data
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  return (
    <>
      {loading ? (
        <Container fluid>
          <table {...getTableProps()} style={{ width: "80%", margin: "auto" }}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: "solid 3px #676bdc",
                        background: "#1f2937",
                        color: "white",
                        fontWeight: "bold",
                        padding: "8px",
                        textAlign: "center",
                        border: "solid 1px gray",
                      }}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)

                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: "10px",
                            border: "solid 1px gray",
                            color: "white",
                            background: "#374151",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Container>
      ) : (
        <img src={Spinner} alt='' className='spinner-animation' />
      )}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the blog?</Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#374151" }}>
          <Button variant='secondary' onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button variant='danger' onClick={event => handleDelete(event)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
