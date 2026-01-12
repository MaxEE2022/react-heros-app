import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../interfaces/hero.interface";


interface FavoriteHeroContext {

    //state
    favorites: Hero[],
    favoriteCount: number

    //Methods
    isFavorite: (hero: Hero) => boolean
    toggleFavorite: (hero: Hero) => void
}

// Nota: use Uppercase beacasuse is a component
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);


function getFavoritesFromLocalStorage(): Hero[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}


export function FavoriteHeroProvider({ children }: PropsWithChildren) {

    const [favoriteHeros, setFavoriteHeros] = useState<Hero[]>(getFavoritesFromLocalStorage);

    function isFavorite(hero: Hero) {
        return favoriteHeros.some((h) => h?.id === hero.id);
    }

    function toggleFavorite(hero: Hero) {
        const heroExist = favoriteHeros.find((h) => h?.id === hero.id);

        if (heroExist) {
            const newFavorites = favoriteHeros.filter((h) => h?.id !== hero.id);
            setFavoriteHeros(newFavorites)
            return;
        }

        // if do not exist then is added to the state
        setFavoriteHeros([...favoriteHeros, hero])

    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favoriteHeros));
    }, [favoriteHeros])

    return (
        <FavoriteHeroContext value={{
            favorites: favoriteHeros,
            favoriteCount: favoriteHeros.length,
            isFavorite,
            toggleFavorite,
        }}>
            {children}
        </FavoriteHeroContext>

    )
}