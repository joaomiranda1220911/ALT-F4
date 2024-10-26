namespace Cozinha_BE.Model.DTO;

public class Receita2update_dto{
    public string? Nome {get;set;}
    public string? Descricao {get;set;}
    public required ICollection<Ingrediente>? Ingredientes {get;set;}
    public required string? Passos{get;set;}
}