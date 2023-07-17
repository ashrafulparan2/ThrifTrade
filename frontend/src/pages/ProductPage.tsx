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
                  <strong>Touseeq Ijaz</strong>
                  <span>@touseeqijazweb</span>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, quaerat quis? Provident temporibus architecto
                asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam
                tenetur voluptates incidunt blanditiis sed atque cumque.
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
                  <strong>J.K Rowling</strong>
                  <span>@jkrowling</span>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, quaerat quis? Provident temporibus architecto
                asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam
                tenetur voluptates incidunt blanditiis sed atque cumque.
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
                  <strong>Harry Potter</strong>
                  <span>@DanielRedclief</span>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, quaerat quis? Provident temporibus architecto
                asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam
                tenetur voluptates incidunt blanditiis sed atque cumque.
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
                  <strong>Oliva</strong>
                  <span>@Olivaadward</span>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, quaerat quis? Provident temporibus architecto
                asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam
                tenetur voluptates incidunt blanditiis sed atque cumque.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
