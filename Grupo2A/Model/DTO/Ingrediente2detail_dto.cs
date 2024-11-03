namespace Cozinha_BE.Model.DTO;

public class Ingrediente2detail_dto
{
    public required long? IdIngrediente { get; set; } 
    public required string Nome { get; set; }
    public string? Categoria { get; set; } 
    public required bool Ativo { get; set; }
}
