import { useParams } from "react-router"

export default function HeroPage() {
  const { slugId = '' } = useParams();

  console.log(slugId)
  return (
    <div>HeroPage</div>
  )
}
