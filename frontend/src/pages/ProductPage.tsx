import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'
import Rating from '../components/Rating.js'
import { useGetProductDetailsBySlugQuery } from '../hooks/productHooks.js'
// import { ApiError } from '../types/ApiError.js'
import { useContext } from 'react'
import { Store } from '../Store.js'
import { ApiError } from '../types/Apierror.js'
import { convertProductToCartItem, getError } from '../utils.js'



export default function ProductPage() {
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

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={5}>
          <img className="large" src={product.image} alt={product.name}></img>
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
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
      <Container mt-3>
        <Container mt-3 className="product-page-container">
          <Form>
            <Form.Group controlId="review">
              <Form.Label>Leave a Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                // value={review}
                // onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review here..."
              />
            </Form.Group>
            <Button type="submit" variant="dark">
              Submit Review
            </Button>
          </Form>
        </Container>
      </Container>

      <section id="testimonials">
        <div className="testimonial-heading">
          {/* <span>Comments</span> */}
          <h1>Reviews</h1>
        </div>
        <div className="testimonial-box-container">
          <div className="testimonial-box">
            <div className="box-top">
              <div className="profile">
                <div className="profile-img">
                  <img src="https://i.ibb.co/84C7kvg/image.png" alt="Profile" />
                </div>
                <div className="name-user">
                  <strong>Sajjad Hossain</strong>
                  <span>@sajjad</span>
                </div>
              </div>
              <div className="reviews">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
            </div>
            <div className="client-comment">
              <p>
              "I'm so glad I found this product! It has made a noticeable difference in my daily routine. The user-friendly interface and intuitive design make it a breeze to use. Plus, the results are remarkable. It's definitely worth the investment. Trust me, you won't regret getting your hands on this gem!"





              </p>
            </div>
          </div>
          {/* Repeat the above structure for other testimonial boxes */}
          {/* BOX-2 */}
          <div className="testimonial-box">
            <div className="box-top">
              <div className="profile">
                <div className="profile-img">
                  <img src="https://i.ibb.co/84C7kvg/image.png" alt="Profile" />
                </div>
                <div className="name-user">
                  <strong>Ashraful Islam</strong>
                  <span>@aashraful</span>
                </div>
              </div>
              <div className="reviews">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <div className="client-comment">
              <p>
              "I've tried several similar products before, but none of them come close to this one. The quality and durability are exceptional. It's evident that a lot of thought and effort went into designing this product. I've been using it extensively, and it hasn't let me down. A definite winner!"
              </p>
            </div>
          </div>
          {/* BOX-3 */}
          <div className="testimonial-box">
            <div className="box-top">
              <div className="profile">
                <div className="profile-img">
                  <img src="https://i.ibb.co/84C7kvg/image.png" alt="Profile" />
                </div>
                <div className="name-user">
                  <strong>Asim Foize</strong>
                  <span>@osim</span>
                </div>
              </div>
              <div className="reviews">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
            </div>
            <div className="client-comment">
              <p>
              "This product is simply fantastic! It's a game-changer for me. The features and functionality it offers are top-notch. I've been using it for a while now, and it has made my life so much easier. I can't imagine going back to my old ways. A must-have for everyone!"
              </p>
            </div>
          </div>
          {/* BOX-4 */}
          <div className="testimonial-box">
            <div className="box-top">
              <div className="profile">
                <div className="profile-img">
                  <img src="https://i.ibb.co/84C7kvg/image.png" alt="Profile" />
                </div>
                <div className="name-user">
                  <strong>Arpita </strong>
                  <span>@aarpita</span>
                </div>
              </div>
              <div className="reviews">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
            </div>
            <div className="client-comment">
              <p>
              "Amazing product! I'm thoroughly impressed with its performance and quality. It exceeded my expectations in every way. I highly recommend it to anyone looking for a reliable and efficient solution. You won't be disappointed!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
