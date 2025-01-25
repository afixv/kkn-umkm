"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();

  const navs = [
    {
      name: "Beranda",
      link: "/",
    },
    {
      name: "Peta UMKM",
      link: "/peta",
    },
    {
      name: "Profil Kelurahan",
      link: "https://purwokertobaratmaju.com/profil/kelurahan/kedungwuluh",
      target: "_blank",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="border-b border-gray-200 z-50 fixed top-0 w-full bg-gray-50">
      <div className="flex justify-between items-center py-4 container mx-auto">
        <Link href="/">
          <Image
            src="/img/logo.svg"
            alt="Purwokerto Barat Maju"
            width={164}
            height={48}
          />
        </Link>

        <button
          ref={buttonRef}
          className="text-white bg-primary p-5 rounded-lg text-lg lg:hidden transform relative overflow-hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu">
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out"
            style={{
              transform: isOpen ? "translateY(-100%)" : "translateY(0)",
            }}>
            <FaBars />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out"
            style={{
              transform: isOpen ? "translateY(0)" : "translateY(100%)",
            }}>
            <FaTimes />
          </div>
        </button>

        <ul className="hidden lg:flex space-x-4 lg:space-x-8 items-center">
          {navs.map((nav) => (
            <li key={nav.name}>
              <Link
                href={nav.link}
                target={nav.target || "_self"}
                className={`${
                  pathname === nav.link ? "text-primary" : "text-gray-800"
                }  font-semibold hover:text-primary`}>
                {nav.name}
              </Link>
            </li>
          ))}
          <Link href="/auth/daftar" className="btn btn-primary font-semibold">
            Tambah UMKM
          </Link>
        </ul>
      </div>

      <ul
        ref={menuRef}
        className={`${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-[300px] opacity-0"
        } transform transition-all duration-300 lg:hidden absolute right-4 top-16 flex flex-col items-center space-y-4 bg-gray-100 shadow-sm z-10 py-6 px-4 rounded-xl`}>
        {navs.map((nav) => (
          <li key={nav.name}>
            <Link
              href={nav.link}
              target={nav.target || "_self"}
              className={`${
                pathname === nav.link ? "text-primary" : "text-gray-800"
              }  font-semibold hover:text-primary`}
              onClick={() => setIsOpen(false)}>
              {nav.name}
            </Link>
          </li>
        ))}
        <Link
          href="/auth/daftar"
          className="btn btn-primary font-semibold"
          onClick={() => setIsOpen(false)}>
          Tambah UMKM
        </Link>
      </ul>
    </nav>
  );
}
