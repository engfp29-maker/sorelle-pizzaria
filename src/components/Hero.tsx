"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { loja } from "@/data/loja";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 filter blur-[3px]"
        style={{
          backgroundImage: "url('/logo.jpeg')",
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl py-12 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <img
            src="/logo.jpeg"
            alt="Pizzaria Sorelle"
            className="w-56 sm:w-72 md:w-96 h-auto mx-auto rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] border border-white/10"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-xl md:text-2xl text-white font-medium mb-8 max-w-2xl mx-auto text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
        >
          A melhor pizza artesanal da região. Massa fina, ingredientes frescos e
          o sabor que só a tradição italiana pode oferecer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#cardapio"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold text-base md:text-lg transition-all hover:scale-105 shadow-lg"
          >
            Ver Cardápio
          </a>
          <a
            href={`https://wa.me/${loja.telefoneBruto}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium text-base md:text-lg transition-all hover:scale-105 shadow-lg"
          >
            Pedir no WhatsApp
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-14"
        >
          <a
            href="#cardapio"
            className="inline-flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-sm">Role para baixo</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}