using System.ComponentModel.DataAnnotations;

namespace Cozinha_BE.Model
{
public class Refeicao
{
    public int Id { get; set; }
    public int PratoId { get; set; } // Referência ao prato
    public DateTime Data { get; set; } // Data da refeição
    public int TipoRefeicaoId { get; set; } // Referência ao tipo de refeição
    public int QuantidadeProduzida { get; set; } // Quantidade produzida

    public virtual Prato Prato { get; set; } // Navegação para Prato
    public virtual TipoDeRefeicao TipoRefeicao { get; set; } // Navegação para TipoDeRefeicao
}
}
