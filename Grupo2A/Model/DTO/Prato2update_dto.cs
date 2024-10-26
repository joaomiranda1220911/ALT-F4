namespace Cozinha_BE.Model.DTO;

public class Prato2update_dto{

    public string? Nome {get;set;}
    public required TipoDePrato? tipoDePrato{get;set;}
    public required ICollection<Ingrediente>? Ingredientes {get;set;}
    public required Receita? Receita {get;set;}
    public bool? Ativo {get;set;}
}