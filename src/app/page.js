"use client";

import {
  FilterButton,
  Search,
  Pagination,
  ShopCard,
  Skeleton,
} from "./components";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { NotFound } from "./components";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const kategori = searchParams.get("kategori") || "";
  const lokasi = searchParams.get("lokasi") || "";
  const keyword = searchParams.get("keyword") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const slugToText = (slug) => {
    return slug.split("-").join(" ");
  };

  const fetchDocuments = async (
    currentPage,
    currentKeyword,
    currentKategori,
    currentLokasi
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/umkms`,
        {
          params: {
            populate: "image",
            sort: "createdAt:desc",
            "pagination[pageSize]": 8,
            "pagination[page]": currentPage,
            ...(currentKeyword && {
              "filters[name][$containsi]": currentKeyword,
            }),
            ...(currentKategori && {
              "filters[category][$eqi]": slugToText(currentKategori),
            }),
            ...(currentLokasi && {
              "filters[RW][$eqi]": slugToText(currentLokasi),
            }),
          },
        }
      );

      setData(response.data.data);
      const { total, pageSize } = response.data.meta.pagination;
      setTotalPages(Math.ceil(total / pageSize));
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(page, keyword, kategori, lokasi);
  }, [keyword, page, kategori, lokasi]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="py-32 container">
      <div className="flex justify-center items-center gap-4 max-w-2xl mx-auto">
        <div className="flex-1">
          <Search />
        </div>
        <FilterButton />
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 mt-8 w-full mx-auto">
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} className="w-full h-64" />
          ))}
        </div>
      ) : data.length === 0 ? (
        <NotFound />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8 mt-8 w-full mx-auto">
            {data.map((doc) => (
              <ShopCard key={doc.id} item={doc} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
