import { ICategoriesData } from "@/interfaces/categories.interface";
import { IProduct, IProductData } from "@/interfaces/products.interface";
import axios from "axios";

export const API_URL = "https://fakestoreapi.com";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["User-Agent"] =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Cache-Control"] = "no-cache";

export const StoreService = {
  async getProductsAll() {
    const { data } = await axios.get<IProduct[]>("/products");
    return data;
  },

  async getByIdProduct(id: string) {
    const { data } = await axios.get<IProduct>(`/products/${id}`);
    return data;
  },

  async getCategories() {
    const { data } = await axios.get<ICategoriesData[]>("/products/categories");
    return data;
  },

  async getSpecificCategory(id: string) {
    const { data } = await axios.get<IProductData[]>(
      `/products/category/${id}`
    );
    return data;
  },
};
