using System.ComponentModel.DataAnnotations;

namespace Cozinha_BE.Model
{
    public class TipoDePrato
    {
        [Key]
        public int Id { get; set; } // Identificador único do tipo de prato

        [Required]
        [StringLength(50)]
        public string Nome { get; set; } // Nome do tipo de prato (ex: Carne, Peixe, Vegetariano)
    }
}
