import { FilterButton, Search, Pagination, ShopCard } from "./components";
import { Suspense } from "react";

export default function Home() {
  const onPageChange = (page) => {
    console.log("Current Page:", page);
  };
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
      <div className="grid grid-cols-2 gap-4 md:gap-8 py-12 md:grid-cols-4">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <ShopCard key={i} />
          ))}
      </div>
      <Pagination currentPage={1} totalPages={12} onPageChange={onPageChange} />
    </section>
  );
}
