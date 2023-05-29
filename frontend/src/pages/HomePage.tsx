import { Col, Row, Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { sampleProducts } from "../data.js";


import {
  FaShoppingCart,
  FaRegBookmark,
  FaStar,
  FaFireAlt,
} from "react-icons/fa";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function HomePage() {
  return (
    <div>
      <Carousel className="carousel1">
        <Carousel.Item interval={1000}>
          <div className="item">
            <img
              id="t1"
              className="d-block w-100"
              src="../../public/images/banner4.jpg"
              alt="First slide"
            />
          </div>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <div className="item">
            <img
              id="t1"
              className="d-block w-100"
              src="../../public/images/banner2.jpg"
              alt="First slide"
            />
          </div>

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <div className="item">
            <img
              id="t1"
              className="d-block w-100"
              src="../../public/images/banner5.jpg"
              alt="First slide"
            />
          </div>

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className="mt-3">
        <h3>Buy</h3>
        <Row>
          <Splide options={ { rewind: true } }>
         
          {sampleProducts.map((product) => (
            
           
            <Col key={product.slug} sm={6} md={4} lg={3}>
              <SplideSlide>
              <Link to={"/product/" + product.slug}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
               
                <h2 className="product-name-font">{product.name}</h2>
                <p>${product.price}</p>
              </Link>
              </SplideSlide>
            </Col>
     
            
            
          ))}
         
          
          </Splide>
        </Row>
      </Container>
      <Container className="mt-3">
        <h3>Sell</h3>
        <Row>
          <Splide options={ { rewind: true } }>
         
          {sampleProducts.map((product) => (
            
           
            <Col key={product.slug} sm={6} md={4} lg={3}>
              <SplideSlide>
              <Link to={"/product/" + product.slug}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
               
                <h2 className="product-name-font">{product.name}</h2>
                <p>${product.price}</p>
              </Link>
              </SplideSlide>
            </Col>
     
            
            
          ))}
         
          
          </Splide>
        </Row>
      </Container>

      
      
    </div>
  );
}
