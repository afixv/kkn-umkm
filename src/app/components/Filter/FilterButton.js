"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiFilter } from "react-icons/fi";

const FilterButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [filters, setFilters] = useState({ kategori: "", lokasi: "" });
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const togglePopup = () => setShowPopup((prev) => !prev);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    if (currentPage >= 2) {
      params.delete("page");
    }

    router.push(`${window.location.pathname}?${params.toString()}`);
    setShowPopup(false);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Cek apakah klik berada di luar tombol atau popup
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowPopup(false); // Menutup popup
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  const clearFilters = () => {
    setFilters({ kategori: "", lokasi: "" });
    const params = new URLSearchParams(searchParams);
    params.delete("kategori");
    params.delete("lokasi");

    params.delete("page");

    router.push(`${window.location.pathname}?${params.toString()}`);
    setShowPopup(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={togglePopup}
        className={`relative flex items-center justify-center w-10 h-10 rounded-lg border ${
          showPopup
            ? "border-primary text-primary"
            : "border-gray-300 text-gray-400"
        } text-lg bg-white hover:bg-gray-100`}>
        <FiFilter />
        {activeFiltersCount > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-medium">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {showPopup && (
        <div
          ref={popupRef}
          className="absolute right-0 mt-2 w-64 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="mb-4">
            <label
              htmlFor="kategori"
              className="block text-sm font-medium text-gray-700">
              Kategori
            </label>
            <select
              id="kategori"
              name="kategori"
              value={filters.kategori}
              onChange={handleFilterChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
              <option value="">Semua</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="lokasi"
              className="block text-sm font-medium text-gray-700">
              Lokasi
            </label>
            <select
              id="lokasi"
              name="lokasi"
              value={filters.lokasi}
              onChange={handleFilterChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
              <option value="">Semua</option>
              {districts.map((district) => (
                <option key={district.id} value={district.slug}>
                  {district.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center w-full gap-2 flex-col">
            <button onClick={applyFilters} className="btn btn-primary w-full">
              Terapkan Filter
            </button>
            <button
              onClick={clearFilters}
              className="btn bg-red-100 !text-red-600 w-full hover:bg-red-200 transition-all">
              Hapus Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
