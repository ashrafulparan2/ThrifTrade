import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../types/Product.js";
import Rating from "./Rating.js";
import { convertProductToCartItem } from "../utils.js";
import { Store } from "../Store.js";
import { useContext } from "react";
import { CartItem } from "../types/Cart.js";
import { toast } from "react-toastify";





function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    // console.log();
    if (product.countInStock < quantity) {
      alert("Sorry. Product is out of stock");
      return;
    }
    // console.log(quantity);
    //  dispatch({
    //   type:"CART_ADD_ITEM",
    //   payload:{...item}
    //  })
    console.log(state);
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
    toast.success("Product added to the cart",{
      autoClose: 1000,
    })
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link className="product_name_class" to={`/product/${product.slug}`}>
          <Card.Title className="product-name">{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
