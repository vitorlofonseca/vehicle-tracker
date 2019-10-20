import axios from "axios";
import { getToken } from "../auth/auth";
import { env } from "../config/env";

let headers = {
  headers: {
    token: getToken()
  }
};

const getDeviceMac = () => {
  return localStorage.getItem("deviceMac");
};

export const GetMetricsByMac = () => {
  return axios
    .get(env.api.url + "metric/getLast/" + getDeviceMac(), headers)
    .then(res => {
      return res;
    });
};
