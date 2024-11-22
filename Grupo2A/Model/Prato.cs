using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cozinha_BE.Model
{
    public class Prato
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long IdPrato { get; set; } // Identificador único do prato

        [Required]
        [StringLength(100)]
        public required string Nome { get; set; } // Nome do prato

        [Required]
        public required TipoDePrato? TipoPrato { get; set; } // Tipo do prato

        public ICollection<Ingrediente> ? Ingredientes { get; set; } // Ingredientes que compõem o prato

        public string? Receita { get; set; } // Receita associada ao prato

        public required bool Ativo { get; set; } // Estado do prato (ativo ou inativo)
    }
}
