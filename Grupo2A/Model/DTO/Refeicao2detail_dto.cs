namespace Cozinha_BE.Model.DTO;

public class Refeicao2detail_dto
{
    public long Id { get; set; }
    public DateTime Data { get; set; }
    public string TipoRefeicao { get; set; }
    public string Prato { get; set; }
    public int QuantidadeProduzida { get; set; }
}