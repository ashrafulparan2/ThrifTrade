
import { Col, Row } from 'react-bootstrap'
import { useGetProductQueries } from '../hooks/productHooks.js'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'
import { getError } from '../utils.js'
import { ApiError } from '../types/Apierror.js'
import ProductItem from '../components/ProductItem.js'
import BidItem from '../components/BidItem.js'




export default function AddBid() {
  const { data: products, isLoading, error } = useGetProductQueries()[0]
    return isLoading ? (
      <LoadingBox />
    ) : error ? (
      <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
    ) : (
      <div>

       <Row>
          {products!.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3}>
               <BidItem product={product} />
            </Col>
          ))}
        </Row>
      </div>
    )
}

