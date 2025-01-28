import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AreaUMKM() {
  return (
    <main className="container py-24 min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl text-center">
        Sudah Pernah Daftar di Platform UMKM Kedungwuluh?
      </h1>
      <p className="text-center text-gray-600 mt-2 font-medium">
        Pilih salah satu dari kedua pilihan di bawah ini.
      </p>
      <div className="flex justify-center flex-col md:flex-row gap-8 mt-12 md:mt-8">
        <Link href={"/area-umkm/daftar"}>
          <div className="inline-flex items-center justify-center w-56 h-52 bg-white rounded-xl shadow-light hover:-translate-y-3 transition-transform duration-200">
            <Image
              src={"/img/daftar/belum.svg"}
              alt="Belum Daftar"
              width={184}
              height={135}
            />
          </div>
          <h2 className="font-bold mt-3 text-center">Belum Daftar</h2>
          <p className="text-gray-600 mt-0 font-medium text-center text-sm">
            Daftarkan UMKM Anda Segera!
          </p>
        </Link>
        <Link href={"/area-umkm/perbarui"}>
          <div className="inline-flex items-center justify-center w-56 h-52 rounded-xl bg-white shadow-light hover:-translate-y-3 transition-transform duration-200">
            <Image
              src={"/img/daftar/sudah.svg"}
              alt="Sudah Daftar"
              width={184}
              height={135}
            />
          </div>
          <h2 className="font-bold mt-3 text-center">Sudah Daftar</h2>
          <p className="text-gray-600 mt-0 font-medium text-center text-sm max-w-52 mx-auto">
            Anda dapat mengedit data toko Anda di sini!
          </p>
        </Link>
      </div>
    </main>
  );
}
