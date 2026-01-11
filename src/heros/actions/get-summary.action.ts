import { HerosAPI } from "../api/hero.api";
import type { HeroSummaryResponse } from "../interfaces/heroSummary.response";


export async function getHerosSummaryAction():Promise<HeroSummaryResponse> {
    
    const {data} = await HerosAPI.get<HeroSummaryResponse>('/summary');

    return data;
}