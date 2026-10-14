"use client";

import { useState } from "react";
import { ShoppingCart, X, Plus, Minus, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const { itens, total, totalItens, alterarQuantidade, removerDoCarrinho, limparCarrinho } = useCart();

  function formatarPreco(valor: number) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }

  function gerarMensagemWhatsApp() {
    const linhas = itens.map(
      (item) =>
        `- ${item.quantidade}x ${item.produto.nome}${item.tamanho ? ` (${item.tamanho})` : ""} = ${formatarPreco(item.precoUnitario * item.quantidade)}`
    );
    const mensagem = `🍕 *Novo Pedido - Pizzaria Sorelle* 🍕\n\n${linhas.join("\n")}\n\n*Total: ${formatarPreco(total)}*\n\nObrigado!`;
    const numero = "5591985148886";
    window.open(
      `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`,
      "_blank"
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Pizzaria Sorelle" className="h-12 w-auto" />
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#cardapio" className="hover:text-red-600 transition-colors">Cardápio</a>
            <a href="#contato" className="hover:text-red-600 transition-colors">Contato</a>
          </nav>

          <button
            onClick={() => setCarrinhoAberto(true)}
            className="relative p-2 text-gray-700 hover:text-red-600 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItens > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItens}
              </span>
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {carrinhoAberto && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCarrinhoAberto(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold text-gray-800">Seu Pedido</h2>
                <button onClick={() => setCarrinhoAberto(false)} className="p-1 text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {itens.length === 0 ? (
                  <p className="text-center text-gray-400 mt-8">Carrinho vazio</p>
                ) : (
                  itens.map((item) => (
                    <div key={`${item.id}-${item.tamanho ?? "unico"}`} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800">{item.produto.nome}</p>
                        {item.tamanho && (
                          <p className="text-xs text-gray-500">{item.tamanho}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {formatarPreco(item.precoUnitario)} cada
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alterarQuantidade(item.id, item.quantidade - 1, item.tamanho)}
                          className="p-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantidade}</span>
                        <button
                          onClick={() => alterarQuantidade(item.id, item.quantidade + 1, item.tamanho)}
                          className="p-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right min-w-[70px]">
                        <p className="font-medium text-sm text-gray-800">
                          {formatarPreco(item.precoUnitario * item.quantidade)}
                        </p>
                        <button
                          onClick={() => removerDoCarrinho(item.id, item.tamanho)}
                          className="text-xs text-red-500 hover:text-red-700 mt-1"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {itens.length > 0 && (
                <div className="border-t p-4 space-y-3">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>{formatarPreco(total)}</span>
                  </div>
                  <button
                    onClick={gerarMensagemWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Fechar Pedido via WhatsApp
                  </button>
                  <button
                    onClick={limparCarrinho}
                    className="w-full text-sm text-gray-500 hover:text-red-600 py-2 transition-colors"
                  >
                    Limpar Carrinho
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}