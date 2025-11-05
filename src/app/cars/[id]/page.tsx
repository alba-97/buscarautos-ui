"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Car } from "@/interfaces/cars";
import { getCarById } from "@/services/api";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCar() {
      try {
        const data = await getCarById(id as string);
        setCar(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading car:", error);
        setLoading(false);
      }
    }
    loadCar();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {loading ? (
          <Loading />
        ) : !car ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Auto no encontrado</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64 sm:h-96">
              <Image
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4 text-gray-600">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-600 mb-4">{car.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Año</p>
                  <p className="font-semibold text-gray-600">{car.year}</p>
                </div>
                <div>
                  <p className="text-gray-600">Precio</p>
                  <p className="font-semibold text-gray-600">
                    ${car.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Combustible</p>
                  <p className="font-semibold text-gray-600">{car.fuelType}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
