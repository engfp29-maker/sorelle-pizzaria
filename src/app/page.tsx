import Hero from "@/components/Hero";
import Destaques from "@/components/Destaques";
import GradeProdutos from "@/components/GradeProdutos";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Destaques />
      <GradeProdutos />
      <Footer />
    </main>
  );
}