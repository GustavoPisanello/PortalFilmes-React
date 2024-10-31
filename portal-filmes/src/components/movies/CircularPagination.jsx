import {Button, IconButton} from "@material-tailwind/react"
import { HiArrowSmRight } from "react-icons/hi";
import { HiArrowSmLeft } from "react-icons/hi";


export default function CircularPagination({totalPages, currentPage, onPageChange}){
    const displayedPages = totalPages > 10 ? 10 : totalPages;

    const getItemProps = (index) => ({
        variant: currentPage === index ? "filled" : "text",
        color: "white",
        onClick: () => onPageChange(index),
        className: "rounded-full",
    });

    const nextPage = () => {
        if (currentPage === 10) return;
        onPageChange(currentPage + 1)
    }

    const prevPage = () => {
        if (currentPage === 1) return;
        onPageChange(currentPage - 1)
    }

    return(
        <>
        <div className="flex items-center gap-4 mt-6">
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full text-white"
                onClick={prevPage}
                disabled={currentPage === 1}
            >
            <HiArrowSmLeft className="h-4 w-4"/> Previous
            </Button>
            <div className="flex items-center gap-12 w-fit">
                {
                    [...Array(displayedPages)].map((_, index) => (
                        <IconButton {...getItemProps(index + 1)} key={index + 1}>
                            {index + 1}
                        </IconButton>
                    ))
                }
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full text-white"
                onClick={nextPage}
                disabled={currentPage === 10}
            > Next
            <HiArrowSmRight className="h-4 w-4"/> 
            </Button>
        </div>
        </>
    );
}