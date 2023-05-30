import { PureComponent } from 'react'
import { Container } from 'react-bootstrap'

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
          {sampleSell.map((product) => (
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
      </div>
    )
  }
}
