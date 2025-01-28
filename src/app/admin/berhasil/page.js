"use client";

import Link from "next/link";
import React, { Suspense } from "react";
import { FaCopy } from "react-icons/fa6";
import { toast, Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";

const getSlug = () => {
  const searchParams = useSearchParams();
  return searchParams.get("slug");
};

function BerhasilBukaTokoContent() {
  const slug = getSlug();

  if (!slug) {
    return (
      <main className="container py-26 h-screen flex justify-center items-center flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">Memuat data...</h1>
      </main>
    );
  }

  const url = `https://umkm-kedungwuluh.purwokertobaratmaju.com/${slug}`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Berhasil disalin ke clipboard!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            fontWeight: "500",
          },
        });
      })
      .catch((error) => {
        toast.error("Gagal untuk menyalin link: " + error);
      });
  };

  return (
    <main className="container py-26 h-screen flex justify-center items-center flex-col gap-6">
      <Toaster />
      <h1 className="text-3xl font-bold text-center">
        Selamat Toko Anda Berhasil Dibuka 🎉
      </h1>
      <button onClick={handleCopy}>
        <div className="rounded-full py-2 px-6 border-2 border-black bg-white font-bold pr-10 overflow-clip relative">
          <span className="text-sm md:text-base leading-snug break-words break-all">
            {url}
          </span>
          <FaCopy className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
        </div>
        <p className="text-center text-sm font-medium text-gray-600 mt-2">
          Salin link diatas untuk membagikan toko anda
        </p>
      </button>

      <Link href={`/${slug}`} className="btn btn-primary">
        Lihat Toko Anda
      </Link>
    </main>
  );
}

export default function BerhasilBukaToko() {
  return (
    <Suspense>
      <BerhasilBukaTokoContent />
    </Suspense>
  );
}
