import Image from "next/image";

export default function NotFound() {
  return (
    <div className="py-36 flex flex-col justify-center items-center">
      <Image
        src={"/img/not-found.svg"}
        alt="Tidak Ditemukan"
        width={150}
        height={150}
      />
      <h1 className="font-bold text-3xl mt-4">Hasil Tidak Ditemukan</h1>
      <p className="text-gray-500 text-center mt-2 max-w-md">
        Maaf, hasil yang Anda cari tidak dapat ditemukan. Silakan masukkan kata
        kunci lainnya.
      </p>
    </div>
  );
}
