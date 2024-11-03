public class Prato2create_dto
{
    public required string Nome { get; set; }
    public required long TipoPratoId { get; set; }  // Deve ser long se no repositório for long
    public required ICollection<long> IngredientesIds { get; set; }  // IDs dos ingredientes
    public required string? Receita { get; set; }
    public required bool Ativo { get; set; }
    public int? Quantidade { get; set; }
    public DateTime? DataServico { get; set; }
    public long? TipoRefeicaoId { get; set; }  // ID do tipo de refeição, se aplicável
}

