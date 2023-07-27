import { Badge, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MembershipPage(){
    return(
        <div>
            <Container>
            {/* <img src="../../images/membership.png" className="membership-image"></img> */}
            <div className="main-banner position-relative ">
              <img
                src="../../images/membership.png"
                className="img-fluid rounded-3 membership-image"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <Link to={'/membershiporder/'}>
                  <h3>
                <Badge bg="secondary">Buy Now</Badge>
                </h3>
                </Link>
              </div>
              </div>
            
            <img src="../../images/gold.png" className="membership-image"></img>
            
            </Container>
        </div>
    )
}