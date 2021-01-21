import axios from "axios";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTA0ODA4ZGY0NzkwZWJjNmJhNmVhMDQ5OTc3MTE0NDVkZjA2YmZlMmRhZmZhOTVhYTM2MTgxYTYwNzU1ZGYzZDg0ZGEzMjM4NmRiYTMyMzkiLCJpYXQiOiIxNjExMTkyMDYzLjE0ODM4OCIsIm5iZiI6IjE2MTExOTIwNjMuMTQ4Mzk1IiwiZXhwIjoiMTY0MjcyODA2Mi45NjkzMTIiLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.p9CydDyy2pkJX3JroMdAJg_SzDv0tXk4BgnAc0hUpTCBmMJbTeGSJ7DY0MEQW73yzXNe5aINXOriHj-BbHF2qx6sGEj6yAS64mahM2FggvHPkx9wers_AOBwJpfrmKPPNHEzmydn5SPZjg7IsrpaoaRMwfsujUZt835yblnlkkgKMshCwHsgN4wY987i1-owcimkWPiTt5VCbm5oUN-XJ479VdjD6IaXm2OcdSjrI_joCJHe7ctHWJHpTVut4nxWVouiwBiwhv89dKRCt3ZhjlqGDw_1X11v9ovkb_vYPLQ2ynbJhaRLPLVxNbnNBVBrctHi8FhlZ9VVLyFT5nL2KumeHreBYE0TA0HoBZ6CE6ocHcm5TTAHJIwNEXxtce6mxySA1wAOm1-IGwlzv5KJT9QPCiItK7HbiwFx5koET-V5vhZgDB4UcW434peyTcZ65oJwC_WD5XjTr4ZnKefDLofQ0Cv5eX-kXArpCC1RxFHr_o-7-phdE2rcnkUpShw8_b_GSwu3KM8DmJ3FzS0KHTJ4b5ewKCPtX1hRTVoZm3ntGjkzShi2GN4TtH6U4tO9WNiNb5XYXx_Gf_8kU0bxn7accWf6mPHU8u1wODAB0xvscfpJS9xIoNn844FgDhErHLdq5cN6mgw9WZXuDir0d51iJLC7hBHF11Prm8eQBMg";
const axiosInstance = axios.create({
  //baseURL: "https://covid-vaccine-server.herokuapp.com/api",
  baseURL: "http://localhost:8000/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
};
