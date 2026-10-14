"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import type { Produto } from "@/data/cardapio";
import { useCart } from "@/context/CartContext";

interface Props {
  produto: Produto;
  index: number;
}

export default function CardProduto({ produto, index }: Props) {
  const { adicionarAoCarrinho } = useCart();
  const temTamanhos = produto.precoM !== undefined && produto.precoG !== undefined;
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<"M" | "G">("M");

  function formatarPreco(valor: number) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }

  function getPrecoAtual() {
    if (temTamanhos && tamanhoSelecionado === "G" && produto.precoG) {
      return produto.precoG;
    }
    return produto.precoM ?? produto.preco;
  }

  function handleAdicionar() {
    adicionarAoCarrinho(produto, tamanhoSelecionado);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {produto.destaque && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Destaque
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg mb-1">{produto.nome}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{produto.descricao}</p>

        {temTamanhos && (
          <div className="flex gap-1 mb-3 flex-wrap">
            <button
              onClick={() => setTamanhoSelecionado("M")}
              className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                tamanhoSelecionado === "M"
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-gray-50 text-gray-500 border-gray-200 hover:border-red-300"
              }`}
            >
              Média (6 fatias) {formatarPreco(produto.precoM!)}
            </button>
            <button
              onClick={() => setTamanhoSelecionado("G")}
              className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                tamanhoSelecionado === "G"
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-gray-50 text-gray-500 border-gray-200 hover:border-red-300"
              }`}
            >
              Grande (8 fatias) {formatarPreco(produto.precoG!)}
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-red-600">
            {formatarPreco(getPrecoAtual())}
          </span>
          <button
            onClick={handleAdicionar}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>
    </motion.div>
  );
}