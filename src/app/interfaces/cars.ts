export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  description: string;
  fuelType: 'Gasolina' | 'Electrico';
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
}

export interface CarFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
}
