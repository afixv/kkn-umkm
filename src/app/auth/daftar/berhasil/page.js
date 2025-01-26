import Link from "next/link";
import React from "react";

export default function BerhasilDaftar() {
  return (
    <main className="container py-24 flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-3xl font-bold text-center">
        Selamat Nomor Anda Berhasil Terdaftar! 🎉
      </h1>
      <p className="text-center mt-2 font-medium text-gray-600">
        Terima kasih telah mendaftar. Silakan masuk untuk melanjutkan.
      </p>
      <Link href="/auth/masuk" className="btn btn-primary mt-4">
        Masuk
      </Link>
    </main>
  );
}
