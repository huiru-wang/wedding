import CountdownHero from "@/components/CountdownHero";
import CalendarSection from "@/components/CalendarSection";
import { travelMarkers } from "@/lib/data";
import { TravelContainer } from "@/components/TravelContainer";
import WeddingMapComponent from "@/components/WeddingMapComponent";

export default function Home() {
  return (
    <div className="font-sans min-h-screen w-full overflow-x-hidden snap-y snap-mandatory scroll-smooth">
      <CountdownHero />
      <CalendarSection />
      <WeddingMapComponent />
      <TravelContainer travelMarkers={travelMarkers} />
    </div>
  );
}
