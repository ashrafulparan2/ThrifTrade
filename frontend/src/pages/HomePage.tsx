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

// import required modules
import { Pagination } from 'swiper'

import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'
import ProductItem from '../components/ProductItem.js'
import { useGetProductQueries } from '../hooks/productHooks.js'
import { ApiError } from '../types/Apierror.js'
import { getError } from '../utils.js'
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

  const { data: products, isLoading, error } = useGetProductQueries()[0]
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>ThriftTrade</title>
      </Helmet>
      <Carousel className="carousel1">
        <Carousel.Item interval={1000}>
          <div className="item">
            <img
              id="t1"
              className="d-block w-100"
              src="../../images/newbanner1.jpg"
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
              src="../../images/newbanner2.jpg"
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
              src="../../images/banner5.jpg"
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
          {products!.map((product) => (
            <SwiperSlide>
              <ProductItem product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      <Container className="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img
                src="../../images/main-banner-1.jpg"
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
                  src="../../images/catbanner-01.jpg"
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
                  src="../../images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Apple Watch 7</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative mt-3">
                <img
                  src="../../images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative mt-3">
                <img
                  src="../../images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Airpods Max</h5>
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
                  <img src="../../images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../../images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../../images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../../images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../../images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../../images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../../images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../../images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
