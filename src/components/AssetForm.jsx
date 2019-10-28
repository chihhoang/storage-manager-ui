import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import FileUpload from "./FileUpload";

class AssetForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      roles: ["ROLE_USER"],
      activated: true
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    email: Joi.string()
      .required()
      .email()
      .label("Email")
  };

  doSubmit() {
    // call register API
    console.log("handle submit by calling register API");
  }

  render() {
    return (
      <div>
        <h2>Upload Asset</h2>
        <FileUpload />
      </div>
    );
  }
}

export default AssetForm;
