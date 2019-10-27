import HttpService from "./HttpService";
import { endPoint } from "../config.json";

export function getAssets() {
  const token = localStorage.getItem("idToken");
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

  return HttpService.get(endPoint + "/assets/users", config);
}

export function deleteAsset(id) {
  const token = localStorage.getItem("idToken");

  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

  return HttpService.delete(endPoint + "/assets/" + id, config);
}
