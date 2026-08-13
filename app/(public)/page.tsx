import { CtaSection } from "@/components/home/CtaSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { GenreSection } from "@/components/home/GenreSection";
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
      <GenreSection />
      <CtaSection />
    </>
  );
}
