"use client";

import { categorias, type Categoria } from "@/data/cardapio";
import { Pizza, CakeSlice, Wine, UtensilsCrossed, IceCream } from "lucide-react";

const iconeMap: Record<string, React.ReactNode> = {
  Pizza: <Pizza className="w-5 h-5" />,
  CakeSlice: <CakeSlice className="w-5 h-5" />,
  Wine: <Wine className="w-5 h-5" />,
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5" />,
  IceCream: <IceCream className="w-5 h-5" />,
};

interface Props {
  ativa: Categoria;
  onChange: (cat: Categoria) => void;
}

export default function Categorias({ ativa, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categorias.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            ativa === cat.id
              ? "bg-red-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {iconeMap[cat.icone]}
          {cat.nome}
        </button>
      ))}
    </div>
  );
}