import { HomeContent } from "./components/HomeContent";
import { HomeFooter } from "./components/HomeFooter";
import { HomeHeader } from "./components/HomeHeader";

export default function Home() {
  return (
    <main>
      <HomeHeader />
      <HomeContent />
      <HomeFooter />
    </main>
  );
}
