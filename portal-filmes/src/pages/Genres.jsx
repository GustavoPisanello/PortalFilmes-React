import { useEffect, useState } from "react";
import GenreCard from "../components/genres/GenreCard";

export default function Genres(){

    const [genre, setGenre] = useState([]);

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=114e0cc10385f69dc6d21e2a19caf57a&language=pt-BR`
        )
        .then(response => response.json())
        .then(data => {setGenre(data.genres)})
        .catch(e => console.error(e));
    }, []);

    return(
        <>
            <section className="w-screen p-20">
                <h2 className="font-[Bebas] text-white text-5xl mb-10">Filtre por gênero</h2>
                <main className="flex flex-wrap gap-10 justify-center">
                    {
                        genre.map((genre) => (
                            <GenreCard key={genre.id} {...genre}/>
                        ))
                    }
                </main>
            </section>
        </>
    )
}