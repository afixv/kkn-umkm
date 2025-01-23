"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialKeyword = searchParams.get("keyword") || "";
    setKeyword(initialKeyword);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    // Set the keyword in the search params
    if (keyword.trim()) {
      params.set("keyword", keyword);
    } else {
      params.delete("keyword");
    }

    // Check if the page number is greater than 2, and reset it to 1
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    if (currentPage >= 2) {
      params.delete("page");
    }

    // Push the new URL
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center space-x-2 border border-gray-300 rounded-lg">
      <button type="submit" className="p-1 ml-2 text-gray-400">
        <FaSearch />
      </button>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Cari UMKM  "
        className="w-full p-2 px-4 border-0 focus:outline-none focus:ring-0 focus:border-primary rounded-lg"
      />
    </form>
  );
};

export default Search;
