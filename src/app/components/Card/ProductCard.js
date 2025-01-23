import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

export default function ProductCard() {
  return (
    <div className="shadow-light rounded-lg flex flex-col min-[463px]:flex-row">
      <div className="relative w-full min-[463px]:w-[160px] overflow-hidden rounded-lg transform border-2 border-primary aspect-square group">
        <Image
          src={"/img/default.svg"}
          alt={"Map Image"}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-1 px-4 py-6 items-start">
        <div className="flex flex-col mt-2 justify-center items-start gap">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 m-0">
            Dimsum Enak Banget Lo
          </h3>
          <p className="text-primary font-semibold text-lg">Rp.10.000/pcs</p>
          <a
            href="#"
            rel="noopener noreferrer"
            target="_blank"
            className="btn btn-primary font-semibold gap-2 mt-3 inline-flex items-center">
            <FaWhatsapp />
            Pesan
          </a>
        </div>
      </div>
    </div>
  );
}
