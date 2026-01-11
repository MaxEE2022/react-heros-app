import { useQuery } from "@tanstack/react-query";
import { getHerosByPage } from "../actions/get-heros-by-page.action";

export default function usePaginatedHero(page: number, limit: number, category: string) {

    return useQuery(
        {
            queryKey: ['GetHeros', { page, limit, category }],
            queryFn: () => getHerosByPage(page, limit, category),
            staleTime: 1000 * 60 * 5,
        },


    );
}
