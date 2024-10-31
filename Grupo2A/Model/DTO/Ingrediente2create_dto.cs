namespace Cozinha_BE.Model.DTO;

public class Ingrediente2create_dto
{
    public long Id { get; set; }
    public required string Name { get; set; }

    public required string Categoria { get; set; }

    public bool Ativo { get; set; }
}