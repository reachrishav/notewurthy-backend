import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"

function Header({
  setIsViewBlogsVisible,
  isViewBlogsVisible,
  setSelectedBlogRef,
}) {
  return (
    <Navbar collapseOnSelect expand='lg' variant='dark'>
      <Container fluid className='justify-content-between'>
        <Navbar.Brand href='/'>Notewurthy</Navbar.Brand>
        <Button
          variant='primary'
          onClick={() => {
            setIsViewBlogsVisible(!isViewBlogsVisible)
            setSelectedBlogRef(0)
          }}
        >
          {isViewBlogsVisible ? "Add Blog" : "View Blogs"}
        </Button>
      </Container>
    </Navbar>
  )
}

export default Header
