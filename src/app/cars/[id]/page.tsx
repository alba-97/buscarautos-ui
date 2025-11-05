"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Car } from "@/interfaces/cars";
import { getCarById } from "@/services/api";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import Link from "next/link";

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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <Link
            href="/"
            className="mb-4 flex gap-2 items-center text-lg text-gray-700 hover:text-gray-800"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
                fill="currentColor"
              />
            </svg>
            Volver al inicio
          </Link>
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
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {car.brand} {car.model}
                </h1>
                <div className="grid grid-cols-2 gap-4 mb-6">
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
                </div>
                <div className="mb-6">
                  <p className="text-gray-600">Descripción</p>
                  <p className="text-gray-800 mt-2">{car.description}</p>
                </div>
                <div>
                  <p className="text-gray-600">Combustible</p>
                  <p className="font-semibold text-gray-600">{car.fuelType}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
