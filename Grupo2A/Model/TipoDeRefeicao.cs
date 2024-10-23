using System.ComponentModel.DataAnnotations;

namespace Cozinha_BE.Model
{
    public class TipoDeRefeicao
    {
        [Key]
        public int Id { get; set; } // Identificador único do tipo de refeição

        [Required]
        [StringLength(50)]
        public string Nome { get; set; } // Nome do tipo de refeição (ex: Almoço, Jantar)
    }
}
