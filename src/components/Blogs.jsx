import Button from "react-bootstrap/Button";
import {
  useFilters,
  useTable,
  useAsyncDebounce,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { useMemo, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Spinner from "../assets/rolling-transparent.svg";

export default function Blogs({
  setSelectedBlogRef,
  setSelectedBlogTitle,
  setSelectedBlogDescription,
  setIsViewBlogsVisible,
  isViewBlogsVisible,
}) {
  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 200);

    return (
      <>
        <div
          style={{
            margin: "auto",
            textAlign: "center",
          }}
        >
          <div class="input-group mb-3 w-50 m-auto">
            <input
              id="search-field"
              type="text"
              class="form-control"
              placeholder={`Search in ${count} records...`}
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={(e) => {
                const val = document.getElementById("search-field").value;
                setValue(val);
                onChange(val);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </>
    );
  }

  const [modalShow, setModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const handleModalShow = () => setModalShow(true);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get("/api/fetchBlogs");
      setBlogs(res.data);
      setLoading(true);
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        "access-token": process.env.REACT_APP_POST_TOKEN,
      },
    };
    await axios
      .post("/api/removeBlog", { id: selectedId }, config)
      .then(() => {
        setModalShow(false);
        axios.get("/api/fetchBlogs").then((res) => setBlogs(res.data));
      })
      .catch((event) => console.log(event));
  };

  const data = useMemo(
    () =>
      blogs
        .sort((a, b) => b.created_at - a.created_at)
        .map((blog, index) => {
          return {
            slno: index + 1,
            title: blog.title,
            description: `${blog.description
              .split(" ")
              .slice(0, 25)
              .join(" ")}${
              blog.description.split(" ").length > 25 ? "..." : ""
            }`,
            actions: (
              <div className="action-buttons">
                <Button
                  onClick={(event) => {
                    setSelectedBlogRef(blog.id);
                    setSelectedBlogTitle(blog.title);
                    setSelectedBlogDescription(blog.description);
                    setIsViewBlogsVisible(false);
                  }}
                  variant="info"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    setSelectedId(blog.id);
                    handleModalShow();
                  }}
                  variant="danger"
                >
                  Remove
                </Button>
              </div>
            ),
          };
        }),
    [blogs, setIsViewBlogsVisible, setSelectedBlogRef]
  );

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "slno",
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    state,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({ columns, data, initialState: { pageSize: 5 } }, useFilters, useGlobalFilter, usePagination);

  return (
    <>
      {loading ? (
        <>
          <Button
            className="add-btn"
            variant="primary"
            onClick={() => {
              setIsViewBlogsVisible(!isViewBlogsVisible);
              setSelectedBlogRef(0);
            }}
          >
            {isViewBlogsVisible ? "Add Blog" : "View Blogs"}
          </Button>
          <Container fluid>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            <table
              {...getTableProps()}
              style={{
                width: "80%",
                margin: "auto",
                borderCollapse: "separate",
              }}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        style={{
                          borderBottom: "solid 3px #676bdc",
                          background: "#212124",
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
                {page.map((row) => {
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
                              background: "#413e39",
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
          <div className="pagination mx-auto">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} type="button" class="btn btn-light">{'<<'}</button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage} type="button" class="btn btn-light">{'<'}</button>
            <button onClick={() => nextPage()} disabled={!canNextPage} type="button" class="btn btn-light">{'>'}</button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} type="button" class="btn btn-light">{'>>'}</button>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className="form-select" aria-label="Default select example"
              id="pagination-select"
            >
              {[5, 10, 15, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <img src={Spinner} alt="" className="spinner-animation" />
      )}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the blog?</Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#374151" }}>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={(event) => handleDelete(event)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
