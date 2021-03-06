import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as AssetService from "../services/AssetService";
import * as AuthService from "../services/AuthService";

class Assets extends Component {
  state = {
    assets: [],
    currentUser: ""
  };

  async componentDidMount() {
    const { data: assets } = await AssetService.getAssets();
    const { data: user } = await AuthService.me(
      localStorage.getItem("idToken")
    );

    const currentUser = user.username;

    this.setState({ assets, currentUser });
  }

  handleDelete = asset => {
    // Call backend to delete
    AssetService.deleteAsset(asset.id);

    console.log("Deleting asset ", asset);
    const assets = this.state.assets.filter(a => a.id !== asset.id);

    this.setState({ assets });
  };

  render() {
    const { length: count } = this.state.assets;

    if (count === 0) {
      return (
        <React.Fragment>
          <Link to="/assets/new">
            <button className="btn btn-primary">New Asset</button>
          </Link>
          <p>There is no asset in the database</p>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Link to="/assets/new">
          <button className="btn btn-primary">New Asset</button>
        </Link>
        <p>
          Showing <b>{count}</b> assets in the database for user{" "}
          <b>{this.state.currentUser}</b>
        </p>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>File Name</th>
              <th>Description</th>
              <th>S3</th>
              <th>Cloud Front</th>
              <th>Acc. Transfer</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Created Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.assets.map(asset => (
              <tr key={asset.id}>
                <td>{asset.fileName}</td>
                <td>{asset.description}</td>
                <td>
                  <a href={asset.s3Url}>Download</a>
                </td>
                <td>
                  <a href={asset.cloudFrontUrl}>Download</a>
                </td>
                <td>
                  <a href={asset.accelerationTransferUrl}>Download</a>
                </td>
                <td>{asset.firstName}</td>
                <td>{asset.lastName}</td>
                <td>{asset.createdDate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(asset)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Assets;
