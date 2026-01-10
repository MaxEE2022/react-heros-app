import CustomJumbotron from "@/components/custom/CustomJumbotron";
import HeroStats from "@/heros/components/HeroStats";
import SearchControls from "./ui/SearchControls";
import CustomBreadCrumbs from "@/components/custom/CustomBreadCrumbs";

export default function SearchPage() {
  return (
    <>
      <CustomJumbotron title="Heros Search" description="Find you favorite super Hero" />

      <CustomBreadCrumbs/>

      <HeroStats />

      {/* Filter and search */}
      <SearchControls />



    </>
  )
}
