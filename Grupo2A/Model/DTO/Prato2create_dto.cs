namespace Cozinha_BE.Model.DTO;

public class Prato2create_dto
{
    public required string Nome { get; set; }
    public required TipoDePrato TipoPrato { get; set; }
    public required ICollection<Ingrediente> Ingredientes { get; set; }
    public required Receita Receita { get; set; }
    public required bool Ativo { get; set; }
    public int? Quantidade { get; set; }
    public DateTime? DataServico { get; set; }
    public TipoDeRefeicao? TipoRefeicao { get; set; }
}