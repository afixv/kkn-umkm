"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { ProductCard } from "../components";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Map from "../components/Map";
import React, { useState, useEffect } from "react";

export default function ShopDetail({ params }) {
  const { slug } = React.use(params);
  const [data, setData] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/umkms?filters[slug][$eq]=${slug}&populate=*`
        );
        const { data } = res.data;

        const filteredData = data[0];

        const resProduct = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/umkms?filters[slug][$eq]=${slug}&populate=products.image`
        );
        const { data: productData } = resProduct.data;
        const filteredProduct = productData[0];

        setProduct(filteredProduct);
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slug]);

  if (!data) return null;

  const {
    location_latitude,
    location_longitude,
    gallery,
    whatsapp_number,
    additional_information,
    address,
  } = data;
  return (
    <main className="py-32 container space-y-16">
      <Overview {...data} />
      <Product products={product} whatsapp_number={whatsapp_number} />
      <Galeri gallery={gallery} />
      <AdditionalInfo additional_information={additional_information} />
      <MapSection
        location_latitude={location_latitude}
        location_longitude={location_longitude}
        address={address}
      />
    </main>
  );
}

const Overview = ({
  name,
  whatsapp_number,
  category,
  RW,
  open_hour,
  description,
  social_links_gojek,
  social_links_grab,
  social_links_tokopedia,
  social_links_shopee,
  image,
}) => {
  const ecommerce = [
    {
      id: 1,
      name: "Tokopedia",
      url: social_links_tokopedia || null,
      image: "/img/brand-logo/tokopedia.png",
    },
    {
      id: 2,
      name: "Shopee",
      url: social_links_shopee || null,
      image: "/img/brand-logo/shopee.png",
    },
    {
      id: 3,
      name: "Grab",
      url: social_links_grab || null,
      image: "/img/brand-logo/grab.png",
    },
    {
      id: 4,
      name: "Gojek",
      url: social_links_gojek || null,
      image: "/img/brand-logo/gojek.png",
    },
  ];

  const formattedNumber = whatsapp_number.replace(/^0/, "62");
  return (
    <section className="flex flex-col md:flex-row justify-center items-start gap-4 md:gap-8 ">
      <div>
        <div className="relative w-[250px] overflow-hidden rounded-lg transform border-2 border-primary aspect-square shadow-medium group">
          <Image
            src={
              image?.url
                ? process.env.NEXT_PUBLIC_IMAGE_URL + image?.url
                : "/img/default.svg"
            }
            alt={name}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        {ecommerce.filter((e) => e.url).length > 0 && (
          <h2 className="font-semibold mt-4">Kunjungi Toko Online : </h2>
        )}
        <div className="flex items-center">
          {ecommerce
            .filter((e) => e.url)
            .map((shop) => (
              <a
                key={shop.id}
                href={shop.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-all transform hover:scale-105 p-2">
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
      <div className="flex-1 w-full ">
        <div className="flex items-center space-x-2 my-2">
          <span className="px-2 py-1 text-xs font-medium text-[#502004] bg-[#F8EFDB] rounded-md">
            {category}
          </span>
          <span className="px-2 py-1 text-xs font-medium text-primary-800 bg-primary-50 rounded-md">
            {RW}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

        <p className="text-gray-600 font-medium">
          <strong>Jam Buka : </strong> {open_hour}
        </p>
        <p className="font-medium text-justify mt-2">{description}</p>
        <div className="flex md:items-center flex-col md:flex-row w-full gap-2 my-3">
          <a
            href={`https://wa.me/${formattedNumber}`}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-primary">
            <FaWhatsapp className="mr-2 text-xl" />
            Hubungi Toko
          </a>
          <a href="#map" className="btn btn-primary-outline">
            <HiOutlineLocationMarker className="mr-2 text-xl" />
            Lokasi Toko
          </a>
        </div>
      </div>
    </section>
  );
};

const Product = ({ products, whatsapp_number }) => {
  const formattedNumber = whatsapp_number.replace(/^0/, "62");
  return (
    <section>
      <h2 className="text-2xl font-bold text-center">Katalog Produk</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 mt-10">
        {products?.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            whatsapp_number={formattedNumber}
          />
        ))}
      </div>
      {/* <div className="flex justify-center">
        <button className="btn btn-primary mt-10 mx-auto">Lihat Semua</button>
      </div> */}
    </section>
  );
};

const Galeri = ({ gallery }) => {
  return (
    <>
      {gallery && (
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
            {gallery.map((image, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-[300px] overflow-hidden group rounded-lg">
                  <Image
                    src={
                      image?.url
                        ? process.env.NEXT_PUBLIC_IMAGE_URL + image?.url
                        : "/img/default.svg"
                    }
                    alt={"Gallery Image"}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </>
  );
};

const AdditionalInfo = ({ additional_information }) => {
  return (
    <section id="map">
      <h2 className="text-2xl font-bold text-start">Informasi Tambahan</h2>
      <p className="mt-4 text-justify font-medium">
        {additional_information || "Tidak ada informasi tambahan"}
      </p>
    </section>
  );
};

const MapSection = ({ location_latitude, location_longitude, address }) => {
  const DEFAULT_CENTER = [-7.420824, 109.228876];
  return (
    <section>
      <h2 className="text-2xl font-bold text-start">Lokasi</h2>

      <p className="mt-4 text-gray-900 font-medium max-w-3xl">
        <strong>Alamat : </strong> {address}
      </p>
      <div className="max-w-3xl rounded-lg mt-2 relative">
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
              <Marker
                position={
                  location_latitude && location_longitude
                    ? [location_latitude, location_longitude]
                    : DEFAULT_CENTER
                }>
                <Popup>Lokasi Toko</Popup>
              </Marker>
            </>
          )}
        </Map>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${location_latitude},${location_longitude}`}
          target="_blank"
          rel="noreferrer noopener"
          className="btn btn-primary md:absolute mt-4 md:mt-0 -bottom-4 -right-4 md:!px-12 z-[9999]">
          Buka di Google Maps
        </a>
      </div>
    </section>
  );
};
