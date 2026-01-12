import { HerosAPI } from "../api/hero.api";
import type { Hero } from "../interfaces/hero.interface";

const BASE_IMAGE_URL = import.meta.env.VITE_IMG_API_URL;
export async function getHeroInformationAction(sluugId: string): Promise<Hero> {

    const { data } = await HerosAPI.get<Hero>(`/${sluugId}`,)

    const hero = {
        ...data,
        image: `${BASE_IMAGE_URL}/${data.image}`,
    }


    return hero;
}