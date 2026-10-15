"use client";

import { useState } from "react";
import { ShoppingCart, Menu, X, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CarrinhoDrawer from "./CarrinhoDrawer";
import { loja } from "@/data/loja";

export default function Header() {
  const { totalItens, abrirCarrinho } = useCart();
  const [menuAberto, setMenuAberto] = useState(false);

  const links = [
    { href: "/#cardapio", label: "Cardápio" },
    { href: "/#destaques", label: "Destaques" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuAberto(true)}
              className="md:hidden p-2 text-gray-700 hover:text-red-600 transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <a href="/" className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="Pizzaria Sorelle" className="h-12 w-auto" />
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-red-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${loja.telefoneBruto}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              Pedir
            </a>

            <button
              onClick={abrirCarrinho}
              className="relative p-2 text-gray-700 hover:text-red-600 transition-colors"
              aria-label="Abrir carrinho"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItens > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItens}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      {menuAberto && (
        <>
          <div
            onClick={() => setMenuAberto(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
          <div className="fixed top-0 left-0 h-full w-72 max-w-[80%] bg-white z-50 shadow-2xl flex flex-col p-6 md:hidden">
            <div className="flex items-center justify-between mb-8">
              <img src="/logo.jpeg" alt="Pizzaria Sorelle" className="h-10 w-auto" />
              <button
                onClick={() => setMenuAberto(false)}
                className="p-1 text-gray-500 hover:text-gray-700"
                aria-label="Fechar menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 text-lg font-medium text-gray-700">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuAberto(false)}
                  className="hover:text-red-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}

      <CarrinhoDrawer />
    </>
  );
}