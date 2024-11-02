namespace Cozinha_BE.Model.DTO;

public class Ingrediente2create_dto
{
    public int IdIngrediente { get; set; }
    public required string Name { get; set; }

    public required string Categoria { get; set; }

    public required bool Ativo { get; set; }
}