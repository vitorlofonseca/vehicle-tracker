import React from "react";
import Metric from "../models/metric";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import "./styles/MetricsPanel.css";
import { GetMetricsByMac } from "../http/metric";

class MetricsPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metrics: []
    };
  }

  componentWillMount() {
    GetMetricsByMac().then(metrics => {
      this.setState({ metrics: metrics.data });
    });
  }

  getMetricsHtml() {
    let htmlMetrics = [];

    this.state.metrics.forEach(metric => {
      htmlMetrics.push(
        <Col key={metric.code}>
          <div className="metric-title">{metric.name}</div>
          <div className="metric-value">
            {metric.value} {metric.unit}
          </div>
        </Col>
      );
    });

    return htmlMetrics;
  }

  render() {
    let html = (
      <Container className="metrics-panel">
        <Row>
          <Col>
            <div className="metrics-panel_title">Metrics</div>
            <hr></hr>
          </Col>
        </Row>
        <div className="metrics-panel_content">
          <Row className="metrics-panel_line">{this.getMetricsHtml()}</Row>
        </div>
      </Container>
    );
    return html;
  }
}

export default MetricsPanel;
