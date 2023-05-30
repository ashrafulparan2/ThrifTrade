import { Carousel, Container } from 'react-bootstrap'

import '@splidejs/react-splide/css'
import { Link } from 'react-router-dom'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import 'swiper/components/pagination/pagination.min.css'
import 'swiper/swiper.min.css'
import './styles.css'

import { sampleProducts } from '../data.js'

// import required modules
import { Pagination } from 'swiper'

import HomepageSell from './HomepageSell.js'

export default function HomePage() {
  const swiperOptions = {
    loop: true,
    autoplay: {
      delay: 200, // Change this value to adjust autoplay speed (in milliseconds)
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
  }
  return (
    <div>
      <Carousel className="carousel1">
        <Carousel.Item interval={1000}>
          <div className="item">
            <img
              id="t1"
              className="d-block w-100"
              src="https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg"
              alt="First slide"
            />
          </div>
          <Carousel.Caption>
            <h3>Need Cash?</h3>
            <p>Sell your products</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <div className="item">
            <img
              id="t1"
              className="d-block w-100"
              src="https://m.media-amazon.com/images/I/61qa3132IFL._SX3000_.jpg"
              alt="First slide"
            />
          </div>

          <Carousel.Caption>
            <h3>ThriftTrade is one click away</h3>
            <p>Hurry Up!</p>
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
            <h3>Buy your gadgets</h3>
            <p>
              At low price!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className="mt-3">
        <h2>Buy</h2>
        <Swiper
          {...swiperOptions}
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {sampleProducts.map((product) => (
            <SwiperSlide>
              <div className="productCard">
                <Link to={'/product/' + product.slug}>
                  <img
                    className="productImage"
                    src={product.image}
                    alt={product.name}
                    // className="product-image"
                  />
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">${product.price}</p>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
      <HomepageSell />
      
    </div>
  )
}
