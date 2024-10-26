using Grupo2A.Database;
using Grupo2A.Model;
using Grupo2A.Repositories;
using System.Threading.Tasks;

namespace Grupo2A.Services
{
    public class ReceitasService
    {
        private readonly CozinhaContext _context;
        private readonly ReceitasRepository _receitasRepo;

        public ReceitasService(CozinhaContext context)
        {
            _context = context;
            _receitasRepo = new ReceitasRepository(_context);
        }

        // public async Task<object> CreateTipoRefeicao(string nomeTipoRefeicao)
        // {
        //     // Cria uma nova instância do tipo de refeição com o nome recebido
        //     TipoRefeicao novoTipoRefeicao = new TipoRefeicao
        //     {
        //         Nome = nomeTipoRefeicao
        //     };

        //     // Adiciona o novo tipo de refeição à base de dados usando o repositório
        //     TipoRefeicao tipoRefeicaoCriado = await _receitasRepo.AddTipoRefeicao(novoTipoRefeicao);

        //     // Retorna um objeto anônimo com os detalhes mínimos
        //     return new
        //     {
        //         Id = tipoRefeicaoCriado.Id,
        //         Nome = tipoRefeicaoCriado.Nome
        //     };
        // }
        
        // Método para listar todos os tipos de refeição (US012)
        // public async Task<List<object>> GetAllTiposRefeicao()
        // {
        //     List<TipoRefeicao> tiposRefeicao = await _receitasRepo.GetAllTiposRefeicao();

        //     return tiposRefeicao.Select(tr => new
        //     {
        //         Id = tr.Id,
        //         Nome = tr.Nome
        //     }).ToList();
        // }

        // // Método para criar uma refeição (US013)
        // public async Task<object> CreateRefeicao(int pratoId, string data, int tipoRefeicaoId, int quantidadeProduzida)
        // {
        //     Refeicao novaRefeicao = new Refeicao
        //     {
        //         PratoId = pratoId,
        //         Data = DateTime.Parse(data),
        //         TipoRefeicaoId = tipoRefeicaoId,
        //         QuantidadeProduzida = quantidadeProduzida
        //     };

        //     Refeicao refeicaoCriada = await _receitasRepo.AddRefeicao(novaRefeicao);

        //     return new
        //     {
        //         Id = refeicaoCriada.Id,
        //         PratoId = refeicaoCriada.PratoId,
        //         Data = refeicaoCriada.Data,
        //         TipoRefeicaoId = refeicaoCriada.TipoRefeicaoId,
        //         QuantidadeProduzida = refeicaoCriada.QuantidadeProduzida
        //     };
        // }
    }
}
