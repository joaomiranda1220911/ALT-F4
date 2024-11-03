using System.ComponentModel.DataAnnotations;

namespace Cozinha_BE.Model
{
    public class TipoDePrato
    {
        [Key]
        public long IdTipoPrato { get; set; } // Identificador único do tipo de prato

        [StringLength(50)]
        public required string Nome { get; set; } // Nome do tipo de prato (ex: Carne, Peixe, Vegetariano)

        public required string DescricaoTipoPrato {get; set; } //Descrição do tipo de prato (ex: Carne - Prato confecionado com carne de vaca)
    }
}
