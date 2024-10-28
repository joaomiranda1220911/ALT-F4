namespace Cozinha_BE.Model.DTO;
public class Refeicao2create_dto
{
    public long PratoId { get; set; }
    public long TipoRefeicaoId { get; set; }
    public DateTime Data { get; set; }
    public int QuantidadeProduzida { get; set; }
}
