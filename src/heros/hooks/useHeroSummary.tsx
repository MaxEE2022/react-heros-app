import { useQuery } from "@tanstack/react-query";
import { getHerosSummaryAction } from "../actions/get-summary.action";

export default function useHeroSummary() {
    return useQuery({
        queryKey: ['getHeroSummary'],
        queryFn: getHerosSummaryAction,
        staleTime: 1000 * 60 * 5
    });

}
