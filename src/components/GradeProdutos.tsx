"use client";

import { useState } from "react";
import { produtos, type Categoria } from "@/data/cardapio";
import Categorias from "./Categorias";
import CardProduto from "./CardProduto";

export default function GradeProdutos() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<Categoria>("todas");

  const filtrados =
    categoriaAtiva === "todas"
      ? produtos
      : produtos.filter((p) => p.categoria === categoriaAtiva);

  return (
    <section id="cardapio" className="py-16 px-4 bg-gray-50 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img src="/fundo-cardapio.jpeg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Nosso Cardápio
          </h2>
          <p className="text-gray-500">
            Escolha sua pizza favorita e faça seu pedido!
          </p>
        </div>

        <div className="mb-8">
          <Categorias ativa={categoriaAtiva} onChange={setCategoriaAtiva} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((produto, index) => (
            <CardProduto key={produto.id} produto={produto} index={index} />
          ))}
        </div>

        {filtrados.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            Nenhum produto encontrado nesta categoria.
          </p>
        )}
      </div>
    </section>
  );
}