"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Car } from "@/interfaces/cars";
import { getCars, getMaxPrice, getBrands } from "@/services/api";
import CarCard from "@/components/CarCard";
import Filters from "@/components/Filters";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [defaultPriceRange, setDefaultPriceRange] = useState<[number, number]>([
    0, 0,
  ]);
  const [priceRange, setPriceRange] =
    useState<[number, number]>(defaultPriceRange);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const ITEMS_PER_PAGE = 6;

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  useEffect(() => {
    async function initializeFilters() {
      try {
        const [maxPrice, brandsList] = await Promise.all([
          getMaxPrice(),
          getBrands(),
        ]);
        const newDefaultRange: [number, number] = [0, maxPrice];
        setDefaultPriceRange(newDefaultRange);
        setPriceRange(newDefaultRange);
        setBrands(brandsList);
      } catch (error) {
        console.error("Error loading price range:", error);
      }
    }
    initializeFilters();
  }, []);

  useEffect(() => {
    async function loadCars() {
      try {
        setLoading(true);
        const response = await getCars({
          brand: selectedBrand || undefined,
          minPrice: priceRange[0] || undefined,
          maxPrice: priceRange[1] || undefined,
          search: debouncedSearch || undefined,
          page,
        });
        setCars(response.data);
        setTotal(response.total);
        setLoading(false);
      } catch (error) {
        console.error("Error loading cars:", error);
        setLoading(false);
      }
    }
    loadCars();
  }, [selectedBrand, priceRange, debouncedSearch, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCarClick = (car: Car) => {
    window.location.href = `/cars/${car.id}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Filters
              brands={brands}
              selectedBrand={selectedBrand}
              priceRange={priceRange}
              defaultPriceRange={defaultPriceRange}
              onBrandChange={setSelectedBrand}
              onPriceRangeChange={setPriceRange}
              onSearchChange={(value) => {
                setSearchTerm(value);
                setPage(1);
              }}
              searchTerm={searchTerm}
            />
          </div>

          <div className="md:col-span-3">
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cars.map((car) => (
                    <CarCard key={car.id} car={car} onClick={handleCarClick} />
                  ))}
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    disabled={page === 1}
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    disabled={page >= totalPages}
                  >
                    Siguiente
                  </button>
                </div>
              </>
            )}
            {!loading && cars.length === 0 && (
              <p className="text-center text-gray-500 mt-8">
                No se encontraron autos que coincidan con tus criterios.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
