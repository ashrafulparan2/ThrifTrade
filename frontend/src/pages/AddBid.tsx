import { Col, Row } from "react-bootstrap";
import { useGetProductQueries } from "../hooks/productHooks.js";
import LoadingBox from "../components/LoadingBox.js";
import MessageBox from "../components/MessageBox.js";
import { getError } from "../utils.js";
import { ApiError } from "../types/Apierror.js";
import ProductItem from "../components/ProductItem.js";
import BidItem from "../components/BidItem.js";
import apiClient from "../apiClient.js";

export default function AddBid() {
  const add_to_auction = async (slug: string) => {
    // console.log(slug);
    const data= await apiClient.post(`/api/auction/add_to_auction`, {
      product_slug: slug,
      deadline: Date.now() + 1000*60 * 60 * 24,
    });
    console.log(data);
  };
  const { data: products, isLoading, error } = useGetProductQueries()[0];
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <div>
      <Row>
        {products!.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <BidItem product={product} add_to_auction={add_to_auction} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
