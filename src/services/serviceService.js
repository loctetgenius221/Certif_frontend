import axios from "axios";
import { api_base_url } from "@/apiConfig";

// Base URL de l'API
const api = axios.create({
  baseURL: api_base_url,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, 
  },
});
export const getServices = async () => {

  const token = localStorage.getItem("token");
  const response = await api.get("/services", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Response data:", response.data);
  return response.data;
}