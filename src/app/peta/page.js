"use client";

import { FilterButton, Search, Skeleton } from "../components";
import Map from "../components/Map";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

function MapContent() {
  // const DEFAULT_CENTER = [-7.420824, 109.228876];

  // const searchParams = useSearchParams();
  // const kategori = searchParams.get("kategori") || "";
  // const lokasi = searchParams.get("lokasi") || "";
  // const keyword = searchParams.get("keyword") || "";

  // const [mobile, setMobile] = useState(false);
  // const [locations, setLocations] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const slugToText = (slug) => slug.split("-").join(" ");

  // const fetchLocations = async (
  //   currentKeyword,
  //   currentKategori,
  //   currentLokasi
  // ) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/umkms`,
  //       {
  //         params: {
  //           sort: "createdAt:desc",
  //           "pagination[pageSize]": 1000,
  //           ...(currentKeyword && {
  //             "filters[name][$containsi]": currentKeyword,
  //           }),
  //           ...(currentKategori && {
  //             "filters[category][$eqi]": slugToText(currentKategori),
  //           }),
  //           ...(currentLokasi && {
  //             "filters[RW][$eqi]": slugToText(currentLokasi),
  //           }),
  //         },
  //       }
  //     );
  //     setLocations(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching locations:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   setMobile(window.innerWidth < 768);
  //   window.addEventListener("resize", () => {
  //     setMobile(window.innerWidth < 768);
  //   });

  //   fetchLocations(keyword, kategori, lokasi);
  // }, [keyword, kategori, lokasi]);

  return (
    <section className="py-12 container">
      <iframe
        src="https://storymaps.arcgis.com/stories/d43c3c7288b24b478af04c43ab621f94"
        width="100%"
        style={{ height: "90vh", paddingTop: "42px" }}
        frameborder="0"
        allowfullscreen
        allow="geolocation"></iframe>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <div className="flex justify-center items-center gap-4 max-w-2xl mx-auto">
          <div className="flex-1">
            <Search />
          </div>
          <FilterButton />
        </div>
      </Suspense>
      <div className="mt-12 max-w-[1120px] mx-auto">
        {loading ? (
          <>
            <Skeleton className="max-w-40 rounded-xl h-4" />
            <Skeleton
              className={`w-full rounded-xl ${
                mobile ? "h-[1000px]" : "h-[550px]"
              }`}
            />
          </>
        ) : (
          <>
            <p className="text-start text-gray-700 my-2 text-sm font-medium">
              Menampilkan <strong>{locations.length}</strong> UMKM
            </p>
            <Map
              width="800"
              height={mobile ? "1000" : "400"}
              center={DEFAULT_CENTER}
              zoom={12}
              className="rounded-xl">
              {({ TileLayer, Marker, Popup }) => (
                <>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {locations.map((location) => (
                    <Marker
                      key={location.id}
                      position={[
                        location?.location_latitude,
                        location?.location_longitude,
                      ]}>
                      <Popup>
                        <span>
                          <strong>{location?.name}</strong> ({location?.RW})
                        </span>
                        <br />
                        {location?.category}
                      </Popup>
                    </Marker>
                  ))}
                </>
              )}
            </Map>
          </>
        )}
      </div> */}
    </section>
  );
}

export default function MapPage() {
  return (
    <Suspense>
      <MapContent />
    </Suspense>
  );
}
