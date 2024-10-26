namespace Cozinha_BE.Model.DTO;

public class Prato2listing_dto{

    public int IdPrato {get; set; }
    public required string Nome {get; set; }
    public required TipoDePrato TipoPrato {get; set;}
    public bool Ativo {get; set; }

}