using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Cozinha_BE.Model
{
    public class Prato
    {
        [Key]
        public int Id { get; set; } // Identificador único do prato

        [Required]
        [StringLength(100)]
        public string Nome { get; set; } // Nome do prato

        [Required]
        public TipoDePrato TipoPrato { get; set; } // Tipo do prato

        public ICollection<Ingrediente> Ingredientes { get; set; } // Ingredientes que compõem o prato

        public Receita Receita { get; set; } // Receita associada ao prato

        public bool Ativo { get; set; } = true; // Estado do prato (ativo ou inativo)
    }
}
