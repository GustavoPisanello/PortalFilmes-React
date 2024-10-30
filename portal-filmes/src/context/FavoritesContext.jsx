import React, {createContext, useState, useEffect} from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const handleFavorite = (movie) => {
        let updatedFavorites = [...favorites];
        const isFavorite = updatedFavorites.some(fav => fav.id === movie.id);

        if(isFavorite) {
            updatedFavorites = updatedFavorites.filter(fav => fav.id !== movie.id);
        }
        else{
            updatedFavorites.push(movie);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const isFavorite = (movie) => {
        return favorites.some(fav => fav.id === movie.id);
    };

    return(
        <FavoritesContext.Provider value={{favorites, handleFavorite, isFavorite}}>
            {children}
        </FavoritesContext.Provider>
    )

}