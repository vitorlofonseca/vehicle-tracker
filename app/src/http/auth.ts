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

export const Auth = () => {
  let headers = getHeaders();
  return axios.post(env.api.url + "device/auth", headers).then(res => {
    return res;
  });
};
