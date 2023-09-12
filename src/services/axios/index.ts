import axios from "axios";

export const api = axios.create({
  baseURL: "https://ergast.com/api/f1",
});
