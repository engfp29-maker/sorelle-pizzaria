"use client";

import { useState } from "react";
import { ShoppingCart, Phone } from "lucide-react";
import { produtos, type Categoria } from "@/data/cardapio";
import { loja } from "@/data/loja";
import { useCart } from "@/context/CartContext";
import Categorias from "./Categorias";
import CardProduto from "./CardProduto";
import CarrinhoDrawer from "./CarrinhoDrawer";

export default function GradeProdutos() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<Categoria>("todas");
  const { totalItens, abrirCarrinho } = useCart();

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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="text-center md:text-left flex-1">
            <h2 className="font-logo text-4xl md:text-5xl font-bold text-red-700 mb-2 tracking-wide font-logo">
              NOSSO CARDÁPIO
            </h2>
            <p className="text-lg text-gray-700 font-medium">
              Escolha sua pizza favorita e faça seu pedido!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${loja.telefoneBruto}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              Pedir
            </a>

            <button
              onClick={abrirCarrinho}
              className="relative flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-md"
              aria-label="Abrir carrinho"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Carrinho</span>
              {totalItens > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
                  {totalItens}
                </span>
              )}
            </button>
          </div>
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
      <CarrinhoDrawer />
    </section>
  );
}