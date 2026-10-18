"use client";

import { useState } from "react";
import { ShoppingCart, Menu, X, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CarrinhoDrawer from "./CarrinhoDrawer";
import { loja } from "@/data/loja";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-3 md:px-4 h-20 md:h-24 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 md:gap-3 min-w-0">
            <a href="/" className="flex items-center gap-3 shrink-0">
              <img
                src="/logo.jpeg"
                alt="Pizzaria Sorelle"
                className="logo-img logo-plate h-16 md:h-24 w-auto rounded-xl p-0.5"
              />
            </a>
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