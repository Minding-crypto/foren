import { DropsGrid } from "@/components/DropsGrid"
import { Footer } from "@/components/Footer"
import { HeroSection } from "@/components/HeroSection"
import { HowItWorks } from "@/components/HowItWorks"
import { Navbar } from "@/components/Navbar"
import { StatsBar } from "@/components/StatsBar"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <HowItWorks />
      <DropsGrid />
      <Footer />
    </main>
  )
}
