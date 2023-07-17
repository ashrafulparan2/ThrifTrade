import { Col, Row } from 'react-bootstrap'

import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'
import { useGetProductQueries } from '../hooks/productHooks.js'
import { ApiError } from '../types/Apierror.js'
import { getError } from '../utils.js'
import OfferItem from './OfferItem.js'

export default function OfferPage() {
  const { data: products, isLoading, error } = useGetProductQueries()[0]
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <div className="container">
      <h1>Ongoing Sales!</h1>

      <Row>
        {products!.filter((item) => {
                    
                    const cat = item.category
                    // console.log(cat)

                    return (
                        cat==="Phone"
                    )
                  })!.map((product) => (
          <Col key={product.slug} sm={12} md={12} lg={12}>
            <OfferItem product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
