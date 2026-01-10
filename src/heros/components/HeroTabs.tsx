
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTab } from "@/hooks/useTab";
import { Heart } from "lucide-react";

export default function HeroTabs() {
   const { activeTab, setActiveTab } = useTab();

    
    return (
        <Tabs value={activeTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger onClick={() => setActiveTab('all')} value="all">All Characters (16)</TabsTrigger>
                <TabsTrigger onClick={() => setActiveTab('favorites')} value="favorites" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Favorites (3)
                </TabsTrigger>
                <TabsTrigger onClick={() => setActiveTab('heroes')} value="heroes">Heroes (12)</TabsTrigger>
                <TabsTrigger onClick={() => setActiveTab('villains')} value="villains">Villains (2)</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
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
            </TabsContent>
        </Tabs>
    )
}
