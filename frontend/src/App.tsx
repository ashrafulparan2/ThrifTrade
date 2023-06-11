import { Button,Badge, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer.js'
import { useContext, useEffect } from 'react'
import { Store } from './Store.js'
import { LinkContainer } from 'react-router-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  const {
     
    state: { mode, cart },
    dispatch,
  } = useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])
  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }

  return (
   

    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand >
              <Link to={`/`} className="no-underline">
                ThriftTrade
              </Link>
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/buy">Buy</Nav.Link>
              <Nav.Link href="/sell">Sell</Nav.Link>
              <Nav.Link href="/offers">Offers</Nav.Link>
              <Nav.Link href="/auction">Auction</Nav.Link>

              <Nav.Link href="/categories">Categories</Nav.Link>

   
              <Nav.Link href="/about_us">About Us</Nav.Link>
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
          <Link to="/cart" className="nav-link">
              Cart
          
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)
                 
                  }
                 
                </Badge>
              )}
            </Link>
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

      <Footer />
    </div>
  )
}

export default App
