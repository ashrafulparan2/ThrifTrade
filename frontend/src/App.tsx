import { Container, Nav, Navbar, Form ,Button} from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Footer from './components/footer/Footer.js'
import Anime from './components/animation/Anime.js'
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
              <Nav.Link href="/offers">Offers</Nav.Link>
              <Nav.Link href="/auction">Auction</Nav.Link>
              <Nav.Link href="/catergories">Catergories</Nav.Link>
            </Nav>
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="dark">Search</Button>
          </Form>
          </Container>
          
          <Nav>
            <a href="/cart" className="nav-link">
              Cart
            </a>
            <a href="/login" className="nav-link">
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
      
        <Footer/>
      
    </div>
  );
}

export default App;
