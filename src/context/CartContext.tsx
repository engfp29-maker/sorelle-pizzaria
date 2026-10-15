"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Produto } from "@/data/cardapio";

export interface ItemCarrinho {
  id: string;
  chave: string;
  produto: Produto;
  quantidade: number;
  tamanho?: string;
  precoUnitario: number;
}

export type TipoEntrega = "entrega" | "retirada";

interface CartContextType {
  itens: ItemCarrinho[];
  adicionarAoCarrinho: (produto: Produto, tamanho?: string) => void;
  removerDoCarrinho: (id: string, tamanho?: string) => void;
  alterarQuantidade: (id: string, quantidade: number, tamanho?: string) => void;
  limparCarrinho: () => void;
  total: number;
  totalItens: number;
  // Checkout
  tipoEntrega: TipoEntrega;
  setTipoEntrega: (tipo: TipoEntrega) => void;
  observacoes: string;
  setObservacoes: (obs: string) => void;
  // UI
  carrinhoAberto: boolean;
  abrirCarrinho: () => void;
  fecharCarrinho: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tipoEntrega, setTipoEntrega] = useState<TipoEntrega>("entrega");
  const [observacoes, setObservacoes] = useState("");
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sorelle-carrinho");
    if (saved) {
      try {
        setItens(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("sorelle-carrinho", JSON.stringify(itens));
    }
  }, [itens, isLoaded]);

  function abrirCarrinho() {
    setCarrinhoAberto(true);
  }

  function fecharCarrinho() {
    setCarrinhoAberto(false);
  }

  function adicionarAoCarrinho(produto: Produto, tamanho?: string) {
    const precoUnitario =
      tamanho === "G" && produto.precoG
        ? produto.precoG
        : produto.precoM ?? produto.preco;

    setItens((prev) => {
      const chave = `${produto.id}-${tamanho ?? "unico"}`;
      const existente = prev.find(
        (item) => item.id === produto.id && item.tamanho === tamanho
      );
      if (existente) {
        return prev.map((item) =>
          item.id === produto.id && item.tamanho === tamanho
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: produto.id,
          chave,
          produto,
          quantidade: 1,
          tamanho,
          precoUnitario,
        },
      ];
    });
  }

  function removerDoCarrinho(id: string, tamanho?: string) {
    setItens((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.tamanho === tamanho)
      )
    );
  }

  function alterarQuantidade(id: string, quantidade: number, tamanho?: string) {
    if (quantidade <= 0) {
      removerDoCarrinho(id, tamanho);
      return;
    }
    setItens((prev) =>
      prev.map((item) =>
        item.id === id && item.tamanho === tamanho
          ? { ...item, quantidade }
          : item
      )
    );
  }

  function limparCarrinho() {
    setItens([]);
  }

  const total = itens.reduce(
    (acc, item) => acc + item.precoUnitario * item.quantidade,
    0
  );

  const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CartContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
        limparCarrinho,
        total,
        totalItens,
        tipoEntrega,
        setTipoEntrega,
        observacoes,
        setObservacoes,
        carrinhoAberto,
        abrirCarrinho,
        fecharCarrinho,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return context;
}