import {useContext} from 'react';
import MovieCard from '../components/movies/MovieCard';
import { FavoritesContext } from '../context/FavoritesContext';
import { WatchLaterContext } from '../context/WatchLaterContext';
import { WatchedContext } from '../context/WatchedContext';
import MovieContainer from '../components/movies/MovieContainer';

export default function MyList(){

    const {favorites, handleFavorite, isFavorite} = useContext(FavoritesContext);
    const {watchLater, handleWatchLater, isWatchLater} = useContext(WatchLaterContext);
    const {watched, handleWatched, isWatched} = useContext(WatchedContext);

    return(
        <>
            <section className="w-full p-20">
                <div className="flex flex-col w-full gap-y-32">
                    <div>
                        <h2 className="font-[Bebas] text-white text-5xl mb-10">Seus Favoritos</h2>
                        {
                            favorites.length === 0 ? (
                                <p className='text-white font-[Raleway] text-xl mb-32'>Parece que você ainda não tem favoritos... 😭</p>
                            ) :
                            (
                                <MovieContainer>
                                    {
                                        favorites.map((movie) => (
                                            <MovieCard key={movie.id} {...movie}
                                            handleFavorite={handleFavorite}
                                            isFavorite={isFavorite}
                                            />
                                        ))
                                    }
                                </MovieContainer>
                            )
                        }
                    </div>
                    <div>
                        <h2 className="font-[Bebas] text-white text-5xl mb-10">Assistir mais tarde</h2>
                        {
                            watchLater.length === 0 ? (
                                <p className='text-white font-[Raleway] text-xl mb-32'>Parece que você ainda não tem filmes para assistir mais tarde... 😭</p>
                            ) :
                            (
                                <MovieContainer>
                                    {
                                        watchLater.map((movie) => (
                                            <MovieCard key={movie.id} {...movie}
                                            handleWatchLater={handleWatchLater}
                                            isWatchLater={isWatchLater}
                                            />
                                        ))
                                    }
                                </MovieContainer>
                            )
                        }
                    </div>
                    <div>
                        <h2 className="font-[Bebas] text-white text-5xl mb-10">Filmes Assistidos</h2>
                        {
                            watched.length === 0 ? (
                                <p className='text-white font-[Raleway] text-xl'>Parece que você ainda não adicionou filmes assistidos... 😭</p>
                            ) :
                            (
                                <MovieContainer>
                                    {
                                        watched.map((movie) => (
                                            <MovieCard key={movie.id} {...movie}
                                            handleWatched={handleWatched}
                                            isWatched={isWatched}
                                            />
                                        ))
                                    }
                                </MovieContainer>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}