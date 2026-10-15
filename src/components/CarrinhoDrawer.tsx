"use client";

import { useState } from "react";
import { X, Plus, Minus, Trash2, Bike, Store, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { loja } from "@/data/loja";

function formatarPreco(valor: number) {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

export default function CarrinhoDrawer() {
  const {
    itens,
    total,
    totalItens,
    alterarQuantidade,
    removerDoCarrinho,
    limparCarrinho,
    tipoEntrega,
    setTipoEntrega,
    observacoes,
    setObservacoes,
    carrinhoAberto,
    fecharCarrinho,
  } = useCart();

  const [etapa, setEtapa] = useState<"carrinho" | "dados">("carrinho");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("Pix");

  function gerarMensagemWhatsApp() {
    const linhas = itens.map(
      (item) =>
        `• ${item.quantidade}x ${item.produto.nome}${
          item.tamanho ? ` (${item.tamanho})` : ""
        } — ${formatarPreco(item.precoUnitario * item.quantidade)}`
    );

    const partes: string[] = [
      "🍕 *NOVO PEDIDO — Pizzaria Sorelle* 🍕",
      "",
      "*Itens:*",
      ...linhas,
      "",
      `*Total: ${formatarPreco(total)}*`,
      "",
    ];

    if (nome.trim()) partes.push(`*Cliente:* ${nome.trim()}`);
    partes.push(`*Tipo:* ${tipoEntrega === "entrega" ? "🛵 Entrega" : "🏠 Retirada"}`);
    if (tipoEntrega === "entrega" && endereco.trim()) {
      partes.push(`*Endereço:* ${endereco.trim()}`);
    }
    partes.push(`*Pagamento:* ${formaPagamento}`);
    if (observacoes.trim()) {
      partes.push(`*Observações:* ${observacoes.trim()}`);
    }

    const mensagem = partes.join("\n");
    window.open(
      `https://wa.me/${loja.telefoneBruto}?text=${encodeURIComponent(mensagem)}`,
      "_blank"
    );
  }

  return (
    <AnimatePresence>
      {carrinhoAberto && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={fecharCarrinho}
            className="fixed inset-0 bg-black/60 z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-gray-800">
                {etapa === "carrinho" ? "Seu Pedido" : "Finalizar Pedido"}
                {totalItens > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    ({totalItens} {totalItens === 1 ? "item" : "itens"})
                  </span>
                )}
              </h2>
              <button
                onClick={fecharCarrinho}
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Fechar carrinho"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {itens.length === 0 ? (
                <div className="text-center text-gray-400 mt-20 space-y-2">
                  <p className="text-5xl">🍕</p>
                  <p>Seu carrinho está vazio</p>
                  <p className="text-sm">Adicione itens do cardápio para começar</p>
                </div>
              ) : etapa === "carrinho" ? (
                itens.map((item) => (
                  <div
                    key={`${item.id}-${item.tamanho ?? "unico"}`}
                    className="flex gap-3 bg-gray-50 rounded-xl p-3"
                  >
                    <img
                      src={item.produto.imagem}
                      alt={item.produto.nome}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-800 truncate">
                        {item.produto.nome}
                      </p>
                      {item.tamanho && (
                        <p className="text-xs text-gray-500">
                          Tamanho {item.tamanho}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatarPreco(item.precoUnitario)} cada
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              alterarQuantidade(
                                item.id,
                                item.quantidade - 1,
                                item.tamanho
                              )
                            }
                            className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-600 transition-colors"
                            aria-label="Diminuir"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantidade}
                          </span>
                          <button
                            onClick={() =>
                              alterarQuantidade(
                                item.id,
                                item.quantidade + 1,
                                item.tamanho
                              )
                            }
                            className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-600 transition-colors"
                            aria-label="Aumentar"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-semibold text-sm text-gray-800">
                          {formatarPreco(item.precoUnitario * item.quantidade)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removerDoCarrinho(item.id, item.tamanho)}
                      className="self-start p-1 text-gray-400 hover:text-red-600 transition-colors"
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="space-y-5">
                  {/* Tipo de entrega */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Como você quer receber?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setTipoEntrega("entrega")}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          tipoEntrega === "entrega"
                            ? "border-red-600 bg-red-50 text-red-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <Bike className="w-4 h-4" />
                        Entrega
                      </button>
                      <button
                        onClick={() => setTipoEntrega("retirada")}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          tipoEntrega === "retirada"
                            ? "border-red-600 bg-red-50 text-red-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <Store className="w-4 h-4" />
                        Retirada
                      </button>
                    </div>
                  </div>

                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seu nome
                    </label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ex: Maria Silva"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  {/* Endereço */}
                  {tipoEntrega === "entrega" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Endereço de entrega
                      </label>
                      <textarea
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        placeholder="Rua, número, bairro e ponto de referência"
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
                      />
                    </div>
                  )}

                  {/* Pagamento */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Forma de pagamento
                    </label>
                    <select
                      value={formaPagamento}
                      onChange={(e) => setFormaPagamento(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    >
                      <option>Pix</option>
                      <option>Dinheiro</option>
                      <option>Cartão de Crédito</option>
                      <option>Cartão de Débito</option>
                    </select>
                  </div>

                  {/* Observações */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Observações (opcional)
                    </label>
                    <textarea
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      placeholder="Ex: sem cebola, troco para R$ 100..."
                      rows={2}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Rodapé */}
            {itens.length > 0 && (
              <div className="border-t p-4 space-y-3">
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span>{formatarPreco(total)}</span>
                </div>

                {etapa === "carrinho" ? (
                  <button
                    onClick={() => setEtapa("dados")}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    Continuar
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={gerarMensagemWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Enviar Pedido pelo WhatsApp
                    </button>
                    <button
                      onClick={() => setEtapa("carrinho")}
                      className="w-full text-sm text-gray-500 hover:text-gray-700 py-1 transition-colors"
                    >
                      Voltar ao carrinho
                    </button>
                  </>
                )}

                {etapa === "carrinho" && (
                  <button
                    onClick={limparCarrinho}
                    className="w-full text-sm text-gray-400 hover:text-red-600 py-1 transition-colors"
                  >
                    Limpar Carrinho
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
