namespace Cozinha_BE.Model.DTO;

public class Prato2detail_dto{
    public long IdPrato {get; set; }
    public required string Nome {get; set;}
    public required TipoDePrato TipoPrato {get; set;}
    public required ICollection<Ingrediente> Ingredientes {get;set;}
    public required Receita Receita {get; set;}
    public bool Ativo {get; set;}

}