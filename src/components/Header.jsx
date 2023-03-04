import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"

function Header() {
  return (
    <Navbar collapseOnSelect expand='lg' variant='dark'>
      <Container fluid className='justify-content-between'>
        <Navbar.Brand href='/'>
          <h2>
            <span className='mleft-10 cursive'>note</span>
            <span className='blue ml-2 cursive'>wurthy </span>
          </h2>
        </Navbar.Brand>
        <h4>Admin - Panel</h4>
      </Container>
    </Navbar>
  )
}

export default Header
