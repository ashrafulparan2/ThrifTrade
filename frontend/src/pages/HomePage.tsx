import { Button, Carousel, Container } from 'react-bootstrap'

import axios from 'axios'
import { useEffect, useReducer } from 'react'
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

import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'
import { ApiError } from '../types/Apierror.js'
import { Product } from '../types/Product.js'
import { getError } from '../utils.js'
import HomepageSell from './HomepageSell.js'
import ProductItem from '../components/ProductItem.js'
import { Helmet } from 'react-helmet-async'

type State = {
  products: Product[]
  loading: boolean
  error: string
}

type Action =
  | { type: 'FETCH_REQUEST' }
  | {
      type: 'FETCH_SUCCESS'
      payload: Product[]
    }
  | { type: 'FETCH_FAIL'; payload: string }

const initialState: State = {
  products: [],
  loading: true,
  error: '',
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

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

  const [{ loading, error, products }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState)
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get('/api/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err as ApiError) })
      }
    }
    fetchData()
  }, [])
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
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
          {products.map((product) => (
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
