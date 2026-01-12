import { Badge } from "@/components/ui/badge";
import { Heart, Trophy, Users, Zap } from "lucide-react";
import useHeroSummary from "../hooks/useHeroSummary";
import HeroStatCard from "./HeroStatCard";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";
import { use } from "react";

export default function HeroStats() {

    const { data: summary, isPending, isError, error } = useHeroSummary();
    const { favoriteCount } = use(FavoriteHeroContext);



    if (isPending)
        return <h2>Loading ...</h2>

    if (isError)
        return <h2>{`somethini went wrong Erro: ${error}}`}</h2>

    const { heroCount, smartestHero, strongestHero, totalHeroes, villainCount } = summary;
    const { name: strongestName, strength: strongestStrength } = strongestHero;
    const { name: smartestName, intelligence: smartestIntelligence } = smartestHero;


    return (
        <>
            < div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" >


                <HeroStatCard
                    title="Total Characters"
                    Icon={Users}
                >
                    <div className="text-2xl font-bold">{totalHeroes}</div>
                    <div className="flex gap-1 mt-2">
                        <Badge variant="secondary" className="text-xs">
                            {heroCount} Heroes
                        </Badge>
                        <Badge variant="destructive" className="text-xs">
                            {villainCount} Villains
                        </Badge>
                    </div>
                </HeroStatCard>

                <HeroStatCard
                    title="Favorites"
                    Icon={Heart}
                >
                    <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
                    <p className="text-xs text-muted-foreground">{((favoriteCount / totalHeroes) * 100).toFixed(2)}% of total</p>
                </HeroStatCard>


                <HeroStatCard
                    title="Strongest"
                    Icon={Zap}
                >
                    <div className="text-lg font-bold">{strongestName}</div>
                    <p className="text-xs text-muted-foreground">Strength: {strongestStrength}/10</p>
                </HeroStatCard>
                <HeroStatCard
                    title="Smartest"
                    Icon={Trophy}
                >
                    <div className="text-lg font-bold">{smartestName}</div>
                    <p className="text-xs text-muted-foreground">Intelligence: {smartestIntelligence}/10</p>
                </HeroStatCard>


            </div >
        </>
    )
}
