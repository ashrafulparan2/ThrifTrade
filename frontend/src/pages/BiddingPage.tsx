import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store.js";
import LoadingBox from "../components/LoadingBox.js";
import MessageBox from "../components/MessageBox.js";
import Rating from "../components/Rating.js";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks.js";
import { convertProductToCartItem, getError } from "../utils.js";
import Countdown from "react-countdown";
import apiClient from "../apiClient.js";

export default function BiddingPage() {
  const params = useParams();
  const { slug } = params;
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const navigate = useNavigate();
  const [bidPrice, setBidPrice] = useState(0);
  const [deadLine, setDeadLine] = useState(0);
  const [maxBidPrice, setMaxBidPrice] = useState(0);
  const [bidData, setBidData] = useState({
    deadline: 0,
    maxBid: 0,
    maxBidUser: null,
  });
  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product!.countInStock < quantity) {
      toast.warn("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...convertProductToCartItem(product!), quantity },
    });
    toast.success("Product added to the cart", {
      autoClose: 1000,
    });
    navigate("/cart");
  };

  // useEffect(() => {

  // },[])

  useEffect(() => {
    apiClient.get(`/api/auction/get_bid_data/${slug}`).then((res) => {
      console.log(res.data);
      if (res.data.deadline) {
        setDeadLine(res.data.deadline);
      }
    });
    //Implementing the setInterval method
    const interval = setInterval(() => {
      apiClient.get(`/api/auction/get_bid_data/${slug}`).then((res) => {
        // console.log(res.data);
        if (res.data.maxBid) {
          setMaxBidPrice(res.data.maxBid);
        }
        // console.log(res.data.deadline, Date.now());
        if (res.data.deadline < Date.now()) {
          setBidData(res.data);
          clearInterval(interval);
        }
      });

      // clearInterval(interval);
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, []);

  const placeBidHandler = async () => {
    if (!bidPrice || Number(bidPrice) <= 0) {
      toast.warn("Please enter a valid bid price");
      return;
    }
    // Perform the logic for placing a bid with the entered bid price
    // You can dispatch an action or make an API call here
    const data = await apiClient.post("/api/auction/make_bid", {
      bidPrice: bidPrice,
      slug: product!.slug,
      user: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")!)
        : null,
    });
    console.log(data);
    // const data = {
    //   bidPrice: bidPrice,
    //   productId: product!.slug,
    //   user:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')!):null
    // }
    // const url='127.0.0.1:4000/api/auction/make_bid';
    // const response = await fetch(url, {
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   headers: {
    //     "Content-Type": "application/json",
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   redirect: "follow", // manual, *follow, error
    //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   body: JSON.stringify(data), // body data type must match "Content-Type" header
    // });
    toast.success("Bid placed successfully");
    // setBidPrice('')
  };

  return (
    <div>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : !product ? (
        <MessageBox variant="danger">Product Not Found</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={5}>
              <img className="large" src={product.image} alt={product.name} />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Current Bid: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description:
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <Card.Text>
                      <div className="Bid-color">
                        Current Bid : ${maxBidPrice}{" "}
                      </div>
                    </Card.Text>
                    <Card.Text>
                      <div className="Bid-color-time">
                        Time Left :{" "}
                        <Countdown date={Date.now() - Date.now() + deadLine} />
                      </div>
                    </Card.Text>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        {(deadLine >= Date.now() && (
                          <Card>
                            <input
                              type="number"
                              placeholder="Enter bid price"
                              value={bidPrice}
                              onChange={(e) => setBidPrice(e.target.value)}
                            />
                          </Card>
                        )) || (
                          <p>
                            Dead Line is over.{" \n"}
                            {bidData.maxBidUser && bidData.maxBidUser['name']} won the bid with ${bidData.maxBid}
                          </p>
                        )}
                        <div className="d-grid">
                          {(deadLine >= Date.now() && (
                            <Button onClick={placeBidHandler} variant="primary">
                              Place a Bid
                            </Button>
                          )) || (
                            <Button onClick={placeBidHandler} variant="primary">
                              Claim your product
                            </Button>
                          )}
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}></Col>
          </Row>
        </div>
      )}
    </div>
  );
}
