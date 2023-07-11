import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { sampleProducts } from '../data.js'
import Countdown from 'react-countdown';



export default function Auction() {
  return (
    <div>
      <Container className="mt-3">
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
                  
                    
                

                  <Card.Text><div className='Bid-color'>Current Bid : <Countdown date={Date.now() + 10000} /></div></Card.Text>

                  <Button>Bid Now</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
