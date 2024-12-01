import { TipoRefeicao } from "./tipoRefeicao";

//Modelo para associar prato à ementa
export interface Prato {
    id: number; //Identificador único do prato
    nome: string; //Nome do prato
}

//Modelo para os dados da ementa
export interface Ementa {
    id: number;
    data: string;
    tipoRefeicao: TipoRefeicao;
    prato: Prato;
}
