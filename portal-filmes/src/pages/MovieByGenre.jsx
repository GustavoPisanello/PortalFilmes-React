import { useParams } from "react-router-dom";
import MovieCard from "../components/movies/MovieCard";
import { useEffect, useState } from "react";

export default function MoviesByGenrePage(){
    
    const {genero} = useParams();
    const [filmes, setFilmes] = useState([]);
    const [generos, setGeneros] = useState([]);

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=114e0cc10385f69dc6d21e2a19caf57a&language=pt-BR`)
        .then(response => response.json())
        .then(data => {setGeneros(data.genres)})
        .catch(err => console.error(err));
        
    }, []);	

    useEffect(() => {
        if (generos.length > 0) {
            const generoBuscado = generos.find((generoItem) => generoItem.name === genero);

            if (generoBuscado) {
                fetch(`https://api.themoviedb.org/3/discover/movie?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&with_genres=${generoBuscado.id}`)
                    .then(response => response.json())
                    .then(data => setFilmes(data.results))
                    .catch(err => console.error(err));
            }
        }
    }, [generos]);

    console.log(filmes)

    return(
        <>
            <section className="p-20">
            <h2 className='font-[Bebas] text-white text-5xl mb-10'> Filmes de {genero}</h2>
            <main className="flex flex-wrap gap-10 justify-center">
            {
                filmes.map((filme) => (
                    <MovieCard key={filme.id} {...filme}/>
                ))
            }
            </main>
            </section>
        </>
    )
}