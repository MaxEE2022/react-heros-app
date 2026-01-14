import CustomJumbotron from "@/components/custom/CustomJumbotron";
import HeroStats from "@/heros/components/HeroStats";
import SearchControls from "./ui/SearchControls";
import CustomBreadCrumbs from "@/components/custom/CustomBreadCrumbs";
import HeroGrid from "@/heros/components/HeroGrid";
import { useQuery } from "@tanstack/react-query";
import { searchHeroAction } from "@/heros/actions/search-heros.action";
import { useSearchParams } from "react-router";

export default function SearchPage() {

  const [searchParams] = useSearchParams();


  const params = Object.fromEntries(searchParams);
  const { data: heros } = useQuery({
    queryKey: ['SearcheHeros', params],
    queryFn: () => searchHeroAction({ ...params, name: params.query }),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <CustomJumbotron title="Heros Search" description="Find you favorite super Hero" />

      <CustomBreadCrumbs />

      <HeroStats />

      {/* Filter and search */}
      <SearchControls />

      <HeroGrid heros={heros || []} />

    </>
  )
}
