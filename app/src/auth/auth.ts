import * as CryptoJS from "crypto-js";
import { env } from "../config/env";

const getDeviceMac = () => {
  return localStorage.getItem("deviceMac");
};

const getPass = () => {
  return localStorage.getItem("password");
};

export const getToken = () => {
  let deviceMac = getDeviceMac();
  let password = getPass();
  let date = Date.now();
  let clearToken = deviceMac + "|" + password + "|" + date;
  console.log(env);
  return CryptoJS.AES.encrypt(clearToken, env.dashboard.api.key).toString();
};
