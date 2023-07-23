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
import { ApiError } from "../types/Apierror.js";
import { CartItem } from "../types/Cart.js";

export default function BiddingPage() {
  const params = useParams();
  const { slug } = params;

  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo,
  } = state;

  const navigate = useNavigate();
  const [bidPrice, setBidPrice] = useState(0);

  const [deadline, setDeadline] = useState(0);
  const [maxBid, setMaxBid] = useState(0);
  const [maxBidUser, setMaxBidUser] = useState(null);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    apiClient.get(`/api/auction/get_bid_data/${slug}`).then((res) => {
      console.log(res.data.AuctionData);
      if (res.data.AuctionData) {
        setDeadline(res.data.AuctionData.deadline);
        setMaxBid(res.data.AuctionData.maxBid);
        setMaxBidUser(res.data.AuctionData.maxBidUser);
        setProductData(res.data.AuctionData.product);
        console.log(res.data.AuctionData.product);
      }
    });
  }, []);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      apiClient.get(`/api/auction/get_bid_data/${slug}`).then((res) => {
        setMaxBid(res.data.AuctionData.maxBid);
        setMaxBidUser(res.data.AuctionData.maxBidUser);
        console.log(res.data.AuctionData);
        if (
          !res.data.AuctionData ||
          res.data.AuctionData.deadline < Date.now()
        ) {
          clearInterval(interval);
        }
      });
    }, 1000);
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
      slug: slug,
    });
    console.log(data);

    toast.success("Bid placed successfully");
  };
  const addToCartHandler = () => {
    if (maxBid !== 0 && maxBidUser && maxBidUser["email"] === userInfo?.email) {
      alert("You won the bid. Please claim your product.");
      console.log(productData);
      const item = convertProductToCartItem(productData!);
      dispatch({
        type: "CART_ADD_ITEM",
        payload: { ...item },
      });
      return;
    }

  };
  const end_auction = async () => {
    console.log(slug);
    const end_auction_data = await apiClient.get(
      `/api/auction/end_auction/${slug}`
    );
    console.log(end_auction_data);
  };
  return (
    <div>
      {!productData ? (
        <LoadingBox />
      ) : (
        <div>
          <Row>
            <Col md={5}>
              <img
                className="large"
                src={productData["image"]}
                alt={productData["name"]}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{productData["name"]}</title>
                  </Helmet>
                  <h1>{productData["name"]}</h1>
                  <button
                    style={{
                      backgroundColor: "red",
                    }}
                    onClick={() => end_auction()}
                  >
                    End Auction
                  </button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={productData["rating"]}
                    numReviews={productData["numReviews"]}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Current Bid: ${productData["price"]}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description:
                  <p>{productData["description"]}</p>
                </ListGroup.Item>
              </ListGroup>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <Card.Text>
                      <div className="Bid-color">Current Bid : ${maxBid} </div>
                    </Card.Text>
                    <Card.Text>
                      <div className="Bid-color-time">
                        Time Left : <Countdown date={deadline} />
                      </div>
                    </Card.Text>
                    {productData["countInStock"] > 0 && (
                      <ListGroup.Item>
                        {(deadline >= Date.now() && (
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
                            {maxBid !== 0 &&
                              maxBidUser &&
                              maxBidUser["name"] +
                                " won the bid with " +
                                maxBid}
                          </p>
                        )}
                        <div className="d-grid">
                          {(deadline >= Date.now() && (
                            <Button onClick={placeBidHandler} variant="primary">
                              Place a Bid
                            </Button>
                          )) ||
                            (maxBidUser &&
                              userInfo?.email === maxBidUser["email"] && (
                                <Button
                                  onClick={addToCartHandler}
                                  variant="primary"
                                >
                                  Claim your product
                                </Button>
                              )) || <p>You lost the bid.</p>}
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
