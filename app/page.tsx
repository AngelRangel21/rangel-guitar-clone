// ============================================
// app/page.tsx - Homepage actualizada
// ============================================
import { Hero } from "@/components/home/hero";
import { TrendingSection } from "@/components/home/trending-section";
import { RecentSection } from "@/components/home/recent-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrendingSection />
      <RecentSection />
    </>
  );
}
