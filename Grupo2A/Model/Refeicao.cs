using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cozinha_BE.Model
{
    public class Refeicao
    {
        [Key]
        public long IdRefeicao { get; set; } // Identificador da refeição
        [ForeignKey("Prato")]
        public required long PratoId { get; set; } // Referência ao prato
        public required DateTime Data { get; set; } // Data da refeição
        [ForeignKey("TipoRefeicao")]
        public required long TipoRefeicaoId { get; set; } // Referência ao tipo de refeição
        public required int QuantidadeProduzida { get; set; } // Quantidade produzida

        public virtual required Prato Prato { get; set; } // Navegação para Prato
        public virtual required TipoDeRefeicao TipoRefeicao { get; set; } // Navegação para TipoDeRefeicao
    }
}

