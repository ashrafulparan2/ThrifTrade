import { PureComponent } from 'react'
import { Col, Row } from 'react-bootstrap'
import LoadingBox from '../../components/LoadingBox.js'
import MessageBox from '../../components/MessageBox.js'
import ProductItem from '../../components/ProductItem.js'
import { useGetProductQueries } from '../../hooks/productHooks.js'
import { ApiError } from '../../types/Apierror.js'
import { getError } from '../../utils.js'
import Filter from './Filter.js'



export default function Buy() {
  const { data: products, isLoading, error } = useGetProductQueries()[0]
    return isLoading ? (
      <LoadingBox />
    ) : error ? (
      <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
    ) : (
      <div>
        <Filter />

       <Row>
          {products!.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3}>
               <ProductItem product={product} />
            </Col>
          ))}
        </Row>
      </div>
    )
}

