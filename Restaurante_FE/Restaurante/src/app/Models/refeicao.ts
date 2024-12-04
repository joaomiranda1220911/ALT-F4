export interface Refeicao {
    idRefeicao?: number | null;
    IdPrato: number | null; // ID do prato (obrigatório para vincular a refeição)
    Data: string | Date; // Data da refeição
    TipoRefeicaoId: number | null; // Tipo de refeição (e.g., Almoço, Jantar)
    QuantidadeProduzida: number | null; // Quantidade produzida
  }
