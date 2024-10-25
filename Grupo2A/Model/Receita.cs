using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cozinha_BE.Model
{
    public class Receita
    {
        [Key]
        public int IdReceita { get; set; } // Identificador único da receita

        [Required]
        [StringLength(100)]
        public string Nome { get; set; } // Nome da receita

        public string Descricao { get; set; } // Descrição da receita

        public ICollection<Ingrediente> Ingredientes { get; set; } // Ingredientes necessários

        [Required]
        public string Passos { get; set; } // Passos de preparação da receita
    }
}
