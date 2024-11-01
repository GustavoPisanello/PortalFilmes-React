import React, {useContext, useState, useEffect, createContext} from 'react'
import { MdSwipeLeftAlt } from 'react-icons/md';

export const WatchedContext = createContext();

export const WatchedProvider = ({children}) => {
    const [watched, setWatched] = useState([]);
    
    useEffect(() => {
        const storedWatched = JSON.parse(localStorage.getItem("watched")) || [];
        setWatched(storedWatched);
    }, []);

    const handleWatched = (movie) => {
        let updatedWatched = [...watched];
        const isWatched = updatedWatched.some(w => w.id === movie.id);

        if(isWatched){
            updatedWatched = updatedWatched.filter(w => w.id !== movie.id);
        } else{
            updatedWatched.push(movie);
        }

        setWatched(updatedWatched);
        localStorage.setItem("watched", JSON.stringify(updatedWatched));

        
    };

    const isWatched = (movie) => {
        return watched.some(w => w.id === movie.id);
    };

    return(
        <WatchedContext.Provider value={{watched, handleWatched, isWatched}}>
            {children}
        </WatchedContext.Provider>
    )
}