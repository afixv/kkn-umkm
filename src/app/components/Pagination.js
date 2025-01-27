import { IoChevronForward, IoChevronBack } from "react-icons/io5";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="mt-8 flex justify-center items-center gap-2 text-sm font-semibold">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`inline-flex w-9 h-9 justify-center items-center border rounded-lg ${
          currentPage === 1
            ? "border border-gray-200 opacity-50"
            : "border border-gray-200"
        }`}>
        <IoChevronBack />
      </button>
      {[...Array(totalPages)].map((_, index) => {
        const pageNum = index + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={` w-9 h-9 justify-center items-center border rounded-lg hidden md:inline-flex ${
              pageNum === currentPage
                ? "bg-primary-500 text-white"
                : "border border-gray-200"
            }`}>
            {pageNum}
          </button>
        );
      })}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`inline-flex w-9 h-9 justify-center items-center border rounded-lg ${
          currentPage === totalPages
            ? "border border-gray-200 opacity-50"
            : "border border-gray-200"
        }`}>
        <IoChevronForward />
      </button>
    </div>
  );
}
