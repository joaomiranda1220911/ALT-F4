using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cozinha_BE.Model
{
    public class Receita
    {
        [Key]
        public int IdReceita { get; set; } // Identificador único da receita


        [StringLength(100)]
        public required string Nome { get; set; } // Nome da receita

        public string? Descricao { get; set; } // Descrição da receita

        public required ICollection<Ingrediente> Ingredientes { get; set; } // Ingredientes necessários

        public required string Passos { get; set; } // Passos de preparação da receita
    }
}
