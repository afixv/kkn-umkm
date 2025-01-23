import Image from "next/image";
import { FaInstagram } from "react-icons/fa6";
import { BsTelephone } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { TbWorldWww } from "react-icons/tb";

export default function Footer() {
  const socialMedia = [
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/kecamatan_purwokertobarat/",
    },
    {
      icon: <BsTelephone />,
      url: "tel:+6281328480696",
    },
    {
      icon: <IoMailOutline />,
      url: "mailto:poerwokertobaratkecamatan@gmail.com",
    },
    {
      icon: <TbWorldWww />,
      url: "https://purwokertobarat.banyumaskab.go.id/",
    },
  ];
  return (
    <footer className="border-t border-gray-200">
      <div className="container flex justify-center py-8 items-center flex-col ">
        <Image
          src="/img/logo-2.svg"
          alt="UMKM Kelurahan Kedungwuluh"
          width={270}
          height={62}
        />
        <p className="font-medium text-center mt-4 text-gray-600 max-w-lg">
          Pesayangan, Kedungwuluh, Kec. Purwokerto Barat Kabupaten Banyumas,
          Jawa Tengah 53131
        </p>
        <div className="flex space-x-4 mt-4">
          {socialMedia.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              className="text-primary hover:text-primary-dark inline-flex items-center justify-center w-9 h-9 rounded-md text-lg bg-primary-50 hover:bg-primary-100 duration-300">
              {item.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="bg-primary text-white text-xs py-2 px-4 text-center font-medium">
        <p>
          Copyright © 2024 <strong>Kelurahan Kedungwuluh</strong> bekerja sama
          dengan <strong>KKN-PPM UGM</strong>
        </p>
      </div>
    </footer>
  );
}
