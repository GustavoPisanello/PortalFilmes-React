import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import MovieCard from "../components/movies/MovieCard";
import CircularPagination from '../components/movies/CircularPagination'
import { hourglass } from 'ldrs'

hourglass.register()


export default function Movies(){

    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const API_KEY = "?api_key=114e0cc10385f69dc6d21e2a19caf57a";
    const BASE_URL = "https://api.themoviedb.org/3";

    useEffect(() => {
        
        setTimeout(() => {
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=114e0cc10385f69dc6d21e2a19caf57a&language=pt-br&page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results);
                setTotalPages(data.total_pages);
            })
            .catch(e => console.error(e))
            .finally(() => console.log("fetch finalizado"));       
        }, 3000);
    }, [currentPage]);
    console.log(movies)

    const filteredMovies = movies.filter(movie => (movie.title.toLowerCase().includes(search.toLowerCase())));

    return(
        <>
            <section className="p-20">
                <div className="w-full flex justify-between items-center mb-10">
                    <h2 className='font-[Bebas] text-white text-5xl'>Catálogo de filmes</h2>
                    <div className="flex gap-4 items-center">

                        <CiSearch className="text-4xl text-white"/>
                        <input type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Pesquise por um filme..."
                            className="text-white bg-transparent h-fit border-b border-white focus:outline-none w-64 font-[Raleway]"
                        />
                        
                    </div>
                </div>
                <div className="flex flex-wrap gap-12 justify-center">
                    {
                        filteredMovies.length > 0 ?
                        filteredMovies.map((movie) => {
                            return <MovieCard key={movie.id} {...movie}/>
                        }) :
                        <div className="flex flex-col gap-y-6 mt-32">
                            <l-hourglass
                                size="82"
                                bg-opacity="0.1"
                                speed="1.75" 
                                color="white" 
                                ></l-hourglass>
                            <p className="text-white font-[Raleway] mb-20">Carregando...</p>
                        </div>
                    }
                </div>
                <div className="col-span-4 flex justify-center">
                    <CircularPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />

                </div>
            </section>
        </>
    )
}