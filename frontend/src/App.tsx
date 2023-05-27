import { Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>ThriftTrade</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="/buy">Buy</Nav.Link>
            <Nav.Link href="/sell">Sell</Nav.Link>
          </Nav>
          </Container>
          <Nav>
            <a href="/cart" className="nav-link">
              Cart
            </a>
            <a href="/signin" className="nav-link">
              Sign In
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        {/* <Container> */}
          <Outlet />
        {/* </Container> */}
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>


    
  
  )
}

export default App
