import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";

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
        <h2>REST Upload demo</h2>
        <form
          method="post"
          action="rest/demo/upload"
          enctype="multipart/form-data"
        >
          <input type="hidden" name="action" value="upload" />{" "}
          <label>Load your file:</label> <input type="file" name="attachment" />{" "}
          <br /> <input type="submit" value="Upload file" />
        </form>

        <form method="POST" action="rest/demo/download">
          File name: <input type="text" name="file" />
          <input type="submit" />
        </form>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", "Enter username")}
          {this.renderInput("password", "Password", "password", "Password")}
          {this.renderButton("Upload")}
        </form>
      </div>
    );
  }
}

export default AssetForm;
