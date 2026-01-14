import { HerosAPI } from "../api/hero.api";
import type { Hero } from "../interfaces/hero.interface";

interface Options {
    name?: string,
    team?: string,
    category?: string,
    universe?: string,
    status?: string,
    strength?: string
}
const BASE_IMAGE_URL = import.meta.env.VITE_IMG_API_URL;
const validParamsKeys = [
    'name',
    'team',
    'category',
    'universe',
    'status',
    'strength'
]
export async function searchHeroAction(queryParams: Options): Promise<Hero[]> {

    if (!queryParams ||  Object.keys(queryParams).length === 0) {
        return []
    }

    const validParams: Options = {};

    validParamsKeys.forEach((key) => {
        const k = key as keyof Options
        if (queryParams[k]) {
            validParams[k] = queryParams[k]
        }
    });

    if (Object.keys(validParams).length === 0) {
        return [];
    }

    const { data } = await HerosAPI.get<Hero[]>('/search', {
        params: validParams,
    });

    const searchedHeros = data.map((hero): Hero => ({
        ...hero,
        image: `${BASE_IMAGE_URL}/${hero.image}`,
        strength: hero.strength * 10,
        intelligence: hero.intelligence * 10,
        speed: hero.speed * 10,
        durability: hero.durability * 10
    }));

    return searchedHeros;
}