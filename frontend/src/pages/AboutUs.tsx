import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import styled from 'styled-components'

const StyledAboutUsPage = styled.div`
  background-color: #1f1f1f;
  color: #ffffff;
  padding: 20px;
`

const Section = styled.section`
  margin-bottom: 40px;

  h2 {
    color: #ffffff;
    margin-bottom: 20px;
    text-align: center;
  }

  p {
    color: #ffffff;
    margin-bottom: 10px;
  }
`

const FeedbackTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #333333;
  color: #ffffff;
  margin-bottom: 10px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #333333;
  color: #ffffff;
  margin-bottom: 10px;
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  color: #1f1f1f;
  border: none;
  cursor: pointer;
`

const SocialIcons = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-right: 10px;
    color: #ffffff;
    font-size: 20px;
  }
`

const StarRatingIcons = styled.div`
  display: flex;
  align-items: center;

  .star {
    color: #ffd700;
    font-size: 24px;
    cursor: pointer;
  }

  .empty-star {
    color: #ffffff;
    font-size: 24px;
    cursor: pointer;
  }
`

const TeamMembers = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;

  .team-member {
    width: calc(33.33% - 20px);
    margin-bottom: 20px;
    text-align: center;
  }

  img {
    width: 100%;
    max-width: 200px;
    height: auto;
    border-radius: 50%;
    margin-bottom: 10px;
  }
`

const AboutUs = () => {
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState(0)

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleRating = (index) => {
    setRating(index + 1)
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log('Feedback:', feedback)
    console.log('Email:', email)
  }

  const renderStarRatingIcons = () => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <AiFillStar
            className="star"
            key={i}
            onClick={() => handleRating(i)}
          />
        )
      } else {
        stars.push(
          <AiOutlineStar
            className="empty-star"
            key={i}
            onClick={() => handleRating(i)}
          />
        )
      }
    }
    return stars
  }

  return (
    <StyledAboutUsPage>
      <Section id="about-us">
      <div className="about-us">
        <h1>About Us</h1>
        <Row>
          <Col sm={12} md={4}>
            <div className="card">
              <div className="card-image">
                <img
                  src="https://st.depositphotos.com/1092019/4611/i/450/depositphotos_46114905-stock-photo-principles-on-green-direction-arrow.jpg"
                  alt="Image 1"
                />
              </div>
              <div className="card-content">
                <h2>Our Principle</h2>
                <p>
                  ThrifTrade is guided by four principles: customer obsession
                  rather than competitor focus, passion for invention,
                  commitment to operational excellence, and long-term thinking.
                  ThrifTrade strives to be Earth’s most customer-centric
                  company, Earth’s best employer, and Earth’s safest place to
                  work. Customer reviews, 1-Click shopping, personalized
                  recommendations, Prime, Fulfillment by ThrifTrade, AWS, Kindle
                  Direct Publishing, Kindle, Career Choice, Fire tablets, Fire
                  TV, ThrifTrade Echo, Alexa, Just Walk Out technology,
                  ThrifTrade Studios, and The Climate Pledge are some of the
                  things pioneered by ThrifTrade.
                </p>
                <a href="#" className="card-link">
                  Learn More
                </a>
              </div>
            </div>
          </Col>
          <Col sm={12} md={4}>
            <div className="card">
              <div className="card-image">
                <img
                  src="https://t4.ftcdn.net/jpg/00/96/54/53/360_F_96545306_cX6N4Fv2TTVRMKahA3aoCvxlUOGm2KkV.jpg"
                  alt="Image 1"
                />
              </div>
              <div className="card-content">
                <h2>Our Mission</h2>
                <p>
                  ThrifTrade's mission statement and vision statement influence
                  the multinational technology and e-commerce business toward
                  long-term growth and success. This success is attributed to
                  stringent measures to ensure that the vision and mission
                  statements are fulfilled. In theory, the corporate vision
                  statement provides organizational direction toward a desired
                  future condition of the business, while the corporate mission
                  statement presents the business purpose and goals that guide
                  strategic management in the company.
                </p>
                <a href="#" className="card-link">
                  Learn More
                </a>
              </div>
            </div>
          </Col>
          <Col sm={12} md={4}>
            <div className="card">
              <div className="card-image">
                <img
                  src="https://online.up.ac.za/wp-content/uploads/2022/03/UP-Different-public-policy-1500x630.jpeg"
                  alt="Image 1"
                />
              </div>
              <div className="card-content">
                <h2>Public Policy</h2>
                <p>
                  At ThrifTrade, we have a duty to create a positive impact on
                  the world around us. We’re in the position of being a global
                  thought leader and we work hard every day to earn mutual
                  respect from our customers and partners. Our Public Policy
                  team advocates on behalf of the company and works across all
                  levels of society, from the public sector to the community.
                  We’re driven by our pledge to champion our customers and
                  protect them from risk, online or offline. Whether campaigning
                  for tougher data privacy laws or raising awareness of global
                  issues, we’re setting the bar high.
                </p>
                <a href="#" className="card-link">
                  Learn More
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      </Section>

      <Section id="google-map">
        <div className="container">
          <h2>Visit Us</h2>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14748.499277037552!2d91.9710592!3d22.4619433!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad2fca34ae5549%3A0x35c88a37b3e90e97!2sChittagong%20University%20of%20Engineering%20and%20Technology%20(CUET)!5e0!3m2!1sen!2sbd!4v1689664968791!5m2!1sen!2sbd"
            width="1300"
            height="450"
            
            loading="lazy"
          ></iframe>
          <p>Chittagong, Bangladesh</p>
        </div>
      </Section>

      <Section id="feedback">
        <div className="container">
          <h2>Feedback</h2>
          <FeedbackTextarea
            placeholder="Enter your feedback"
            value={feedback}
            onChange={handleFeedbackChange}
          />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          <Button onClick={handleSubmit}>Send</Button>
        </div>
      </Section>

      <Section id="social-media">
        <div className="container">
          <h2>Connect with Us</h2>
          <SocialIcons>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </SocialIcons>
        </div>
      </Section>

      <Section id="meet-our-team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <TeamMembers>
            <div className="team-member">
              <img src="../../images/paran.png" alt="Team Member 1" />
              <h3>Ashraful Islam</h3>
              <p>Full Stack Devoloper</p>
            </div>
            <div className="team-member">
              <img src="../../images/shawon.png" alt="Team Member 2" />
              <h3>Sajjad Hossain</h3>
              <p>Full Stack Devoloper</p>
            </div>
            <div className="team-member">
              <img src="../../images/aiimon.png" alt="Team Member 3" />
              <h3>Asim Foiz Aimon</h3>
              <p>Full Stack Devoloper</p>
            </div>
          </TeamMembers>
        </div>
      </Section>

      <Section id="star-rating">
        <div className="container">
          <h2>Rate Us</h2>
          <StarRatingIcons>{renderStarRatingIcons()}</StarRatingIcons>
        </div>
      </Section>
    </StyledAboutUsPage>
  )
}

export default AboutUs
