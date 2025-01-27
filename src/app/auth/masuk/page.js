"use client";

import { useState } from "react";
import { Input } from "@heroui/input";
import { Form } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Masuk() {
  const [formData, setFormData] = useState({
    telepon: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

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

    if (!formData.telepon) {
      newErrors.telepon = "Nomor telepon wajib diisi";
    } else if (!/^\d+$/.test(formData.telepon)) {
      newErrors.telepon = "Nomor telepon hanya boleh berisi angka";
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
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

    redirect("/admin");
  };

  return (
    <div className="container py-24 flex flex-col justify-center items-center w-full h-screen">
      <Form
        className="w-full max-w-md space-y-4 font-medium placeholder:font-medium"
        validationBehavior="native"
        validationErrors={errors}
        onReset={() => setFormData({ telepon: "", password: "" })}
        onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-4 text-start">
          Masuk ke UMKM Anda
        </h1>
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
        <p className="text-sm text-gray-500 font-medium">
          Belum punya akun?{" "}
          <Link href={"/auth/daftar"} className="font-semibold text-primary">
            Daftarkan UMKM Anda
          </Link>
        </p>
        <button type="submit" className="w-full btn btn-primary">
          Masuk
        </button>
      </Form>
    </div>
  );
}
