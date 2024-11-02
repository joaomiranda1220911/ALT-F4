namespace Cozinha_BE.Model.DTO;

public class Prato2update_dto
{

    public string? Nome { get; set; }
    public TipoDePrato? tipoDePrato { get; set; }
    public ICollection<Ingrediente>? Ingredientes { get; set; }
    public string? Receita { get; set; }
    public required bool Ativo { get; set; }
}