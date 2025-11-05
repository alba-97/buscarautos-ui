import { useState, useEffect } from "react";

interface FiltersProps {
  brands: string[];
  selectedBrand: string;
  priceRange: [number, number];
  defaultPriceRange: [number, number];
  onBrandChange: (brand: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onSearchChange: (value: string) => void;
  searchTerm: string | undefined;
}

export default function Filters({
  brands,
  selectedBrand,
  priceRange,
  defaultPriceRange,
  onBrandChange,
  onPriceRangeChange,
  onSearchChange,
  searchTerm,
}: FiltersProps) {
  const [localPriceRange, setLocalPriceRange] =
    useState<[number, number]>(priceRange);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar autos..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600 text-gray-900"
            value={searchTerm || ""}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <label
          htmlFor="brand"
          className="block text-sm font-medium text-gray-700"
        >
          Marca
        </label>
        <select
          id="brand"
          value={selectedBrand}
          onChange={(e) => onBrandChange(e.target.value)}
          className="cursor-pointer py-2 pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
        >
          <option value="">Todas</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Rango de precio:{" "}
          <span className="text-gray-600">
            ${Math.round(localPriceRange[0]).toLocaleString()} - $
            {Math.round(localPriceRange[1]).toLocaleString()}
          </span>
        </label>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 md:flex md:flex-col md:gap-4 lg:flex-row lg:items-center lg:gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={Math.round(localPriceRange[0])}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? "" : parseInt(e.target.value);
                  setLocalPriceRange([value as number, localPriceRange[1]]);
                }}
                onBlur={(e) => {
                  const value =
                    parseInt(e.target.value) || defaultPriceRange[0];
                  const newMin = Math.max(
                    defaultPriceRange[0],
                    Math.min(value, localPriceRange[1])
                  );
                  if (newMin !== priceRange[0]) {
                    setLocalPriceRange([newMin, localPriceRange[1]]);
                    onPriceRangeChange([newMin, localPriceRange[1]]);
                  } else {
                    setLocalPriceRange([priceRange[0], localPriceRange[1]]);
                  }
                }}
                className="w-full pl-8 pr-2 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="flex md:hidden lg:flex items-center justify-center">
              <span className="text-gray-500">-</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={Math.round(localPriceRange[1])}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? "" : parseInt(e.target.value);
                  setLocalPriceRange([localPriceRange[0], value as number]);
                }}
                onBlur={(e) => {
                  const value =
                    parseInt(e.target.value) || defaultPriceRange[1];
                  const newMax = Math.min(
                    defaultPriceRange[1],
                    Math.max(value, localPriceRange[0])
                  );
                  if (newMax !== priceRange[1]) {
                    setLocalPriceRange([localPriceRange[0], newMax]);
                    onPriceRangeChange([localPriceRange[0], newMax]);
                  } else {
                    setLocalPriceRange([localPriceRange[0], priceRange[1]]);
                  }
                }}
                className="w-full pl-8 pr-2 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
          <div className="space-y-3">
            <input
              type="range"
              min={defaultPriceRange[0]}
              max={defaultPriceRange[1]}
              value={localPriceRange[0]}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setLocalPriceRange([
                  value,
                  Math.max(localPriceRange[1], value),
                ]);
              }}
              onMouseUp={() => {
                onPriceRangeChange(localPriceRange);
              }}
              onKeyUp={() => {
                onPriceRangeChange(localPriceRange);
              }}
              className="w-full"
            />
            <input
              type="range"
              min={defaultPriceRange[0]}
              max={defaultPriceRange[1]}
              value={localPriceRange[1]}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setLocalPriceRange([
                  Math.min(localPriceRange[0], value),
                  value,
                ]);
              }}
              onMouseUp={() => {
                onPriceRangeChange(localPriceRange);
              }}
              onKeyUp={() => {
                onPriceRangeChange(localPriceRange);
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
