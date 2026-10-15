"use client";

import { motion } from "framer-motion";
import { Flame, Truck, Clock, Star } from "lucide-react";

const beneficios = [
  { icone: Flame, titulo: "Forno a lenha", texto: "Massa artesanal e sabor defumado" },
  { icone: Truck, titulo: "Entrega rápida", texto: "Sua pizza quentinha em casa" },
  { icone: Clock, titulo: "Aberto à noite", texto: "Todos os dias a partir das 18h" },
  { icone: Star, titulo: "Desde 1998", texto: "Tradição italiana na região" },
];

export default function Destaques() {
  return (
    <section id="destaques" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {beneficios.map((b, i) => (
            <motion.div
              key={b.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-4 md:p-6 rounded-2xl bg-gray-50 hover:bg-red-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
                <b.icone className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                {b.titulo}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm mt-1">{b.texto}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
