using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cozinha_BE.Model
{

    public class Refeicao
    {
        [Key]
        public long IdRefeicao { get; set; } // Identificador único do prato

        public required int QuantidadeProduzida { get; set; } // Quantidade produzida

        public required DateTime Data { get; set; } // Data da refeição

        public TipoDeRefeicao? TipoRefeicao { get; set; } //Tipo de Refeição

        public required Prato Prato { get; set; } //Tipo de Refeição
    }
}

