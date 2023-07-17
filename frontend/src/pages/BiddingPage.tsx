import { useContext, useState } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Store } from '../Store.js'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'
import Rating from '../components/Rating.js'
import { useGetProductDetailsBySlugQuery } from '../hooks/productHooks.js'
import { convertProductToCartItem, getError } from '../utils.js'
import Countdown from 'react-countdown'

export default function BiddingPage() {
  const params = useParams()
  const { slug } = params
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!)
  const { state, dispatch } = useContext(Store)
  const { cart } = state

  const navigate = useNavigate()
  const [bidPrice, setBidPrice] = useState('')

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product!.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...convertProductToCartItem(product!), quantity },
    })
    toast.success('Product added to the cart', {
      autoClose: 1000,
    })
    navigate('/cart')
  }

  const placeBidHandler = () => {
    if (!bidPrice || Number(bidPrice) <= 0) {
      toast.warn('Please enter a valid bid price')
      return
    }
    // Perform the logic for placing a bid with the entered bid price
    // You can dispatch an action or make an API call here
    toast.success('Bid placed successfully')
    setBidPrice('')
  }

  return (
    <div>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : !product ? (
        <MessageBox variant="danger">Product Not Found</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={5}>
              <img className="large" src={product.image} alt={product.name} />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Current Bid: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description:
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                  <Card.Text>
                    <div className="Bid-color">
                      Current Bid : ${product.price}{' '}
                    </div>
                  </Card.Text>
                  <Card.Text>
                    <div className="Bid-color-time">
                      Time Left : <Countdown date={Date.now() + 10000000} />
                    </div>
                  </Card.Text>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Card>
                         
                          <input
                            type="number"
                            placeholder="Enter bid price"
                            value={bidPrice}
                            onChange={(e) => setBidPrice(e.target.value)}
                          />
                          
                        </Card>
                        <div className="d-grid">
                          <Button onClick={placeBidHandler} variant="primary">
                            Place a Bid
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}></Col>
          </Row>
        </div>
      )}
    </div>
  )
}
