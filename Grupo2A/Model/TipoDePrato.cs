using System.ComponentModel.DataAnnotations;

namespace Cozinha_BE.Model
{
    public class TipoDePrato
    {
        [Key]
        public int IdTipoPrato { get; set; } // Identificador único do tipo de prato

        [StringLength(50)]
        public required string Nome { get; set; } // Nome do tipo de prato (ex: Carne, Peixe, Vegetariano)
    }
}
