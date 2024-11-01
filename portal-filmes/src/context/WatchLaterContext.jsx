import React, {createContext, useState, useEffect} from "react";

export const WatchLaterContext = createContext();

export const WatchLaterProvider = ({children}) => {
    const [watchLater, setWatchLater] = useState([]);

    useEffect(()=> {
        const storedWatchLater = JSON.parse(localStorage.getItem('WatchLater')) || [];
        setWatchLater(storedWatchLater);
    }, []);

    const handleWatchLater = (movie) => {
        let updatedWatchLater = [...watchLater];

        const isWatchLater = updatedWatchLater.some(wl => wl.id === movie.id);

        if(isWatchLater){
            updatedWatchLater = updatedWatchLater.filter(wl => wl.id !== movie.id);
        } else{
            updatedWatchLater.push(movie);
        }

        setWatchLater(updatedWatchLater);
        localStorage.setItem('WatchLater', JSON.stringify(updatedWatchLater));
    };

    const isWatchLater = (movie) => {
        return watchLater.some(wl => wl.id === movie.id);
    };

    return(
        <WatchLaterContext.Provider value={{watchLater, handleWatchLater, isWatchLater}}>
            {children}
        </WatchLaterContext.Provider>
    )
}