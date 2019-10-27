import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import * as UserService from "../services/UserService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    // call auth API
    UserService.authenticate(
      this.state.data.username,
      this.state.data.password
    );

    // this.props.history.push("/assets");

    console.log("handle submit");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", "Enter username")}
          {this.renderInput("password", "Password", "password", "Password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
