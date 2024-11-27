import { Prato } from './prato';

export interface PratoSala {
    idPratoSala?: number; // Opcional: ID único para identificar o PratoSala
    prato: Prato; // Apenas um prato associado (não um array)
    preco: number; // Preço associado ao prato
  }