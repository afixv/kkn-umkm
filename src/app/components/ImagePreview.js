"use client";
import React, { useState } from "react";
import { Input } from "@heroui/react";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";

const ImagePreview = ({
  existingImageUrl,
  onImageChange,
  label,
  name,
  required = false,
}) => {
  const [showExisting, setShowExisting] = useState(true);

  return (
    <div className="space-y-2">
      {showExisting && existingImageUrl && (
        <div className="relative">
          <label className="text-sm font-medium">{label}</label>
          <div className="relative w-40 h-40 mt-2">
            <Image
              src={
                existingImageUrl
                  ? process.env.NEXT_PUBLIC_IMAGE_URL + existingImageUrl
                  : "/img/default.svg"
              }
              alt={label}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowExisting(false)}
            className="mt-2 text-sm text-primary hover:text-primary-400 font-medium inline-flex items-center">
            <BiEdit className="inline-block mr-1" />
            Ganti Foto
          </button>
        </div>
      )}

      {(!showExisting || !existingImageUrl) && (
        <Input
          isRequired={required && !existingImageUrl}
          variant="faded"
          label={label}
          accept="image/*"
          type="file"
          name={name}
          onChange={onImageChange}
          labelPlacement="outside"
        />
      )}
    </div>
  );
};

export default ImagePreview;
