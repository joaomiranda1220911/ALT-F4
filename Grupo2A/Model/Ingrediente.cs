using System.ComponentModel.DataAnnotations;

namespace Cozinha_BE.Model
{
    public class Ingrediente
    {
        [Key]
        public long IdIngrediente { get; set; } // Identificador único do ingrediente

        [Required]
        [StringLength(100)]
        public required string Nome { get; set; } // Nome do ingrediente

        [Required]
        public required string Categoria { get; set; } // Categoria do ingrediente (ex: Vegetal, Laticínio, etc.)

        public required bool Ativo { get; set; } // Estado do ingrediente (ativo ou inativo)
    }
}
