import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './SellPage.css'; // Import the CSS file for styling

const SellPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [productPicture, setProductPicture] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
    console.log({
      name,
      address,
      mobileNo,
      productName,
      productQuantity,
      unitPrice,
      condition,
      productDetails,
      productPicture,
    });
  };

  return (
    <div className="container">
      <div className="sell-page">
        <h1>Sell</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="mobileNo">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              type="text"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productQuantity">
            <Form.Label>Product Quantity</Form.Label>
            <Form.Control
              type="text"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="unitPrice">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="text"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="condition">
            <Form.Label>Condition</Form.Label>
            <Form.Control
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productDetails">
            <Form.Label>Product Details</Form.Label>
            <Form.Control
              as="textarea"
              value={productDetails}
              onChange={(e) => setProductDetails(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productPicture">
            <Form.Label>Product Picture</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setProductPicture(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
            {productPicture && <img src={productPicture} alt="Product" className="product-picture" />}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SellPage;
