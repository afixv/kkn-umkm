import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen py-32 container flex flex-col items-center justify-center">
      <Image src="/img/404.svg" alt="404 Not Found" width={400} height={250} />
      <h1 className="text-3xl font-bold text-center mt-8">
        Halaman Tidak Tersedia
      </h1>
      <p className="text-center mt-1 text-gray-600 font-medium">
        Halaman yang Anda Cari Tidak Ditemukan, Silakan Kembali ke Beranda
      </p>
      <Link href={"/"} className="btn btn-primary mt-6">
        Kembali ke Beranda
      </Link>
    </main>
  );
}
