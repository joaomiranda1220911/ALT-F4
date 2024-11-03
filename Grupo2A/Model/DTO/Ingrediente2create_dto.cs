namespace Cozinha_BE.Model.DTO;

public class Ingrediente2create_dto
{
    public long IdIngrediente { get; set; }
    public required string Nome { get; set; }

    public required string Categoria { get; set; }

    public required bool Ativo { get; set; }
}