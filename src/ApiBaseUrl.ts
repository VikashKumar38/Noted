import axios from "axios";
export const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
  headers: {
    "Content-Type": "application/json",
  },
});
