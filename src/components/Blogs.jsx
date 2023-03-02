import Button from "react-bootstrap/Button";
import { useTable } from "react-table";
import React from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";

export default function Blogs({ blogs, setBlogs }) {
  const handleEdit = (event) => {
    // !Idea Required.
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    const titleOfBlogToRemove =
      event.target.parentElement.parentElement.children[1].innerText;

    await axios
      .post("/api/removeBlog", { title: titleOfBlogToRemove })
      .then((res) => {
        console.log(res.data);
      })
      .catch((event) => console.log(event));
    window.location.reload();
  };

  const data = React.useMemo(
    () =>
      blogs.map((blog, index) => {
        return {
          slno: index + 1,
          title: blog.title,
          description: blog.description,
          actions: (
            <>
              <Button onClick={(event) => handleEdit(event)} variant="info">
                Edit
              </Button> &nbsp; &nbsp;
              <Button onClick={(event) => handleDelete(event)} variant="danger">
                Remove
              </Button>
            </>
          ),
        };
      }),
    [blogs]
  );

  const columns = React.useMemo(
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
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Container fluid>
      <table {...getTableProps()} style={{ width: "60%", margin: "auto" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px #676bdc",
                    background: "#23272f",
                    color: "white",
                    fontWeight: "bold",
                    padding: '8px',
                    textAlign: 'center',
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
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        color: "white",
                        background: "#23272f",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}
