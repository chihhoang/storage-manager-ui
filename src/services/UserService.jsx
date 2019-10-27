import HttpService from "./HttpService";
import { endPoint, idToken } from "../config.json";

export function register(user) {
  console.log("registering user ", user);

  HttpService.post(endPoint + "/users/signup", user).then(
    res => {
      window.location = "/assets";
    },
    error => {
      alert("Register error");
    }
  );
}

export function authenticate(username, password) {
  console.log("authenticate ", username);

  const config = {
    headers: {
      Authorization: "Bearer " + idToken,
      "Content-Type": "application/json"
    }
  };

  const body = {
    username: username,
    password: password
  };

  HttpService.post(endPoint + "/api/authenticate", body, config).then(
    res => {
      const token = res.data.idToken;

      // TODO save token
      console.log("auth token", token);
      localStorage.setItem("idToken", token);

      window.location = "/assets";
    },
    error => {
      alert("Invalid username and password");
    }
  );
}

export function me(token) {
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

  return HttpService.get(endPoint + "/users/me", config);
}
