import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./styles/MetricsPanel.css";
import { GetMetricsByMac } from "../http/metric";
import { withRouter } from "react-router-dom";

class MetricsPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metrics: []
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.loadMetrics(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadMetrics = () => {
    GetMetricsByMac()
      .then(metrics => {
        this.setState({ metrics: metrics.data });
      })
      .catch(err => {
        if (err.response.status == 401) {
          this.props.history.push("/");
        }
      });
  };

  componentWillMount() {
    this.loadMetrics();
  }

  getMetricsHtml() {
    let htmlMetrics = [];

    if (this.state.metrics.length == 0) {
      return (
        <Col>
          <h4>The device has no metrics</h4>
        </Col>
      );
    }

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

export default withRouter(MetricsPanel);
