import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { CiStar } from "react-icons/ci";

export default function MovieDetails(){

    const {id} = useParams()
    const [movie, setMovie] = useState({});
    const [trailer, setTrailer] = useState({});


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=114e0cc10385f69dc6d21e2a19caf57a&language=pt-br`)
        .then(response => response.json())
        .then(data => {setMovie(data)})
        .catch(e => console.error(e))
    }, []);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=114e0cc10385f69dc6d21e2a19caf57a&language=pt-br`)
        .then(response => response.json())
        .then(data => {
            if (data.results.lenght > 0){
                const trailerURL = data.results[0].key;
                setTrailer(`https://www.youtube.com/watch?v=${trailerURL}`);
            }
        })
        .catch(e => console.error(e));
    }, [id]);


    return (
        <> 
        {
            movie ?
                <div key={movie.id} className='h-[1000000px] bg-cover bg-center text-white relative' style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, maxHeight: "calc(100vh - 80.8px)"}}>
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
                            <div className='text-justify'>{movie.overview}</div>
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