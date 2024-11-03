using Microsoft.Net.Http.Headers;

namespace Cozinha_BE.Model.DTO
{
    public class Refeicao2detail_dto
    {
        public long IdRefeicao { get; set; } // Identificador da refeição
        public required DateTime Data { get; set; } // Data da refeição
        public required Prato Prato { get; set; } // Nome do prato
        public TipoDeRefeicao? tipoDeRefeicao {get;set;}
        public int QuantidadeProduzida { get; set; } // Quantidade produzida
    }
}

