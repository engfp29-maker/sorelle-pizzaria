import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import ContatoInfo from "@/components/ContatoInfo";
import Footer from "@/components/Footer";
import { loja } from "@/data/loja";

export const metadata: Metadata = {
  title: "Contato & Localização",
  description:
    "Fale com a Pizzaria Sorelle pelo WhatsApp, veja nosso endereço, horários de funcionamento e localização no mapa.",
};

export default function ContatoPage() {
  return (
    <main className="pt-16">
      {/* Cabeçalho */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Onde nos encontrar
          </h1>
          <p className="text-gray-400 text-lg">
            Venha nos visitar ou peça sua pizza pelo WhatsApp — entregamos na
            sua casa!
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ContatoInfo />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Localização
              </h2>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-[400px] lg:h-[520px] bg-white">
              <iframe
                title="Mapa da localização da Pizzaria Sorelle"
                src={loja.mapaEmbed}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
