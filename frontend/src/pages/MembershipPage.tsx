import { Badge, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MembershipPage(){
    return(
        <div>
            <div>
            {/* <img src="../../images/membership.png" className="membership-image"></img> */}
            <div className="main-banner position-relative ">
              <img
                src="../../images/goldcard7.png"
                className="img-fluid rounded-3 membership-image"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <Link to={'/product/gold-card'}>
                  <h3>
                <Button className="offer-button">Buy Now</Button >
                </h3>
                </Link>
              </div>
              </div>
            
            {/* <img src="../../images/gold.png" className="membership-image"></img> */}
            
            </div>
        </div>
    )
}