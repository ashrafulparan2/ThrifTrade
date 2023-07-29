import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useNavigate } from 'react-router-dom'
import './SellPage.css' // Import the CSS file for styling

const districts = [
  'Dhaka',
  'Chittagong',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
]

const upazillas = {
  Dhaka: ['Mirpur', 'Gulshan', 'Uttara', 'Mohammadpur'],
  Chittagong: ['Chandgaon', 'Halishahar', 'Pahartali', 'Agrabad'],
  Rajshahi: ['Boalia', 'Durgapur', 'Paba', 'Godagari'],
  Khulna: ['Sonadanga', 'Doulatpur', 'Khalishpur', 'Khan Jahan Ali'],
  Barisal: ['Bakerganj', 'Banaripara', 'Muladi', 'Babuganj'],
  Sylhet: ['Sadar', 'South Surma', 'Beanibazar', 'Biswanath'],
  Rangpur: ['Pirgachha', 'Badarganj', 'Kurigram', 'Lalmonirhat'],
  Mymensingh: ['Bhaluka', 'Trishal', 'Muktagacha', 'Fulbaria'],
}

const SellPage = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [productName, setProductName] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  const [unitPrice, setUnitPrice] = useState('')
  const [condition, setCondition] = useState('')
  const [productDetails, setProductDetails] = useState('')
  const [productPicture, setProductPicture] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedUpazilla, setSelectedUpazilla] = useState('')

  const navigate = useNavigate()

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistrict(event.target.value)
  }

  const handleUpazillaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedUpazilla(event.target.value)
  }

  // const submitHandler=()=>{
  //   window.location.href = '/sellconfirm/'
  // }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission here
    console.log({
      name,
      district: selectedDistrict,
      upazilla: selectedUpazilla,
    })
    console.log({
      name,
      address,
      phoneNumber,
      productName,
      productQuantity,
      unitPrice,
      condition,
      productDetails,
      productPicture,
    })
    navigate('/sellconfirm')
  }

  const upazillasForSelectedDistrict = selectedDistrict
    ? upazillas[selectedDistrict]
    : []

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
              required
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Row>
              <Col sm={6}>
                <Form.Control
                  as="select"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  required
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col sm={6}>
                <Form.Control
                  as="select"
                  value={selectedUpazilla}
                  onChange={handleUpazillaChange}
                  required
                >
                  <option value="">Select Upazilla</option>
                  {upazillasForSelectedDistrict.map((upazilla) => (
                    <option key={upazilla} value={upazilla}>
                      {upazilla}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <PhoneInput
              international
              defaultCountry="BD"
              value={phoneNumber}
              onChange={setPhoneNumber}
              required
            />
          </Form.Group>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="productQuantity">
            <Form.Label>Product Quantity</Form.Label>
            <Form.Control
              type="text"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="unitPrice">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="text"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="condition">
            <Form.Label>Condition</Form.Label>
            <Form.Control
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="productDetails">
            <Form.Label>Product Details</Form.Label>
            <Form.Control
              as="textarea"
              value={productDetails}
              onChange={(e) => setProductDetails(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="productPicture">
            <Form.Label>Product Picture</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setProductPicture(URL.createObjectURL(e.target.files[0]))
                }
              }}
              required
            />
            {productPicture && (
              <img
                src={productPicture}
                alt="Product"
                className="product-picture"
              />
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SellPage
