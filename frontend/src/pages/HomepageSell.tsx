import { Container } from 'react-bootstrap'

import axios from 'axios'
import { useEffect, useReducer } from 'react'

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

import { sampleSell } from '../dataSell.js'

// import required modules
import { Pagination } from 'swiper'
import { ApiError } from '../types/Apierror.js'
import { Product } from '../types/Product.js'
import { getError } from '../utils.js'
import ProductItemSell from '../components/ProductItemSell.js'

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

export default function HomepageSell() {
  {
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
          const result = await axios.get('/api/productsell')
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err as ApiError) })
        }
      }
      fetchData()
    }, [])
    return (
      <div>
        <Container className="mt-3">
          <h2>Sell</h2>
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
                 <ProductItemSell product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
    )
  }
}
