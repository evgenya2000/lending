import { ContainerLending } from "@/widgets/container-lending/ui/container-lending";
import { cards } from "../config/cards.setup";
import { ContainerFilters } from "@/widgets/container-filters/ui/container-filters";
import { ContainerMain } from "@/widgets/main/ui/conteiner-main";

export default function HomePage() {
  return (
    <ContainerMain
      left={
        <ContainerFilters/>
      }
      right={
        <ContainerLending cards={cards}/>
      }
    />
  );
}