namespace Cozinha_BE.Model.DTO;

public class Receita2detail_dto{
    public required string Nome {get; set; }
    public required string Descricao {get; set;}
    public required ICollection<Ingrediente> Ingredientes {get; set;}
    public required string Passos {get; set;}

}