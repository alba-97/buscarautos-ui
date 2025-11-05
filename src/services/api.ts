import { Car } from "@/interfaces/cars";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

interface CarFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
}

interface ApiResponse<T> {
  data: T[];
  total: number;
}

export async function getCars(
  filters: CarFilters = {}
): Promise<ApiResponse<Car>> {
  const params = new URLSearchParams();

  if (filters.brand) params.append("brand", filters.brand);
  if (filters.minPrice) params.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
  if (filters.search) params.append("search", filters.search);
  if (filters.page) params.append("page", filters.page.toString());

  const { data } = await api.get<ApiResponse<Car>>("/cars", { params });
  return data;
}

export async function getCarById(id: string): Promise<Car> {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
}

export async function getMaxPrice(): Promise<number> {
  const { data } = await api.get<number>("/cars/max-price");
  return data;
}

export async function getBrands(): Promise<string[]> {
  const { data } = await api.get<string[]>("/cars/brands");
  return data;
}
