import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import * as AuthService from "../services/AuthService";

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
    const { username, password } = this.state.data;

    try {
      const { data: response } = await AuthService.authenticate(
        username,
        password
      );

      localStorage.setItem("idToken", response.idToken);

      this.props.history.push("/assets");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        alert("Invalid username and password");
      }
    }

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
