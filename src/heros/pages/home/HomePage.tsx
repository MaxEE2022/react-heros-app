import CustomBreadCrumbs from "@/components/custom/CustomBreadCrumbs"
import CustomJumbotron from "@/components/custom/CustomJumbotron"
import CustomPagination from "@/components/custom/CustomPagination"
import { getHerosByPage } from "@/heros/actions/get-heros-by-page.action"
import HeroGrid from "@/heros/components/HeroGrid"
import HeroStats from "@/heros/components/HeroStats"
import HeroTabs from "@/heros/components/heroTabs"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"

export default function HomePage() {
  1

  const [searchparams] = useSearchParams();
  const page = parseInt(searchparams.get('page') || '1');
  const limit = parseInt(searchparams.get('limit') || '6');
  const { data, isLoading, error } = useQuery(
    {
      queryKey: ['GetHeros', { page, limit }],
      queryFn: () => getHerosByPage(page, limit),
      staleTime: 1000 * 60 * 5,
    },


  );

  if (isLoading)
    return <h2>Loading ...</h2>

  if (error)
    return <h2>{`somethini went wrong Erro: ${error}}`}</h2>

  const totalPages = data?.pages;
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
        <HeroTabs />


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
        <HeroGrid heros={heros} />



        {/* Pagination */}
        <CustomPagination totalPages={totalPages || 1} />
      </>
    </>
  )
}