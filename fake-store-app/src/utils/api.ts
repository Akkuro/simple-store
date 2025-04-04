import { Product } from "@/interfaces/Product";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 5000,
});

export const getProducts = async () => {
  try {
    const response = await apiClient.get("/products");
    const data: Product[] = response.data;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });
    return response.data; // Renvoie le token ou d'autres données
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};
