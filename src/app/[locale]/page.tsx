import HeroSection from "@/components/home/HeroSection";
import StoryPreview from "@/components/home/StoryPreview";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ToursSection from "@/components/home/ToursSection";
import GallerySection from "@/components/home/GallerySection";
import MapCTA from "@/components/home/MapCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StoryPreview />
      <FeaturedProducts />
      <ToursSection />
      <GallerySection />
      <MapCTA />
    </>
  );
}
