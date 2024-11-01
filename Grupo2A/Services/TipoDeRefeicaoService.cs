using Cozinha_BE.Model;
using Cozinha_BE.Model.DTO;
using Grupo2A.Repositories;
using Microsoft.EntityFrameworkCore;


namespace Grupo2A.Services
{
    public class TipoDeRefeicaoService
    {
        private CozinhaContext _context;
        private TipoDeRefeicaoRepository _repo;
        public TipoDeRefeicaoService(CozinhaContext context)
        {
            _context = context;
            _repo = new TipoDeRefeicaoRepository(_context);
        }

        // US011: Definir tipos de refeição, como almoço ou jantar.
        public async Task<TipoRefeicao2detail_dto> CreateTipoRefeicao(string nomeTipoRefeicao)
        {
            // Verificar se o nome da refeição é válido
            if (string.IsNullOrWhiteSpace(nomeTipoRefeicao))
                throw new ArgumentException("O nome do tipo de refeição não pode ser vazio.", nameof(nomeTipoRefeicao));

            // Verificar se o tipo de refeição já existe
            var tipoExistente = await _repo.GetTipoRefeicaoByName(nomeTipoRefeicao);
            if (tipoExistente != null)
                return null; // Já existe

            // Criar novo tipo de refeição
            var novoTipoRefeicao = new TipoDeRefeicao { Nome = nomeTipoRefeicao };
            await _repo.AddTipoRefeicao(novoTipoRefeicao);

            // Retornar o DTO
            return new TipoRefeicao2detail_dto { Id = novoTipoRefeicao.Id, Nome = novoTipoRefeicao.Nome };
        }


        // US012: Listar tipos de refeição disponíveis.
        public async Task<List<TipoRefeicao2listing_dto>> GetAllTiposRefeicao()
        {
            var tiposRefeicao = await _repo.GetAllTiposRefeicao();
            return tiposRefeicao.Select(t => new TipoRefeicao2listing_dto { Id = t.Id, Nome = t.Nome }).ToList();
        }



    }
}
