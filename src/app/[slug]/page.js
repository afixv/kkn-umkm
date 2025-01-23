"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { ProductCard } from "../components";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Map from "../components/Map";

export default function ShopDetail({ params }) {
  return (
    <main className="py-32 container space-y-16">
      <Overview />
      <Product />
      <Galeri />
      <AdditionalInfo />
      <MapSection />
    </main>
  );
}

const Overview = () => {
  const ecommerce = [
    {
      id: 1,
      name: "Tokopedia",
      url: "https://tokopedia.com",
      image: "/img/brand-logo/tokopedia.png",
    },
    {
      id: 2,
      name: "Shopee",
      url: "https://shopee.com",
      image: "/img/brand-logo/shopee.png",
    },
    {
      id: 3,
      name: "Grab",
      url: "https://grab.com",
      image: "/img/brand-logo/grab.png",
    },
    {
      id: 4,
      name: "Gojek",
      url: "https://gojek.com",
      image: "/img/brand-logo/gojek.png",
    },
  ];
  return (
    <section className="flex flex-col md:flex-row justify-center items-start gap-4 md:gap-8 ">
      <div>
        <div className="relative w-[250px] overflow-hidden rounded-lg transform border-2 border-primary aspect-square shadow-medium group">
          <Image
            src={"/img/default.svg"}
            alt={"Map Image"}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h2 className="font-semibold mt-4">Kunjungi Toko Online : </h2>
        <div className="flex items-center">
          {ecommerce.map((shop) => (
            <a
              key={shop.id}
              href={shop.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-all transform hover:-translate-y-1 p-2">
              <Image
                src={shop.image}
                alt={shop.name}
                width={150}
                height={150}
                className="rounded-md h-6 w-auto"
              />
            </a>
          ))}
        </div>
      </div>
      <div className="flex-1 ">
        <div className="flex items-center space-x-2 my-2">
          <span className="px-2 py-1 text-xs font-medium text-[#502004] bg-[#F8EFDB] rounded-md">
            Makanan
          </span>
          <span className="px-2 py-1 text-xs font-medium text-primary-800 bg-primary-50 rounded-md">
            RW 01
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{"Untitled"}</h1>

        <p className="text-gray-600 font-medium">
          {"Jam Buka: 09:00 - 21:00 WIB (Senin - Jumat)"}
        </p>
        <p className="font-medium text-justify mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius,
          turpis eget venenatis iaculis, libero tortor ornare velit, at tempus
          nibh arcu id massa. Maecenas facilisis nulla ut velit tristique
          pulvinar. Phasellus scelerisque tortor eget magna congue, non varius
          urna pellentesque. Fusce imperdiet nibh vitae leo congue tristique.
        </p>
        <div className="flex md:items-center flex-col md:flex-row w-full gap-2 my-3">
          <a href="#" className="btn btn-primary">
            <FaWhatsapp className="mr-2 text-xl" />
            Hubungi Toko
          </a>
          <button className="btn btn-primary-outline">
            <HiOutlineLocationMarker className="mr-2 text-xl" />
            Lokasi Toko
          </button>
        </div>
      </div>
    </section>
  );
};

const Product = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-center">Katalog Produk</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <ProductCard key={i} />
          ))}
      </div>
      <div className="flex justify-center">
        <button className="btn btn-primary mt-10 mx-auto">Lihat Semua</button>
      </div>
    </section>
  );
};

const Galeri = () => {
  const images = [
    "/img/example/galeri-1.png",
    "/img/example/galeri-2.png",
    "/img/example/galeri-3.png",
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-start">Galeri Foto</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 30,
          },
        }}
        navigation
        pagination={{ clickable: true }}
        className="mt-4">
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[300px] overflow-hidden group rounded-lg">
              <Image
                src={image}
                alt={"Image"}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

const AdditionalInfo = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-start">Informasi Tambahan</h2>
      <p className="mt-4 text-justify font-medium">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius,
        turpis eget venenatis iaculis, libero tortor ornare velit, at tempus
        nibh arcu id massa. Maecenas facilisis nulla ut velit tristique
        pulvinar. Phasellus scelerisque tortor eget magna congue, non varius
        urna pellentesque. Fusce imperdiet nibh vitae leo congue tristique.{" "}
      </p>
    </section>
  );
};

const MapSection = () => {
  const DEFAULT_CENTER = [-7.420824, 109.228876];
  return (
    <section>
      <h2 className="text-2xl font-bold text-start">Lokasi</h2>
      <div className="max-w-3xl rounded-lg mt-4 relative">
        <Map
          width="800"
          height="400"
          center={DEFAULT_CENTER}
          zoom={12}
          className="rounded-lg">
          {({ TileLayer, Marker, Popup }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={DEFAULT_CENTER}>
                <Popup>Lokasi Toko</Popup>
              </Marker>
            </>
          )}
        </Map>
        <a href="#" className="btn btn-primary md:absolute mt-4 md:mt-0 -bottom-4 -right-4 md:!px-12 z-[9999]">
          Buka di Google Maps
        </a>
      </div>
    </section>
  );
};
