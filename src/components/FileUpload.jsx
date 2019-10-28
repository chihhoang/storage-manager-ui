import React, { Component } from "react";
import { post } from "axios";
import { endPoint } from "../config.json";

class FileUpload extends Component {
  state = {
    file: null,
    description: ""
  };

  onFormSubmit = e => {
    e.preventDefault();

    this.fileUpload(this.state.file).then(response => {
      console.log(response.data);
    });
  };

  onChange = e => {
    this.setState({ file: e.target.files[0] });
  };

  onTextChange = ({ currentTarget: input }) => {
    const state = { ...this.state };

    state[input.name] = input.value; // passed from name element in input
    this.setState({ state });
  };

  fileUpload(file) {
    const url = endPoint + "/assets/upload";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", this.description.value);

    const token = localStorage.getItem("idToken");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "multipart/form-data"
      }
    };

    return post(url, formData, config).then(
      res => {
        window.location = "/assets";
      },
      error => {
        alert("File Upload Failed");
      }
    );
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />

        <input
          ref={ref => {
            this.description = ref;
          }}
          onChange={this.onTextChange}
          name="description"
          id="description"
          type="text"
          placeholder="Enter description"
          className="form-control"
        />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default FileUpload;
