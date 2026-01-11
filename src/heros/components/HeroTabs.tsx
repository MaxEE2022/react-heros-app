
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTab } from "@/hooks/useTab";
import { Heart } from "lucide-react";
import useHeroSummary from "../hooks/useHeroSummary";

export default function HeroTabs() {
    const { activeTab, setActiveTab } = useTab();

    const { data: summary, isPending, isError, error } = useHeroSummary();


    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }
    const { heroCount, totalHeroes, villainCount } = summary

    return (
        <Tabs value={activeTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger onClick={() => setActiveTab('all')} value="all">All Characters ({totalHeroes})</TabsTrigger>
                <TabsTrigger onClick={() => setActiveTab('favorites')} value="favorites" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Favorites (3)
                </TabsTrigger>
                <TabsTrigger onClick={() => setActiveTab('hero')} value="hero">Heroes ({heroCount})</TabsTrigger>
                <TabsTrigger onClick={() => setActiveTab('villain')} value="villain">Villains ({villainCount})</TabsTrigger>
            </TabsList>

            {/* <TabsContent value="all">
                todos los personajes
            </TabsContent>
            <TabsContent value="favorites">
                Favorites
            </TabsContent>
            <TabsContent value="heroes">
                Heros
            </TabsContent>
            <TabsContent value="villains">
                Villians
            </TabsContent> */}
        </Tabs>
    )
}
