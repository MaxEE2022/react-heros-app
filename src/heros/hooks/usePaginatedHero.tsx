import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getHerosByPage } from "../actions/get-heros-by-page.action";
import { useSearchParams } from "react-router";
import { use, useEffect } from "react";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";

export default function usePaginatedHero() {
    const [searchparams, setSearchParams] = useSearchParams();
    const page = parseInt(searchparams.get('page') || '1');
    const limit = parseInt(searchparams.get('limit') || '6');
    const category = (searchparams.get('tab') || 'all');

    const { favoriteCount, favorites } = use(FavoriteHeroContext)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 'smooth' para un deslizamiento suave, 'auto' para instantáneo
        });
    }, [page, category]);

    const query = useQuery(
        {
            queryKey: ['GetHeros', { page, limit, category }, favorites],
            queryFn: () => getHerosByPage(page, limit, category, { favoriteCount, favorites }),
            staleTime: 1000 * 60 * 5,
            placeholderData: keepPreviousData
        },


    );

    useEffect(() => {
        // Si no estamos cargando y tenemos datos
        if (query.data) {
            const totalPages = query.data.pages;

            // Si la página actual es mayor que el total de páginas disponibles
            // y al menos hay 1 página (para no entrar en bucle si no hay favoritos)
            if (page > totalPages && totalPages > 0) {
                setSearchParams({ tab: category, page: totalPages.toString() });
            }
            // Si eliminamos el último favorito de la página 1, nos aseguramos de estar en la 1
            else if (page > 1 && totalPages === 0) {
                setSearchParams({ tab: category, page: '1' });
            }
        }
    }, [query.data?.pages, page, category, setSearchParams]);

    return query;
}
