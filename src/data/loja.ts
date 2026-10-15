export const loja = {
  nome: "Pizzaria Sorelle",
  slogan: "A melhor pizza da região",
  telefone: "(91) 98514-8886",
  telefoneBruto: "5591985148886",
  endereco: "Rua das Flores, 123 - Centro",
  cidade: "Belém - PA",
  horarios: [
    { dias: "Seg - Qui", horario: "18h às 23h" },
    { dias: "Sex - Sáb", horario: "18h à 00h" },
    { dias: "Domingo", horario: "18h às 22h" },
  ],
  instagram: "https://www.instagram.com/sorellepizzaria/",
  facebook: "https://www.facebook.com/sorellepizzaria",
  // Link de embed do Google Maps (substitua o q= pelo endereço real)
  mapaEmbed:
    "https://www.google.com/maps?q=Rua+das+Flores,+123,+Centro,+Belém+-+PA&output=embed",
} as const;
