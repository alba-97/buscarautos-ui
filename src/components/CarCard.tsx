import { Car } from "@/interfaces/cars";
import Image from "next/image";

interface CarCardProps {
  car: Car;
  onClick: (car: Car) => void;
}

export default function CarCard({ car, onClick }: CarCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={() => onClick(car)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {car.brand} {car.model}
        </h3>
        <p className="text-gray-600">{car.year}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">
            ${car.price.toLocaleString()}
          </span>
          <span className="text-gray-900 text-sm px-2 py-1 bg-gray-100 rounded-full">
            {car.fuelType}
          </span>
        </div>
      </div>
    </div>
  );
}
