import React, { Component } from "react";
import { Button, Card, Form } from "semantic-ui-react";
class Landing extends Component {
  state = { password: "", errorMessage: "" };

  inputHandler = e => {
    this.setState({ password: e.target.value });
  };

  submitHandler = () => {
    if (this.state.password === "melodictrail946") {
      localStorage.setItem("validated", true);
      this.props.history.push("/acs");
    } else {
      this.setState({ errorMessage: "This password is incorrect." });
    }
  };

  async componentDidMount() {
    const validated = await localStorage.getItem("validated");
    console.log(validated);
    if (validated) {
      this.props.history.push("/acs");
    }
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <Card style={{ padding: "50px" }}>
          {" "}
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around"
            }}
          >
            <Form.Field>
              <label style={{ fontSize: "1.2em" }}>Password</label>
              <input
                placeholder="password"
                name="password"
                value={this.state.password}
                onChange={e => this.inputHandler(e)}
              />
            </Form.Field>
            <Button color="green" type="submit" onClick={this.submitHandler}>
              Submit
            </Button>
            {this.state.errorMessage}
          </Form>
        </Card>
      </div>
    );
  }
}
export default Landing;
