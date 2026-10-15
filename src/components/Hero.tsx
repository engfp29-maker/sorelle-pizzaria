"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { loja } from "@/data/loja";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/fundo-cardapio.jpeg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl py-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-red-400 font-medium text-sm md:text-lg mb-4 tracking-wider uppercase"
        >
          Desde 1998
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Pizzaria{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400">
            Sorelle
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-base md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          A melhor pizza artesanal da região. Massa fina, ingredientes frescos e
          o sabor que só a tradição italiana pode oferecer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#cardapio"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-medium text-base md:text-lg transition-all hover:scale-105 shadow-lg"
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
          transition={{ delay: 1.2 }}
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