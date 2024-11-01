import { useState, useEffect, useContext } from "react";
import MovieContainer from "../components/movies/MovieContainer";
import MovieCard from "../components/movies/MovieCard";
import {FavoritesContext} from '../context/FavoritesContext'

export default function Home(){

    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {favorites, handleFavorite, isFavorite} = useContext(FavoritesContext);

    const API_KEY = "?api_key=114e0cc10385f69dc6d21e2a19caf57a";
    const BASE_URL = "https://api.themoviedb.org/3";

    const fetchMovies = async() => {
        try{
            const popMoviesURL = `${BASE_URL}/movie/popular${API_KEY}&language=pt-br&page=1`;
            const topRatedMoviesURL = `${BASE_URL}/movie/top_rated${API_KEY}&language=pt-br&page=1`;
            const upcomingMoviesURL = `${BASE_URL}/movie/upcoming${API_KEY}&language=pt-br&page=1`;

            const [popResponse, topRatedResponse, upcomingResponse] = await Promise.all([
                fetch(popMoviesURL),
                fetch(topRatedMoviesURL),
                fetch(upcomingMoviesURL)
            ]);

            const popMovies = await popResponse.json();
            const topRated = await topRatedResponse.json();
            const upcoming = await upcomingResponse.json();

            setPopularMovies(popMovies.results);
            setRatedMovies(topRated.results);
            setUpcomingMovies(upcoming.results);
        }

        catch(e){
            console.log("Erro ao buscar os filmes: ", e);
        }

        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchMovies();
    }, [])


    return(
        <>
        {isLoading ? <p>Carregando...</p> :
        <>
            <div className="flex flex-col p-16 gap-y-32">
                <MovieContainer titulo={"Filmes populares"}>
                    {
                        popularMovies.map((movie) =>(
                            <MovieCard
                                key={movie.id} {...movie}
                                handleFavorite={handleFavorite}
                                isFavorite={isFavorite(movie)}
                            />
                        ))
                    }
                </MovieContainer>
                <MovieContainer titulo={"Os críticos indicam"}>
                    {
                        topRatedMovies.map((movie) =>(
                            <MovieCard
                                key={movie.id} {...movie}
                                handleFavorite={handleFavorite}
                                isFavorite={isFavorite(movie)}
                            />
                        ))
                    }
                </MovieContainer>
                <MovieContainer titulo={"Em breve"}>
                    {
                        upcomingMovies.map((movie) =>(
                            <MovieCard
                                key={movie.id} {...movie}
                                handleFavorite={handleFavorite}
                                isFavorite={isFavorite(movie)}
                            />
                        ))
                    }
                </MovieContainer>
            </div>
            </>
        }
        </>
    )
}