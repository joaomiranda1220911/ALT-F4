export interface Prato {
    idPrato?: number; // ID único 
    nome: string; // Nome do prato
    tipoPratoId: number; // ID do tipo de prato
    ingredientesIds: number[]; // IDs dos ingredientes necessários
    receita?: string; // Receita do prato 
    ativo: boolean; // Estado do prato (ativo ou inativo)
}
