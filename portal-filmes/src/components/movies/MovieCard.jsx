import { useContext } from 'react';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../../context/FavoritesContext';
import { WatchLaterContext } from '../../context/WatchLaterContext';

export default function MovieCard({ id, title, poster_path }) {
    const { handleFavorite, isFavorite } = useContext(FavoritesContext);
    const {handleWatchLater, isWatchLater} = useContext(WatchLaterContext);

    return (
        <div key={id} className="flex flex-col text-center justify-center items-center gap-y-4 flex-shrink-0 relative">
            <img src={`https://image.tmdb.org/t/p/w342${poster_path}`} alt={title} className="w-[160px] h-[250px] mt-3" />
            <button
                className="absolute top-1 -right-2 p-2 bg-white rounded-full transition ease-in-out duration-300 z-10 transform hover:scale-125"
                onClick={() => handleFavorite({ id, title, poster_path })}
            >
                {isFavorite({ id }) ? (
                    <MdFavorite className="text-red-500 transition-transform duration-300 ease-in-out transform scale-125" />
                ) : (
                    <MdFavoriteBorder className="text-black transition-transform duration-300 ease-in-out transform scale-100" />
                )}
            </button>
            <Link to={`/movies/${id}`} className="px-6 py-2 transition ease-in-out duration-300 bg-primary_color hover:bg-white text-white hover:text-primary_color rounded-xl font-[Raleway]">
                Ver detalhes
            </Link>
        </div>
    );
}
