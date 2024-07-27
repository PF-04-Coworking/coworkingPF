import { Hero } from "@/app/page/Hero/Hero";
import { Header } from "@/app/page/Header/Header";
import { Description } from "@/app/page/Description/Description";
import { Features } from "./page/Features/Features";
import { Testimonials } from "./page/Testimonials/Testimonials";
import { CallToAction } from "./page/CallToAction/CallToAction";
import { Footer } from "./page/Footer/Footer";

export default function Home() {
  return (
    <div
      className="h-full min-h-screen bg-no-repeat bg-top bg-contain"
      style={{ backgroundImage: "url(/fondo.png)" }}
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
