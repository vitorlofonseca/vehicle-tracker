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

const getBody = () => {
  return { macAddress: getDeviceMac() };
};

export const Auth = () => {
  let headers = getHeaders();
  let body = getBody();
  return axios
    .post(env.dashboard.api.url + "device/auth", body, headers)
    .then(res => {
      return res;
    });
};
