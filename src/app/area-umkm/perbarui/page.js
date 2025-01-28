"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoSend } from "react-icons/io5";

export default function Perbarui() {
  const [slug, setSlug] = useState("");
  const router = useRouter();

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && slug.trim() !== "") {
      router.push(`/perbarui/${slug}`);
    }
  };

  return (
    <main className="container py-24 min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl text-center">
        Harap Masukkan Kode Toko Anda
      </h1>
      <p className="text-center text-gray-600 mt-2 font-medium">
        Silakan isi kode toko untuk melanjutkan
      </p>
      <div className="flex justify-center flex-col md:flex-row gap-8 mt-6 relative w-full md:max-w-sm">
        <input
          type="text"
          placeholder="Kode Toko"
          className="px-4 py-2 w-full border-2 placeholder:font-bold font-bold border-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Link
          href={`/perbarui/${slug}`}
          className="bg-primary h-8 w-8 inline-flex justify-center text-white items-center rounded-full absolute right-2 top-1/2 transform -translate-y-1/2">
          <IoSend />
        </Link>
      </div>
    </main>
  );
}
