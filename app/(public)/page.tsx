import { FeaturedSection } from "@/components/home/FeaturedSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestSection } from "@/components/home/LatestSection";
import { TopRatedSection } from "@/components/home/TopRatedSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <TopRatedSection />
      <LatestSection />
    </>
  );
}
