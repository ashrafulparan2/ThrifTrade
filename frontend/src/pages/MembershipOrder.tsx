import { useContext, useEffect } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CheckoutSteps from '../components/CheckoutSteps.js'
import LoadingBox from '../components/LoadingBox.js'
import { useCreateOrderMutation } from '../hooks/orderHooks.js'
import { Store } from '../Store.js'
import { ApiError } from '../types/ApiError.js'
import { getError } from '../utils.js'

export default function MembershipOrder() {
  const navigate = useNavigate()

  const { state, dispatch } = useContext(Store)
  const { cart, userInfo } = state

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100 // 123.2345 => 123.23

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  )
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10)
  cart.taxPrice = round2(0.15 * cart.itemsPrice)
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

  const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation()

  const placeOrderHandler = async () => {
    try {
      const data = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
      console.log(data)
      console.log(data.message)
      dispatch({ type: 'CART_CLEAR' })
      localStorage.removeItem('cartItems')
      console.log(data.order._id);
      navigate(`/membershiporder}`)
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart, navigate])

  return (
    <div>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {cart.paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>$100</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>$0</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>$0</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>$100</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0 || isLoading}
                    >
                      Place Order
                    </Button>
                    {isLoading && <LoadingBox></LoadingBox>}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}