import { HerosAPI } from "../api/hero.api";
import type { Hero } from "../interfaces/hero.interface";
import type { HeroResponse } from "../interfaces/heros.response";

const BASE_IMAGE_URL = import.meta.env.VITE_IMG_API_URL;
export async function getHerosByPage(page: number = 1, limit: number = 6, category: string = 'all'): Promise<HeroResponse> {
    const ValidTabs = ['all', 'favorites', 'hero', 'villain',];
    if (isNaN(page)) {
        page = 1;
    }
    if (isNaN(limit)) {
        limit = 6;
    }
    if (!ValidTabs.includes(category)) {
        category = 'all'
    }

    const { data } = await HerosAPI.get<HeroResponse>('/', {
        params: {
            limit: limit,
            offset: (page - 1) * limit,
            category: category,
        }
    });


    const heroes = data.heroes.map((hero): Hero => ({
        id: hero.id,
        name: hero.name,
        slug: hero.slug,
        alias: hero.alias,
        powers: hero.powers,
        description: hero.description,
        strength: hero.strength * 10,
        intelligence: hero.intelligence * 10,
        speed: hero.speed * 10,
        durability: hero.durability * 10,
        team: hero.team,
        image: `${BASE_IMAGE_URL}/${hero.image}`,
        firstAppearance: hero.firstAppearance,
        status: hero.status,
        category: hero.category,
        universe: hero.universe,
    }));

    return {
        ...data,
        heroes: heroes,
    };
}