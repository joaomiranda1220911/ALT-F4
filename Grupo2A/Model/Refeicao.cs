using System.ComponentModel.DataAnnotations;

namespace Cozinha_BE.Model
{
    public class Refeicao
    {
        public int Id { get; set; } // Identificador da refeição
        public required long PratoId { get; set; } // Referência ao prato
        public required DateTime Data { get; set; } // Data da refeição
        public required long TipoRefeicaoId { get; set; } // Referência ao tipo de refeição
        public required int QuantidadeProduzida { get; set; } // Quantidade produzida

        public virtual required Prato Prato { get; set; } // Navegação para Prato
        public virtual required TipoDeRefeicao TipoRefeicao { get; set; } // Navegação para TipoDeRefeicao
    }
}

