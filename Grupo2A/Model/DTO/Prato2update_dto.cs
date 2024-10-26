namespace Cozinha_BE.Model.DTO;

public class Prato2update_dto{

    public string? Nome {get;set;}
    public TipoDePrato? tipoDePrato{get;set;}
    public ICollection<Ingrediente>? Ingredientes {get;set;}
    public Receita? Receita {get;set;}
    public bool? Ativo {get;set;}
}