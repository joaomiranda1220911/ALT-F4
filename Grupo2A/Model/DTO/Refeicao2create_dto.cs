using System.ComponentModel.DataAnnotations;

    public class Refeicao2create_dto
    {
        [Required]
        public long IdPrato { get; set; } // Identificador do prato a ser utilizado

        [Required]
        public long TipoRefeicaoId { get; set; } // Identificador do tipo de refeição

        [Required]
        public int QuantidadeProduzida { get; set; } // Quantidade produzida

        [Required]
        public DateTime Data { get; set; } // Data da refeição
    }

