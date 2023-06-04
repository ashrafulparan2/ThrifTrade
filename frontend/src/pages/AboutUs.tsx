import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";

const StyledAboutUsPage = styled.div`
  background-color: #1f1f1f;
  color: #ffffff;
  padding: 20px;
`;

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
`;

const FeedbackTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #333333;
  color: #ffffff;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #333333;
  color: #ffffff;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  color: #1f1f1f;
  border: none;
  cursor: pointer;
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-right: 10px;
    color: #ffffff;
    font-size: 20px;
  }
`;

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
`;

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
`;

const AboutUs = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRating = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Feedback:", feedback);
    console.log("Email:", email);
  };

  const renderStarRatingIcons = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <AiFillStar
            className="star"
            key={i}
            onClick={() => handleRating(i)}
          />
        );
      } else {
        stars.push(
          <AiOutlineStar
            className="empty-star"
            key={i}
            onClick={() => handleRating(i)}
          />
        );
      }
    }
    return stars;
  };

  return (
    <StyledAboutUsPage>
      <Section id="about-us">
        <div className="container">
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            hendrerit metus at dui fringilla, eget faucibus dui tempus. Sed
            suscipit ligula sed nunc tincidunt, sed pharetra elit fringilla.
            Phasellus posuere est turpis, ac placerat est consectetur sed.
          </p>
        </div>
      </Section>

      <Section id="google-map">
        <div className="container">
          <h2>Visit Us</h2>
          <div style={{ height: "400px", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "YOUR_GOOGLE_MAPS_API_KEY" }}
              defaultCenter={{ lat: 22.3569, lng: 91.7832 }} // Chittagong coordinates
              defaultZoom={12}
            />
          </div>
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
              <img src="team-member1.jpg" alt="Team Member 1" />
              <h3>John Doe</h3>
              <p>CEO</p>
            </div>
            <div className="team-member">
              <img src="team-member2.jpg" alt="Team Member 2" />
              <h3>Jane Smith</h3>
              <p>CTO</p>
            </div>
            <div className="team-member">
              <img src="team-member3.jpg" alt="Team Member 3" />
              <h3>Michael Johnson</h3>
              <p>Marketing Manager</p>
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
  );
};

export default AboutUs;
