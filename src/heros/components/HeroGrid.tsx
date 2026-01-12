import type { Hero } from "../interfaces/hero.interface";
import HeroGridCard from "./HeroGridCard";

interface Props {
    heros?: Hero[]
}

export default function HeroGrid({ heros }: Props) {
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">


            {
                (heros && heros.length > 0) &&
                heros.map((hero) => (

                    <HeroGridCard key={hero.slug} hero={hero} />
                ))

            }


        </div>
    )
}
