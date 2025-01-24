"use client";

import { FilterButton, Search } from "../components";
import Map from "../components/Map";
import { Suspense } from "react";

export default function MapPage() {
  const DEFAULT_CENTER = [-7.420824, 109.228876];
  return (
    <section className="py-32 container">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex justify-center items-center gap-4 max-w-2xl mx-auto">
          <FilterButton />
          <div className="flex-1">
            <Search />
          </div>
        </div>
      </Suspense>
      <div className="mt-12 max-w-[1120px] mx-auto">
        <Map
          width="800"
          height="400"
          center={DEFAULT_CENTER}
          zoom={12}
          className="rounded-xl">
          {({ TileLayer, Marker, Popup }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={DEFAULT_CENTER}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </>
          )}
        </Map>
      </div>
    </section>
  );
}
