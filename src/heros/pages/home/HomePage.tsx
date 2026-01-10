import CustomBreadCrumbs from "@/components/custom/CustomBreadCrumbs"
import CustomJumbotron from "@/components/custom/CustomJumbotron"
import CustomPagination from "@/components/custom/CustomPagination"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getHerosByPage } from "@/heros/actions/get-heros-by-page.action"
import HeroGrid from "@/heros/components/HeroGrid"
import HeroStats from "@/heros/components/HeroStats"
import { TabsContent } from "@radix-ui/react-tabs"
import { useQuery } from "@tanstack/react-query"
import {
  Heart
} from "lucide-react"
import { useSearchParams } from "react-router"

export default function HomePage() {

  const [searchparams] = useSearchParams();
  const page = parseInt(searchparams.get('page') || '1');
  const { data, isLoading, error } = useQuery(
    {
      queryKey: ['GetHeros', page],
      queryFn: () => getHerosByPage(page),
    },
    

  );

  if (isLoading)
    return <h2>Loading ...</h2>

  if (error)
    return <h2>{`somethini went wrong Erro: ${error}}`}</h2>

  const totalPages = data?.totalPages;
  const heros = data?.heroes;
  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron title="Super Heros App" description="Find, Explore, and Discover your Favorite Super Heros" />

        <CustomBreadCrumbs />

        {/* Stats Dashboard */}
        <HeroStats />


        {/* Tabs */}
        <Tabs value="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Characters (16)</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes">Heroes (12)</TabsTrigger>
            <TabsTrigger value="villains">Villains (2)</TabsTrigger>
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

        {/* Results info */}
        {/* <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">Showing 6 of 16 characters</p>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Filter className="h-3 w-3" />
              Filtered
            </Badge>
          </div>
        </div> */}


        {/* Hero Grid */}
        <HeroGrid heros={heros}/>



        {/* Pagination */}
        <CustomPagination totalPages={totalPages || 1} />
      </>
    </>
  )
}