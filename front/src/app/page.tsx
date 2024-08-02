import { Hero } from "@/app/_page/_components/Hero/Hero";
import { Header } from "@/app/_page/_components/HeaderSection";
import { Description } from "@/app/_page/_components/DescriptionSection";
import { Features } from "./_page/_components/FeaturesSection";
import { Testimonials } from "./_page/_components/TestimonialsSection";
import { CallToAction } from "./_page/_components/CallToActionSection";
import { Footer } from "./_page/_components/FooterSection";


export default function Page() {
  return (
    <div
      className="h-full min-h-screen bg-no-repeat bg-top bg-contain"
      style={{ backgroundImage: "url(/images/fondo-1.png)" }}
    >
      <Header />
      <Hero />
      <Description />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
