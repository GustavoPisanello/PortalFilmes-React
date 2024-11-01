import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function CircularPagination({ totalPages, currentPage, onPageChange }) {
    const displayedPages = 10; // Número de páginas exibidas por vez
    const startPage = Math.max(1, currentPage - Math.floor(displayedPages / 2));
    const endPage = Math.min(totalPages, startPage + displayedPages - 1);

    const getItemProps = (index) => ({
        variant: currentPage === index ? "filled" : "text",
        color: "white",
        onClick: () => onPageChange(index),
        className: `rounded-full button-no-overflow ${currentPage === index ? "bg-primary text-white" : "bg-transparent text-gray-500"}`,
    });

    const next = () => {
        if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
        }
    };

    const prev = () => {
        if (currentPage > 1) {
        onPageChange(currentPage - 1);
        }
    };

    return (
        <div className="flex items-center gap-4 mt-20">
        <Button
            variant="text"
            className="flex items-center gap-2 rounded-full text-white"
            onClick={prev}
            disabled={currentPage === 1}
        >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center gap-2">
            {[...Array(endPage - startPage + 1)].map((_, index) => {
            const page = startPage + index;
            return (
                <Button {...getItemProps(page)} key={page}>
                {page}
                </Button>
            );
            })}
        </div>
        <Button
            variant="text"
            className="flex items-center gap-2 rounded-full text-white"
            onClick={next}
            disabled={currentPage === totalPages}
        >
            Next
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
        </div>
    );
}
