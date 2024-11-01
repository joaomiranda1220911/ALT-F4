namespace Cozinha_BE.Model.DTO;

public class Receita2update_dto
{
    public string? Nome { get; set; }
    public string? Descricao { get; set; }
    public ICollection<Ingrediente>? Ingredientes { get; set; }
    public string? Passos { get; set; }
}