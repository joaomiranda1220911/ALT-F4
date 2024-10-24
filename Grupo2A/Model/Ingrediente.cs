using System.ComponentModel.DataAnnotations;

namespace Cozinha_BE.Model
{
    public class Ingrediente
    {
        [Key]
        public int Id { get; set; } // Identificador único do ingrediente

        [Required]
        [StringLength(100)]
        public string Nome { get; set; } // Nome do ingrediente

        [Required]
        public string Categoria { get; set; } // Categoria do ingrediente (ex: Vegetal, Laticínio, etc.)

        public bool Ativo { get; set; } = true; // Estado do ingrediente (ativo ou inativo)
    }
}
