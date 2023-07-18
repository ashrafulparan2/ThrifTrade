import { Product } from '../types/Product.js'
// import Rating from "./Rating.js";
import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Store } from '../Store.js'
import { CartItem } from '../types/Cart.js'
import { convertProductToCartItem } from "../utils.js"

export default function OfferItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    // console.log();
    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock')
      return
    }
    // console.log(quantity);
    //  dispatch({
    //   type:"CART_ADD_ITEM",
    //   payload:{...item}
    //  })
    console.log(state)
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
    toast.success('Product added to the cart', {
      autoClose: 1000,
    })
  }

  return (
    <div className="offer">
      <div className="offer-image">
        <img src={product.image} alt="Offer 1" className="offer-image-size" />
        <span className="offer-badge">10% off</span>
      </div>
      <div className="offer-details">
        <h2 className="offer-title">{product.name}</h2>
        <p className="offer-description">3 months used</p>
        <p className="offer-price-strike">
          <s>${Math.floor(product.price*1.1)}</s>
        </p>
        <p className="offer-price">${product.price}</p>
        {product.countInStock === 0 ? (
    <Button variant="light" disabled>
      Out of stock
    </Button>
  ) : (
    <Button className="offer-button"
      onClick={() => addToCartHandler(convertProductToCartItem(product))}
    >
      Add to cart
    </Button>
  )}
      </div>
    </div>
  )
}
