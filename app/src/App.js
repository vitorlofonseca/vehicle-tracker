import React from "react";
import logo from "./logo.png";
import "./App.css";
import MetricsPanel from "./screens/MetricsPanel";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { GetMetricsByMac } from "./http/metric";

class App extends React.Component {
  render() {
    return (
      <Container className="mw-100 mh-100 w-100 h-100 container_app">
        <Row>
          <Col md={2} className="h-100 left_bar">
            <div className="application-logo">
              <img src={logo} className="logo_left_bar" alt="logo" />
            </div>
            <div className="application-logo">Car Tracker</div>
          </Col>
          <Col md={9}>
            <Row>
              <MetricsPanel></MetricsPanel>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
