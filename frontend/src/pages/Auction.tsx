import { Button, Card, Carousel, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { sampleProducts } from '../data.js'
import Countdown from 'react-countdown';




export default function Auction() {
  return (
    
    <div>
      <Carousel className="carousel2">
        <Carousel.Item interval={1000}>
          <div className="item">
            <img
              id="t1"
              className="d-block w-100"
              src="../../images/auction3.jpg"
              alt="First slide"
            />
          </div>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <div className="item">
            <img
              id="t1"
              className="d-block w-100"
              src="../../images/auction4.jpg"
              alt="First slide"
            />
          </div>

          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <div className="item">
            <img
              id="t1"
              className="d-block w-100"
              src="../../images/auction5.jpg"
              alt="First slide"
            />
          </div>

          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container className="mt-3">
      <h3 mt-3>Bid On These Featured Auctions!</h3>
        <Row>
          {sampleProducts.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3}>
              <Card>
                {/* <Link to={`/product/${product.slug}`}> */}
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />
                {/* </Link> */}
                <Card.Body>
                  
                    <Card.Title className="product-name">
                      {product.name}
                    </Card.Title>
                
                    <Card.Text><div className='Bid-color'>Current Bid : ${product.price} </div></Card.Text>
                  <Card.Text><div className='Bid-color-time'>Time Left : <Countdown date={Date.now() + 10000000} /></div></Card.Text>

                  <Button className='auction-button-color'>Submit A Bid</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
