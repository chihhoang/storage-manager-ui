import HttpService from "./HttpService";
import { endPoint, idToken } from "../config.json";

export function register(user) {
  console.log("registering user ", user);

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  return HttpService.post(endPoint + "/users/signup", user, config);
}
