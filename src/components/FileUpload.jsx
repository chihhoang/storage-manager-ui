import React, { Component } from "react";
import { post } from "axios";
import { endPoint } from "../config.json";

class FileUpload extends Component {
  state = {
    file: null,
    description: ""
  };

  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();

    this.fileUpload(this.state.file, this.state.description).then(response => {
      console.log(response.data);
    });
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  onTextChange = () => {
    const description = this.state.description;

    this.setState({ description });
  };

  fileUpload(file, description) {
    const url = endPoint + "/assets/upload";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    const config = {
      headers: {
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
