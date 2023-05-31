import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Lottie from "lottie-react";
import animationData from "./aniim.json";
import animationDat from "./aniim2.json";
import { Row, Col } from "react-bootstrap";

class Anime extends PureComponent {
  render() {
    return (
      <div className="min-h-screen flex items ju">
        <div>
          <Row>
            <Col>
              <Lottie
                className=" d-lg-block d-md-block d-sm-none d-none"
                animationData={animationData}
              />
            </Col>
            <Col>
              <Lottie
                className=" d-lg-block d-md-block d-sm-none d-none"
                animationDat={animationDat}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Anime;
