import { SetStateAction, useContext, useEffect, useState } from 'react'
import {
  Badge,
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Store } from './Store.js'
import Footer from './components/footer/Footer.js'
import { sampleProducts } from './data.js'

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])
  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }
  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }
  const [value, setValue] = useState('')
  const onChange = (event: { target: { value: SetStateAction<string> } }) => {
    setValue(event.target.value)
  }
  const onSearch = (searchTerm) => {
    setValue(searchTerm)
    //api.search

    window.location.href = '/product/' + searchTerm
  }

  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>
              <Link to={`/`} className="no-underline">
                ThriftTrade
              </Link>
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/buy">Buy</Nav.Link>
              <Nav.Link href="/sell">Sell</Nav.Link>
              <Nav.Link href="/offers">Offers</Nav.Link>
              <Nav.Link href="/auction">Auction</Nav.Link>


              {/* <Nav.Link href="/categories">Categories</Nav.Link> */}
              <NavDropdown
                title="Categories"
                id="basic-nav-dropdown"
                className="dropdown-menu-start"
              >
                {/* { <LinkContainer to="/orderhistory">
                 <NavDropdown.Item>Order History</NavDropdown.Item>
               </LinkContainer> } */}

                <Link className="dropdown-item" to="/phone">
                  Phones
                </Link>
                <Link className="dropdown-item" to="/laptop">
                  Laptop
                </Link>

                <Link className="dropdown-item" to="/watch">
                  Watches
                </Link>
                <Link className="dropdown-item" to="/airbuds">
                  Airbuds
                </Link>
              </NavDropdown>
              <Nav.Link className="membershipcolor" href="/membership">Gold Card</Nav.Link>

              <Nav.Link href="/about_us">About Us</Nav.Link>
            </Nav>
            <Form className="d-flex option_choice">
              <Form.Control
                type="search"
                value={value}
                onChange={onChange}
                placeholder="Search"
                className="me-2 search-visibility"
                aria-label="Search"
              />
              {/* let slugname={""}; */}
              <div className="dropdown dropdown_search">
                {sampleProducts
                  .filter((item) => {
                    const searchTerm = value.toLowerCase()
                    const fullname = item.name.toLowerCase()

                    return (
                      searchTerm &&
                      fullname.startsWith(searchTerm) &&
                      fullname !== searchTerm
                    )
                  })
                  .map((item) => (
                    <div
                      onClick={() => onSearch(item.slug)}
                      className="dropdown-row"
                      key={item.slug}
                    >
                      <Button className="search_option_item">
                        {item.name}
                      </Button>
                    </div>
                  ))}
              </div>
              {/* console.log("jf");console.log(slugname); */}
              {/* <Link to={`/product/${slugname}`}> */}{' '}
              <Button variant="dark" onClick={() => onSearch(value)}>
                Search
              </Button>
              {/* </Link> */}
            </Form>
          </Container>

          <Nav>
            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown
                title={userInfo.name}
                id="basic-nav-dropdown"
                className="dropdown-menu-start"
              >
                {/* { <LinkContainer to="/orderhistory">
                 <NavDropdown.Item>Order History</NavDropdown.Item>
               </LinkContainer> } */}

                <Link className="dropdown-item" to="/orderhistory">
                  Order History
                </Link>
                <Link className="dropdown-item" to="/profile">
                  Update Profile
                </Link>

                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
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
