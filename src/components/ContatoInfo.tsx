"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, AtSign } from "lucide-react";
import { loja } from "@/data/loja";

export default function ContatoInfo() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Endereço</h3>
            <p className="text-gray-500 text-sm">{loja.endereco}</p>
            <p className="text-gray-500 text-sm">{loja.cidade}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-2">Horários</h3>
            <ul className="space-y-1">
              {loja.horarios.map((h) => (
                <li
                  key={h.dias}
                  className="flex justify-between text-sm text-gray-500"
                >
                  <span>{h.dias}</span>
                  <span className="font-medium text-gray-700">{h.horario}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-11 h-11 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">WhatsApp</h3>
            <p className="text-gray-500 text-sm">{loja.telefone}</p>
          </div>
        </div>
        <a
          href={`https://wa.me/${loja.telefoneBruto}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors"
        >
          Chamar no WhatsApp
        </a>
      </motion.div>

      <motion.a
        href={loja.instagram}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-red-200 transition-colors"
      >
        <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
          <AtSign className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Instagram</h3>
          <p className="text-gray-500 text-sm">@sorellepizzaria</p>
        </div>
      </motion.a>
    </div>
  );
}
