"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { notFound } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import { Form, Input, Textarea, Select, SelectItem } from "@heroui/react";
import Map from "@/app/components/Map";
import { useMapEvents } from "react-leaflet";
import { BsPlus, BsTrash } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { ImagePreview } from "@/app/components";

export default function Edit({ params }) {
  const { slug } = React.use(params);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    rw: "",
    open_hour: "",
    whatsapp_number: "",
    description: "",
    address: "",
    location_latitude: null,
    location_longitude: null,
    additional_information: "",
    social_links_gojek: "",
    social_links_grab: "",
    social_links_tokopedia: "",
    social_links_shopee: "",
    product: [{ name: "", price: "", image: null }],
    gallery: [null],
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialImages, setInitialImages] = useState({
    main: null,
    products: [],
    gallery: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/umkms?filters[documentId][$eq]=${slug}&populate=products.image&populate=image&populate=gallery`
        );
        const { data } = res.data;
        if (data.length === 0) {
          setError(true);
          return;
        }

        const umkm = data[0];

        setInitialImages({
          main: umkm.image?.url || null,
          products: umkm.products?.map((p) => p.image?.url) || [],
          gallery: umkm.gallery?.map((g) => g.url) || [],
        });

        setFormData({
          id: umkm.id,
          name: umkm.name,
          category: umkm.category,
          rw: umkm.RW,
          open_hour: umkm.open_hour,
          whatsapp_number: umkm.whatsapp_number,
          description: umkm.description,
          address: umkm.address,
          location_latitude: umkm.location_latitude,
          location_longitude: umkm.location_longitude,
          additional_information: umkm.additional_information || "",
          social_links_gojek: umkm.social_links_gojek || "",
          social_links_grab: umkm.social_links_grab || "",
          social_links_tokopedia: umkm.social_links_tokopedia || "",
          social_links_shopee: umkm.social_links_shopee || "",
          product: umkm.products?.map((p) => ({
            name: p.name,
            price: p.price,
            image: null,
          })) || [{ name: "", price: "", image: null }],
          gallery: new Array(umkm.gallery?.length || 1).fill(null),
          image: null,
        });
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [slug]);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (
          key !== "product" &&
          key !== "gallery" &&
          key !== "image" &&
          formData[key]
        ) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      formData.product.forEach((product, index) => {
        formDataToSend.append(`product[${index}][name]`, product.name);
        formDataToSend.append(`product[${index}][price]`, product.price);
        if (product.image) {
          formDataToSend.append(`product[${index}][image]`, product.image);
        }
      });

      formData.gallery.forEach((image, index) => {
        if (image) {
          formDataToSend.append(`gallery[${index}]`, image);
        }
      });

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/umkms/${slug}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error updating UMKM:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      product: [...prev.product, { name: "", price: "", image: null }],
    }));
  };

  const removeProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      product: prev.product.filter((_, i) => i !== index),
    }));
  };

  const addGalleryImage = () => {
    if (formData.gallery.length < 5) {
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, null],
      }));
    }
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const ClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setFormData((prev) => ({
          ...prev,
          location_latitude: lat,
          location_longitude: lng,
        }));
      },
    });

    return null;
  };

  if (error) {
    return notFound();
  }

  if (!formData) return null;

  const rwOptions = [
    { key: "RW 01", label: "RW 01" },
    { key: "RW 02", label: "RW 02" },
    { key: "RW 03", label: "RW 03" },
    { key: "RW 04", label: "RW 04" },
    { key: "RW 05", label: "RW 05" },
    { key: "RW 06", label: "RW 06" },
    { key: "RW 07", label: "RW 07" },
    { key: "RW 08", label: "RW 08" },
  ];
  const umkmCategories = [
    { key: "Makanan dan Minuman", label: "Makanan dan Minuman" },
    { key: "Pakaian dan Aksesoris", label: "Pakaian dan Aksesoris" },
    { key: "Kesehatan dan Kecantikan", label: "Kesehatan dan Kecantikan" },
    { key: "Elektronik", label: "Elektronik" },
    { key: "Perabotan", label: "Perabotan" },
    { key: "Otomotif", label: "Otomotif" },
    { key: "Kerajinan", label: "Kerajinan" },
    { key: "Lainnya", label: "Lainnya" },
  ];

  return (
    <>
      <main className="container py-28">
        <Toaster />
        <Form
          encType="multipart/form-data"
          validationBehavior="native"
          onReset={() => setFormData({})}
          onSubmit={handleSubmit}>
          <section>
            <h1 className="font-bold text-3xl">
              Selangkah Lagi Untuk Toko Anda Siap!
            </h1>
            <p className="text-gray-500 font-medium mb-12">
              Silahkan lengkapi data berikut untuk menyelesaikan proses
              pembuatan toko Anda.
            </p>

            <div className="font-medium">
              <div className="font-medium">
                <ImagePreview
                  existingImageUrl={initialImages.main}
                  onImageChange={(e) => {
                    const file = e.target.files[0];
                    setFormData((prev) => ({ ...prev, image: file }));
                  }}
                  label="Foto Toko"
                  name="image"
                />
              </div>
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
                selectedKeys={[formData.category]}
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
                selectedKeys={[formData.rw]}
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
                name="open_hour"
                value={formData.open_hour}
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
                name="whatsapp_number"
                value={formData.whatsapp_number}
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
                <ImagePreview
                  existingImageUrl={initialImages.products[index]}
                  onImageChange={(e) => {
                    const file = e.target.files[0];
                    setFormData((prev) => {
                      const updatedProduct = [...prev.product];
                      updatedProduct[index].image = file;
                      return { ...prev, product: updatedProduct };
                    });
                  }}
                  label={`Foto Produk ${index > 0 ? index + 1 : ""}`}
                  name={`product.${index}.image`}
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
                <ImagePreview
                  existingImageUrl={initialImages.gallery[index]}
                  onImageChange={(e) => {
                    const file = e.target.files[0];
                    const updatedGallery = [...formData.gallery];
                    updatedGallery[index] = file;
                    setFormData((prev) => ({
                      ...prev,
                      gallery: updatedGallery,
                    }));
                  }}
                  label={`Foto ${index + 1}`}
                  name={`gallery.${index}`}
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
            <h2 className="font-bold text-2xl">
              Lokasi Toko <span className="text-red-500">*</span>
            </h2>
            <p className="text-gray-500 font-medium mt-1 text-sm mb-4">
              Silakan pilih titik lokasi toko anda
            </p>
            <div className="font-medium space-y-6 mt-2">
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
                    {formData.location_latitude &&
                      formData.location_longitude && (
                        <Marker
                          position={[
                            formData.location_latitude,
                            formData.location_longitude,
                          ]}>
                          <Popup>
                            Lokasi Toko Anda <br />
                            Latitude: {formData.location_latitude} <br />
                            Longitude: {formData.location_longitude}
                          </Popup>
                        </Marker>
                      )}
                  </>
                )}
              </Map>
            </div>
            <Textarea
              isRequired
              variant="underlined"
              label="Alamat Toko"
              placeholder="Masukkan alamat toko"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              labelPlacement="outside"
              className="font-medium block pt-4"
            />
          </section>

          <section className="mt-8 w-full">
            <h2 className="font-bold text-2xl">
              Informasi Tambahan (Opsional)
            </h2>
            <Textarea
              variant="underlined"
              label="Informasi Tambahan"
              placeholder="Masukkan informasi tambahan"
              name="additional_information"
              value={formData.additional_information}
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
                name="social_links_gojek"
                value={formData.social_links_gojek}
                onChange={handleInputChange}
                labelPlacement="outside"
              />
              <Input
                variant="underlined"
                label="Grab"
                placeholder="Masukkan link grab jika ada"
                name="social_links_grab"
                value={formData.social_links_grab}
                onChange={handleInputChange}
                labelPlacement="outside"
              />
              <Input
                variant="underlined"
                label="Tokopedia"
                placeholder="Masukkan link tokopedia jika ada"
                name="social_links_tokopedia"
                value={formData.social_links_tokopedia}
                onChange={handleInputChange}
                labelPlacement="outside"
              />
              <Input
                variant="underlined"
                label="Shopee"
                placeholder="Masukkan link shopee jika ada"
                name="social_links_shopee"
                value={formData.social_links_shopee}
                onChange={handleInputChange}
                labelPlacement="outside"
              />
            </div>
          </section>

          <div className="mt-12 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`btn btn-primary ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              {isLoading ? "Mengunggah..." : "Kirim"}
            </button>
          </div>
        </Form>
      </main>
    </>
  );
}
