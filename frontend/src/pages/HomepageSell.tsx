import { Container } from 'react-bootstrap'

import '@splidejs/react-splide/css'

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
import ProductItemSell from '../components/ProductItemSell.js'
import { useGetProductQueries } from '../hooks/productHooks.js'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'
import { ApiError } from '../types/Apierror.js'
import { getError } from '../utils.js'

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

    const { data: productsell, isLoading, error } = useGetProductQueries()[1]

    return isLoading ? (
      <LoadingBox />
    ) : error ? (
      <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
    ) : (
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
            {productsell!.map((product) => (
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
