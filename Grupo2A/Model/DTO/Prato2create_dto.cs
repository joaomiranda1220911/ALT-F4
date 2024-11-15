public class Prato2create_dto
{
    public required string Nome { get; set; }
    public required long TipoPratoId { get; set; }  
    public required ICollection<long> IngredientesIds { get; set; }  // IDs dos ingredientes
    public required string? Receita { get; set; }
    public required bool Ativo { get; set; } 
}

