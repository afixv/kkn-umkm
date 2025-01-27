"use client";

import { useState } from "react";
import { Input } from "@heroui/input";
import { Form } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Daftar() {
  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama) newErrors.nama = "Nama wajib diisi";

    if (!formData.telepon) {
      newErrors.telepon = "Nomor telepon wajib diisi";
    } else if (!/^\d+$/.test(formData.telepon)) {
      newErrors.telepon = "Nomor telepon hanya boleh berisi angka";
    } else if (formData.telepon.length < 10) {
      newErrors.telepon = "Nomor telepon minimal 10 digit";
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitted(true);
    redirect("/auth/daftar/berhasil");
    console.log("Data Pendaftaran:", formData);
  };

  return (
    <div className="container py-24 flex flex-col justify-center items-center w-full h-screen">
      <Form
        className="w-full max-w-md space-y-4 font-medium placeholder:font-medium"
        validationBehavior="native"
        validationErrors={errors}
        onReset={() => setFormData({})}
        onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-4 text-start">
          Daftarkan UMKM Anda!
        </h1>
        <div className="w-full">
          <Input
            isRequired
            variant="underlined"
            label="Nama"
            placeholder="Masukkan nama lengkap"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            labelPlacement="outside"
            errorMessage={errors.nama}
          />
        </div>
        <div className="w-full">
          <Input
            isRequired
            variant="underlined"
            label="Nomor Telepon"
            placeholder="Masukkan nomor telepon"
            name="telepon"
            value={formData.telepon}
            onChange={handleInputChange}
            labelPlacement="outside"
            errorMessage={errors.telepon}
          />
        </div>
        <div className="w-full">
          <Input
            isRequired
            variant="underlined"
            label="Password"
            placeholder="Masukkan password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            labelPlacement="outside"
            errorMessage={errors.password}
          />
        </div>
        <div className="w-full">
          <Input
            isRequired
            variant="underlined"
            label="Konfirmasi Password"
            placeholder="Masukkan password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            labelPlacement="outside"
            errorMessage={errors.confirmPassword}
          />
        </div>
        <p className="text-sm text-gray-500 font-medium">
          Sudah pernah mendaftar?{" "}
          <Link href={"/auth/masuk"} className="font-semibold text-primary">
            {" "}
            Masuk ke UMKM Anda{" "}
          </Link>
        </p>
        <button type="submit" className="w-full btn btn-primary">
          Daftar
        </button>
      </Form>
    </div>
  );
}
