import {useParams} from 'react-router-dom'
import {useEffect, useState, useRef, useContext} from 'react'
import { CiStar } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import CastCard from '../components/cast/CastCard';
import { WatchLaterContext } from '../context/WatchLaterContext';
import { WatchedContext } from '../context/WatchedContext';
import { CiBookmarkPlus } from "react-icons/ci";

export default function MovieDetails(){

    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [width, setWidth] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const {handleWatchLater, isWatchLater} = useContext(WatchLaterContext);
    const {handleWatched, isWatched} = useContext(WatchedContext);


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=114e0cc10385f69dc6d21e2a19caf57a&language=pt-br`)
        .then(response => response.json())
        .then(data => {setMovie(data)})
        .catch(e => console.error(e));
    }, []);

    useEffect(() => {
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=114e0cc10385f69dc6d21e2a19caf57a&language=pt-br`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.results.length > 0) {
              const trailerURL = data.results[0].key;
              setTrailer(`https://www.youtube.com/watch?v=${trailerURL}`);
            }
          })
          .catch((err) => console.error(err));
      }, [id]);

      useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=114e0cc10385f69dc6d21e2a19caf57a&language=pt-br&page=1`
        )
        .then((response) => response.json())
        .then((data) => setCast(data.cast))
        .catch(e => console.error(e))

        console.log(cast)
      }, [id])

    const carouselRef = useRef(null);

    const downScroll = () => {
        carouselRef.current.scrollBy({top: 200, behavior: 'smooth'})
        console.log('Scroll Height:', carouselRef.current.scrollHeight);
        console.log('Client Height:', carouselRef.current.clientHeight);
    }

    const upScroll = () => {
        carouselRef.current.scrollBy({top: -200, behavior: 'smooth'})
    }

    useEffect(() => {
        const widthViewPort = window.innerWidth;
        setWidth(widthViewPort);
        console.log(width)
    }, [width])

    return (
        <> 
        {
            movie ?
                <div key={movie.id} className={`${width > 1500? "h-[910px]" : "h-[800px]"} bg-cover bg-center text-white relative`} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}}>
                    <div className="bg-black bg-opacity-70 w-full h-full absolute top-0 left-0 flex">
                        <div className="w-[60%] p-20 h-full font-[Raleway] flex flex-col gap-y-8">
                            <div className="w-full flex">
                                <div className='flex flex-col'>
                                    <h1 className='lg:text-7xl font-[Bebas]'>{movie.title}</h1>
                                    <div className="flex items-center gap-x-2">
                                        <CiStar className='text-primary_color text-4xl'/>
                                        <div className='w-full flex justify-between items-center'>
                                            <p className='text-2xl'>{movie.vote_average}</p>
                                            <p className='text-base text-primary_color'>{movie.release_date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='text-justify '>
                                 <p className='max-h-[100px] overflow-y-auto'>{movie.overview ? movie.overview : "Sinopse não disponível ;("}</p>
                            </div>
                            <div className='flex justify-between'>
                                <div className="w-[75%]">
                                {trailer ? (
                                    <iframe
                                    width={`100%`}
                                    height={`${width > 1500 ? "450px" : "315px"}`}
                                    src={trailer.replace('watch?v=', 'embed/')}
                                    title={`${movie.title} Trailer`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                    ) : (
                                    <p>Trailer não disponível</p>
                                    )}
                                </div>
                                <div className="w-[20%] flex justify-center">
                                    <div className="w-[90%] h-full relative">
                                        <button onClick={upScroll} className=" text-black flex items-center w-6 absolute left-[43%] -top-4 rounded-full bg-white text-4xl z-10" >
                                            <IoIosArrowUp />
                                        </button>

                                        <div ref={carouselRef} className={`flex flex-col gap-y-8 overflow-hidden ${width > 1500 ? "max-h-[450px]" : "max-h-[315px]"}`}>
                                            {
                                                cast.map((data, index) => (
                                                    <CastCard
                                                        key = {index}
                                                        name = {data.name}
                                                        role = {data.known_for_department}   
                                                        character={data.character}  
                                                        profile_path = {data.profile_path}                                               
                                                    />
                                                ))
                                            }
                                        </div>
                                        
                                        <button onClick={downScroll} className=" text-black flex items-center w-6 absolute left-[43%] -bottom-4 rounded-full bg-white text-4xl z-10" >
                                            <IoIosArrowDown />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full mt-3">
                                <button className="flex gap-4 p-4 bg-primary_color rounded hover:bg-white hover:text-primary_color transition duration-300 group" onClick={() => handleWatched(movie)}>{isWatched(movie) ?"Remover dos filmes assistidos"  : "Adicionar aos filmes assistidos"}<CiBookmarkPlus className='text-2xl text-white group-hover:text-primary_color'></CiBookmarkPlus></button>
                                <button className="text-primary_color h-fit p-1 hover:border-b hover:border-primary_color transition duration-300" onClick ={() => handleWatchLater(movie)}>{isWatchLater(movie) ? "Remover" : "Assistir mais tarde"}</button>
                            </div>
                        </div>
                        <div className="w-[40%] h-full">
                            <div className="w-[90%] h-full">
                                <img src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} alt="" className='h-full'/>
                            </div>
                        </div>
                    </div>
                </div>
            
            
            : <p>Filme não encontrado</p>
        } 
        </>
    )
}