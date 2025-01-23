import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/app/utils/formatDate";

export default function ShopCard() {
  return (
    <Link href={`/1`} className="overflow-hidden group ">
      <div className="flex items-center space-x-2 my-2">
        <span className="px-2 py-1 text-xs font-medium text-[#502004] bg-[#F8EFDB] rounded-md">
          Makanan
        </span>

        <span className="px-2 py-1 text-xs font-medium text-primary-800 bg-primary-50 rounded-md">
          RW 01
        </span>
      </div>

      <div className="relative w-full h-auto overflow-hidden rounded-lg transform border-2 border-primary aspect-[8/7] shadow-light">
        <Image
          src={"/img/default.svg"}
          alt={"Map Image"}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="mt-2">
        <h3 className="text-base font-bold text-gray-900 line-clamp-2">
          {"Untitled"}
        </h3>
        <p className="text-gray-600 font-medium text-sm line-clamp-2">
          {"No description available."}
        </p>
      </div>
    </Link>
  );
}
