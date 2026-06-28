import { HeroSection } from "@/components/HeroSection";
import { ProductsSection } from "@/components/ProductsSection";
import { AboutSection } from "@/components/AboutSection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
