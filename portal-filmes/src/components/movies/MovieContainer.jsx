import { useRef } from "react"
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function MovieContainer({titulo, children}){

    const carouselRef = useRef(null);
    
    const leftScroll = () => {
        carouselRef.current.scrollBy({left: -400, behavior: 'smooth'})
    }

    const rightScroll = () => {
        carouselRef.current.scrollBy({left: 400, behavior: 'smooth'})
    }

    return (
        <>
            <div className="w-full relative">
                <h2 className="font-[Bebas] mb-5 text-white text-5xl">{titulo}</h2>

                <button onClick={leftScroll} className="flex items-center w-6 py-1 absolute left-4 top-1/2 rounded-full bg-white text-4xl z-10" >
                    <IoIosArrowBack/>
                </button>

                <div ref={carouselRef} className="flex overflow-hidden scroll-smooth w-full gap-x-9">
                    {children}
                </div>

                <button onClick={rightScroll} className="flex items-center w-6 py-1 absolute right-4 top-1/2 rounded-full bg-white text-4xl z-10" >
                    <IoIosArrowForward/>
                </button>

            </div>
        </>
    )
}