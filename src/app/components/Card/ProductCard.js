import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

export default function ProductCard({ product, whatsapp_number }) {
  return (
    <div className="shadow-light rounded-lg flex flex-col min-[740px]:flex-row">
      <div className="relative w-full min-[740px]:w-[160px] overflow-hidden rounded-lg transform border-2 border-primary aspect-square group">
        <Image
          src={
            product?.image?.url ?
            process.env.NEXT_PUBLIC_IMAGE_URL + product?.image?.url :
            "/img/default.svg"
          }
          alt={product?.name}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-1 px-4 py-6 items-start">
        <div className="flex flex-col mt-2 justify-center items-start gap">
          <h3 className="md:text-lg font-bold text-gray-900 line-clamp-2 m-0">
            {product?.name}
          </h3>
          <p className="text-primary font-semibold md:text-lg">
            {product?.price}
          </p>
          <a
            href={`https://wa.me/${whatsapp_number}?text=Halo%20saya%20ingin%20pesan%20${product?.name}`}
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
