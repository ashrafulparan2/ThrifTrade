import { Button, Carousel, Container } from 'react-bootstrap'

import Marquee from 'react-fast-marquee'

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
            <p>At low price!</p>
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

      <Container className="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img
                src="../../public/images/main-banner-1.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link to={'/product/'}>
                  <Button className="button-color">BUY NOW</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src="../../public/images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Best Sake</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="../../public/images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="../../public/images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="../../public/images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <HomepageSell />

      <Container className="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="../../public/images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../../public/images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../../public/images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../../public/images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../../public/images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../../public/images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../../public/images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../../public/images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
