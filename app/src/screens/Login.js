import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { sha256 } from "js-sha256";
import "./styles/Login.css";
import { Auth } from "../http/auth";
import backgroundCar from "./styles/images/background.jpg";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      macDevice: "",
      password: "",
      error: ""
    };
  }

  encryptPassword(password) {
    return sha256(password);
  }

  componentWillMount() {
    this.auth(true);
  }

  validateForm() {
    return this.state.macDevice.length > 0 && this.state.password.length > 0;
  }

  setMacAddress(newValue) {
    this.setState({ macDevice: newValue });
  }

  setPassword(newValue) {
    this.setState({ password: newValue });
  }

  handleSubmit() {
    localStorage.setItem("deviceMac", this.state.macDevice);
    localStorage.setItem("password", this.encryptPassword(this.state.password));
    this.auth(false);
  }

  auth(firstAuth) {
    Auth()
      .then(res => {
        this.props.history.push("/metrics");
      })
      .catch(err => {
        if (err.response.status == 401 && !firstAuth) {
          this.setState({ error: err.response.data });
        } else {
          console.log("Error :: " + JSON.stringify(err.response));
        }
      });
  }

  render() {
    return (
      <div
        style={{
          background: "black",
          overflow: "hidden",
          "min-height": "100vh",
          "max-height": "100vh"
        }}
      >
        <div className="Login">
          <div className="login_application-label">Car Tracker</div>
          <form>
            <FormGroup controlId="macDevice">
              <FormLabel>MAC Device</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.macDevice}
                onChange={e => this.setMacAddress(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormLabel>Password</FormLabel>
              <FormControl
                value={this.state.password}
                onChange={e => this.setPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            <Button
              block
              disabled={!this.validateForm()}
              type="button"
              onClick={() => this.handleSubmit()}
            >
              Login
            </Button>
            <div className="errorDiv">{this.state.error}</div>
          </form>
        </div>
        <div className="divImageCar">
          <img src={backgroundCar} alt="backgroundCar" className="imageCar" />
        </div>
      </div>
    );
  }
}

export default Login;
