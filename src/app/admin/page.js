"use client";

import { Form, Input, Textarea, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import Map from "../components/Map";
import { useMapEvents } from "react-leaflet";
import { BsPlus, BsTrash } from "react-icons/bs";

export default function Admin() {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    whatsappNumber: "",
    category: "",
    rw: "",
    openHour: "",
    description: "",
    product: [
      {
        image: "",
        name: "",
        price: "",
      },
    ],
    gallery: [""],
    locationLatitude: "",
    locationLongitude: "",
    socialLinksGojek: "",
    socialLinksGrab: "",
    socialLinksTokopedia: "",
    socialLinksShopee: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("product")) {
      const [_, index, field] = name.split(".");
      setFormData((prev) => {
        const updatedProduct = [...prev.product];
        updatedProduct[index][field] = value;
        return { ...prev, product: updatedProduct };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const ClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setFormData((prev) => ({
          ...prev,
          locationLatitude: lat,
          locationLongitude: lng,
        }));
      },
    });

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Form data:", formData); // Debugging
    // Handle form submission logic here
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Nama toko harus diisi";
    }
    if (!formData.whatsappNumber) {
      errors.whatsappNumber = "Nomor WhatsApp harus diisi";
    }
    if (!formData.product[0].image) {
      errors["product.image"] = "Foto produk harus diisi";
    }
    if (!formData.product[0].name) {
      errors["product.name"] = "Nama produk harus diisi";
    }
    if (!formData.product[0].price) {
      errors["product.price"] = "Harga produk harus diisi";
    }
    if (!formData.locationLatitude || !formData.locationLongitude) {
      errors.location = "Lokasi toko harus diisi";
    }
    formData.product.forEach((product, index) => {
      if (!product.image)
        errors[`product.${index}.image`] = "Foto produk harus diisi";
      if (!product.name)
        errors[`product.${index}.name`] = "Nama produk harus diisi";
      if (!product.price)
        errors[`product.${index}.price`] = "Harga produk harus diisi";
    });

    return errors;
  };
  const rwOptions = [
    { key: "1", label: "RW 01" },
    { key: "2", label: "RW 02" },
    { key: "3", label: "RW 03" },
    { key: "4", label: "RW 04" },
    { key: "5", label: "RW 05" },
    { key: "6", label: "RW 06" },
    { key: "7", label: "RW 07" },
    { key: "8", label: "RW 08" },
  ];
  const umkmCategories = [
    { key: "1", label: "Makanan dan Minuman" },
    { key: "2", label: "Pakaian dan Aksesoris" },
    { key: "3", label: "Kesehatan dan Kecantikan" },
    { key: "4", label: "Elektronik" },
    { key: "5", label: "Perabotan" },
    { key: "6", label: "Otomotif" },
    { key: "7", label: "Kerajinan" },
    { key: "8", label: "Lainnya" },
  ];
  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      product: [
        ...prev.product,
        {
          image: "",
          name: "",
          price: "",
        },
      ],
    }));
  };
  const removeProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      product: prev.product.filter((_, i) => i !== index),
    }));
  };
  const addGalleryImage = () => {
    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ""],
    }));
  };
  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };
  return (
    <main className="container py-28">
      <Form
        validationBehavior="native"
        validationErrors={errors}
        onReset={() => setFormData({})}
        onSubmit={handleSubmit}>
        <section>
          <h1 className="font-bold text-3xl">
            Selangkah Lagi Untuk Toko Anda Siap!
          </h1>
          <p className="text-gray-500 font-medium mb-12">
            Silahkan lengkapi data berikut untuk menyelesaikan proses pembuatan
            toko Anda.
          </p>

          <div className="font-medium">
            <Input
              isRequired
              variant="faded"
              label="Foto Toko"
              placeholder="Masukkan foto identitas toko"
              description="Dapat memasukkan logo, produk unggulan, atau foto toko yang menunjukkan identitas toko anda"
              type="file"
              name="image"
              onChange={handleInputChange}
              labelPlacement="outside"
            />
          </div>

          <div className="font-medium flex flex-wrap gap-6 mt-6">
            <Input
              isRequired
              variant="underlined"
              label="Nama Toko"
              placeholder="Masukkan nama toko"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              labelPlacement="outside"
            />
            <Select
              isRequired
              variant="underlined"
              label="Kategori UMKM"
              placeholder="Pilih kategori UMKM"
              name="category"
              value={formData.category}
              onChange={(e) => {
                handleInputChange(e);
              }}
              labelPlacement="outside">
              {umkmCategories.map((category) => (
                <SelectItem key={category.key}>{category.label}</SelectItem>
              ))}
            </Select>
            <Select
              isRequired
              variant="underlined"
              label="RW"
              placeholder="Pilih RW"
              name="rw"
              value={formData.rw}
              onChange={(e) => {
                handleInputChange(e);
              }}
              labelPlacement="outside">
              {rwOptions.map((rw) => (
                <SelectItem key={rw.key}>{rw.label}</SelectItem>
              ))}
            </Select>
            <Input
              isRequired
              variant="underlined"
              label="Jam Buka"
              placeholder="Masukkan jam buka"
              name="openHour"
              value={formData.openHour}
              onChange={handleInputChange}
              labelPlacement="outside"
              description="Misal: 07:00 - 21:00 (Setiap Hari), 12:00 - 16:00 (Minggu Tutup), dll."
            />
            <Input
              isRequired
              variant="underlined"
              type="tel"
              label="Nomor WhatsApp Aktif"
              placeholder="Masukkan nomor WhatsApp aktif"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              labelPlacement="outside"
            />
            <Textarea
              isRequired
              variant="underlined"
              label="Deskripsi Toko"
              placeholder="Masukkan deskripsi toko"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              labelPlacement="outside"
            />
          </div>
        </section>

        <section className="mt-8 w-full">
          <h2 className="font-bold text-2xl">Tambah Produk Anda</h2>
          {formData.product.map((product, index) => (
            <div key={index} className="space-y-6 pb-4 py-4">
              <Input
                isRequired={index === 0}
                variant="faded"
                accept="image/*"
                label={`Foto Produk ${index > 0 ? index + 1 : ""}`}
                placeholder="Masukkan foto produk"
                name={`product.${index}.image`}
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFormData((prev) => {
                    const updatedProduct = [...prev.product];
                    updatedProduct[index].image = file;
                    return { ...prev, product: updatedProduct };
                  });
                }}
                labelPlacement="outside"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input
                  isRequired={index === 0}
                  variant="underlined"
                  label={`Nama Produk ${index > 0 ? index + 1 : ""}`}
                  placeholder="Masukkan nama produk"
                  name={`product.${index}.name`}
                  value={product?.name}
                  onChange={(e) => {
                    console.log(e.target.value);
                    handleInputChange({
                      target: {
                        name: `product.${index}.name`,
                        value: e.target.value,
                      },
                    });
                  }}
                  labelPlacement="outside"
                />
                <Input
                  isRequired={index === 0}
                  variant="underlined"
                  label={`Harga Produk ${index > 0 ? index + 1 : ""}`}
                  placeholder="Masukkan harga produk"
                  name={`product.${index}.price`}
                  value={product?.price}
                  onChange={(e) =>
                    handleInputChange({
                      target: {
                        name: `product.${index}.price`,
                        value: e.target.value,
                      },
                    })
                  }
                  labelPlacement="outside"
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  className="mt-4 text-red-600 flex items-center bg-red-50 justify-center rounded-md px-4 py-3 text-sm font-medium gap-2"
                  onClick={() => removeProduct(index)}>
                  <BsTrash size={16} /> Hapus Produk
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="mt-2 rounded-full h-10 w-10 inline-flex items-center justify-center bg-primary-50 text-primary font-bold text-xl"
            onClick={addProduct}>
            <BsPlus size={24} />
          </button>
        </section>

        <section className="mt-8 w-full">
          <h2 className="font-bold text-2xl">
            Tambah Galeri Foto Toko Anda (maks. 5)
          </h2>
          <p className="text-gray-500 font-medium mt-1 text-sm mb-10">
            Seperti foto produk unggulan, foto toko, dan lain sebagainya
          </p>

          {formData.gallery.map((image, index) => (
            <div key={index} className="mt-4 space-y-6 pb-4 flex gap-4">
              <Input
                variant="faded"
                label={`Foto ${index + 1}`}
                placeholder="Masukkan foto"
                name={`gallery.${index}`}
                accept="image/*"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const updatedGallery = [...formData.gallery];
                  updatedGallery[index] = file;
                  setFormData((prev) => ({
                    ...prev,
                    gallery: updatedGallery,
                  }));
                }}
                labelPlacement="outside"
                className="font-medium"
              />
              {index > 0 && (
                <button
                  type="button"
                  className="mt-4 text-red-600 flex items-center bg-red-50 justify-center rounded-md aspect-square w-10 h-10"
                  onClick={() => removeGalleryImage(index)}>
                  <BsTrash />
                </button>
              )}
            </div>
          ))}

          {formData.gallery.length < 5 && (
            <button
              type="button"
              className="mt-2 rounded-full h-10 w-10 inline-flex items-center justify-center bg-primary-50 text-primary font-bold text-xl"
              onClick={addGalleryImage}>
              <BsPlus size={24} />
            </button>
          )}
        </section>

        <section className="mt-8 w-full md:w-1/2">
          <h2 className="font-bold text-2xl">Lokasi Toko</h2>
          <div className="font-medium space-y-6 mt-4">
            <Map
              width="800"
              height="400"
              center={[-7.420824, 109.228876]}
              zoom={15}
              className="rounded-xl">
              {({ TileLayer, Marker, Popup }) => (
                <>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <ClickHandler />
                  {formData.locationLatitude && formData.locationLongitude && (
                    <Marker
                      position={[
                        formData.locationLatitude,
                        formData.locationLongitude,
                      ]}>
                      <Popup>
                        Lokasi Toko Anda <br />
                        Latitude: {formData.locationLatitude} <br />
                        Longitude: {formData.locationLongitude}
                      </Popup>
                    </Marker>
                  )}
                </>
              )}
            </Map>
          </div>
        </section>

        <section className="mt-8 w-full">
          <h2 className="font-bold text-2xl">Informasi Tambahan (Opsional)</h2>
          <Textarea
            variant="underlined"
            label="Informasi Tambahan"
            placeholder="Masukkan informasi tambahan"
            name="additionalInformation"
            value={formData.additionalInformation}
            onChange={handleInputChange}
            labelPlacement="outside"
            className="font-medium mt-4"
          />
        </section>

        <section className="mt-8 w-full">
          <h2 className="font-bold text-2xl">Link ke Toko Online</h2>
          <div className="font-medium mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              variant="underlined"
              label="Gojek"
              placeholder="Masukkan link gojek jika ada"
              name="socialLinksGojek"
              value={formData.socialLinksGojek}
              onChange={handleInputChange}
              labelPlacement="outside"
            />
            <Input
              variant="underlined"
              label="Grab"
              placeholder="Masukkan link grab jika ada"
              name="socialLinksGrab"
              value={formData.socialLinksGrab}
              onChange={handleInputChange}
              labelPlacement="outside"
            />
            <Input
              variant="underlined"
              label="Tokopedia"
              placeholder="Masukkan link tokopedia jika ada"
              name="socialLinksTokopedia"
              value={formData.socialLinksTokopedia}
              onChange={handleInputChange}
              labelPlacement="outside"
            />
            <Input
              variant="underlined"
              label="Shopee"
              placeholder="Masukkan link shopee jika ada"
              name="socialLinksShopee"
              value={formData.socialLinksShopee}
              onChange={handleInputChange}
              labelPlacement="outside"
            />
          </div>
        </section>

        <div className="mt-12 flex justify-end">
          <button type="submit" className="btn btn-primary">
            Konfirmasi
          </button>
        </div>
      </Form>
    </main>
  );
}
