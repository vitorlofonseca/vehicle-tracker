import React from "react";
import Indicator from "../models/indicator";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import "./styles/IndicatorsPanel.css";

function IndicatorsPanel() {
  return (
    <Container className="indicators-panel">
      <Row>
        <Col>
          <div className="indicators-panel_title">Indicators</div>
          <hr></hr>
        </Col>
      </Row>
      <div className="indicators-panel_content">
        <Row className="indicators-panel_line">
          <Col>
            <div className="indicator-title">Speed</div>
            <div className="indicator-value">83km/h</div>
          </Col>
          <Col>
            <div className="indicator-title">Revolutions</div>
            <div className="indicator-value">73 RPM</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="indicator-title">Fuel Level</div>
            <div className="indicator-value">84l</div>
          </Col>
          <Col>
            <div className="indicator-title">Temp</div>
            <div className="indicator-value">80ºC</div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default IndicatorsPanel;
