using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Cozinha_BE.Model
{
    public class Prato
    {
        [Key]
        public long IdPrato { get; set; } // Identificador único do prato

        [Required]
        [StringLength(100)]
        public required string Nome { get; set; } // Nome do prato

        [Required]
        public TipoDePrato TipoPrato { get; set; } // Tipo do prato

        public ICollection<Ingrediente> Ingredientes { get; set; } // Ingredientes que compõem o prato

        public Receita Receita { get; set; } // Receita associada ao prato

        public bool? Ativo { get; set; } // Estado do prato (ativo ou inativo)

        public int Quantidade{get;set;} //Quantidade do prato disponível

        public DateTime Data {get;set;} //Data em que o prato será servido

        public TipoDeRefeicao TipoRefeicao {get;set;} //Tipo de Refeição
    }
}
