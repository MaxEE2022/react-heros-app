import CustomBreadCrumbs from "@/components/custom/CustomBreadCrumbs"
import CustomJumbotron from "@/components/custom/CustomJumbotron"
import CustomPagination from "@/components/custom/CustomPagination"
import HeroGrid from "@/heros/components/HeroGrid"
import HeroStats from "@/heros/components/HeroStats"
import HeroTabs from "@/heros/components/HeroTabs"
import usePaginatedHero from "@/heros/hooks/usePaginatedHero"

export default function HomePage() {
  1



  // const { favorites, favoriteCount } = use(FavoriteHeroContext);

  const { data, isPending, isError, error } = usePaginatedHero();

  if (isPending && !data)
    return <h2>Loading ...</h2>

  if (isError)
    return <h2>{`somethini went wrong Erro: ${error}}`}</h2>

  // const totalPages = data.pages;
  // const heros = data.heroes;
  const totalPages = data?.pages || 1;
  const heros = data?.heroes || [];

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