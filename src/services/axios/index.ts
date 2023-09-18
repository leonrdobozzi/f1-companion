import axios from "axios";

export const api = axios.create({
  baseURL: "https://ergast.com/api/f1",
});

export const server = axios.create({
  baseURL: "http://localhost:3000/api",
});
