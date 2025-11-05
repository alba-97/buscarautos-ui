export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  description: string;
  fuelType: "Gasolina" | "Diesel" | "Electrico" | "Hibrido";
}
