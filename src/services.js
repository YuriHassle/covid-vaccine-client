import axios from "axios";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGU5ODhmMmRlYTJhNTM3OGZhNGI1NDBkYTI4MjFkM2Y4MGQ5MTlhZWVlYTU5ODdhZDZjZjI1OTI3OTdjYTgxOTk5NmJlOTM2MzFkNmQ0YTAiLCJpYXQiOiIxNjExMjAzNTY5LjY2NzU3NCIsIm5iZiI6IjE2MTEyMDM1NjkuNjY3NTc4IiwiZXhwIjoiMTY0MjczOTU2OS42NjMzMDAiLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.aKbUHjCqP8q0leN6SCRgVVYHgzn1v6hPxAjp6hNeDFX23A7tzEfbe-LjfCrk72ao-GCsS4XLhx7FyENBOP5vbtTzxYhYHgwF_WIJ7wFkuGCWT7J7lGck6p4STpp7dgPxpjGzSmT5QNKUKXVvJ_n_CZ2-2bhcyjJIyK6jruYjl5dHTrAli2M76pbmyzASj9fgSjHBotkCi9NNWigmrDb8M5fjuXl-5F-8PO-aOctNKeKKj4ZMzzm9Bzdv3NNqd6yMRIp5aq7DBz6r6w-c0OGbPITtacCL2Waijqg1XtqXDytiZDUlqk-FbXtrn4h4DCtBDVfeqSA3B1ZhcuH4M9ByCvNPptqjfCOuOF5j39lHl8ZB-vQrGeh_rcZRoSSGwy5u8cUBj6otnCDuUQfFneJRR9BfYFDceu6-e6agi2rvBhXrqyTduMOtbhOgGx0C_b6YvRORvkoACzO9gg5vJpeSVtgixGHIVf1HelILnpuQRRdYogshpozqmWcSImChQN0aMbl4mlEHFOjO_K7JE3bqUfZ3Zt9zj_1zeOdf7mUNBUnUNoe-ShkbRddVvtU5qRUeXUYbN74WCgeE8J_Qp4EhA3aZHL0a_YPTjtTPKLLHqGbmRa54aQC6W73iu80Xikt_fmGp4WhP6zGomi3SQLxpHMhdMmJpC4asaGijYSTjSFI";
const axiosInstance = axios.create({
  //baseURL: "https://covid-vaccine-server.herokuapp.com/api",
  baseURL: "http://imuniza.manaus.am.gov.br/api",
  //baseURL: "http://localhost:8000/api",
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
