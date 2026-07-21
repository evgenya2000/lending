import { ContainerLending } from "@/widgets/container-lending/ui/container-lending";
import { Main } from "@/widgets/main/ui/main";

export default function HomePage() {
  const cards = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6},{id: 7},{id: 8},{id: 9},];
  return (
    <Main>
      <ContainerLending cards={cards}/>
    </Main>
  );
}