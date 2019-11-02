import axios from "axios";
import { getToken } from "../auth/auth";
import { env } from "../config/env";

const getHeaders = () => {
  return {
    headers: {
      token: getToken()
    }
  };
};

const getDeviceMac = () => {
  return localStorage.getItem("deviceMac");
};

export const GetMetricsByMac = () => {
  let headers = getHeaders();
  return axios
    .get(env.dashboard.api.url + "metric/getLast/" + getDeviceMac(), headers)
    .then(res => {
      return res;
    });
};
