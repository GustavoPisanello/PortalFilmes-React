import {useContext} from 'react';
import MovieCard from '../components/movies/MovieCard';
import { FavoritesContext } from '../context/FavoritesContext';

export default function Favorites(){

    const {favorites, handleFavorite, isFavorite} = useContext(FavoritesContext);

    return(
        <>
            <section className="w-full p-20">
                <h2 className="font-[Bebas] text-white text-5xl mb-10">Seus Favoritos</h2>
                {
                    favorites.length === 0 ? (
                        <p className='text-white font-[Raleway] text-xl'>Parece que você ainda não tem favoritos... 😭</p>
                    ) :
                    (
                        <div className="flex gap-x-12 gap-10 overflow-x-auto">
                            {
                                favorites.map((movie) => (
                                    <MovieCard key={movie.id} {...movie}
                                    handleFavorite={handleFavorite}
                                    isFavorite={isFavorite}
                                    />
                                ))
                            }
                        </div>
                    )
                }
            </section>
        </>
    )
}