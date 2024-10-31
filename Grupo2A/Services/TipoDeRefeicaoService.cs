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

        //US11
        // public async Task<TipoRefeicao2detail_dto> CreateTipoRefeicao(string nomeTipoRefeicao)
        // {
        //     var tipoExistente = await _TipoDeRefeicaoRepository.GetTipoRefeicaoByName(nomeTipoRefeicao);
        //     if (tipoExistente != null) return null; // Já existe

        //     var novoTipoRefeicao = new TipoDeRefeicao { Nome = nomeTipoRefeicao };
        //     await _TipoDeRefeicaoRepository.AddTipoRefeicao(novoTipoRefeicao);

        //     return new TipoRefeicao2detail_dto { Id = novoTipoRefeicao.Id, Nome = novoTipoRefeicao.Nome };
        // }

        //US12
        // public async Task<List<TipoRefeicao2listing_dto>> GetAllTiposRefeicao()
        // {
        //     var tiposRefeicao = await _TipoDeRefeicaoRepository.GetAllTiposRefeicao();
        //     return tiposRefeicao.Select(t => new TipoRefeicao2listing_dto { Id = t.Id, Nome = t.Nome }).ToList();
        // }


        // US13
        // public async Task<Refeicao2detail_dto> CreateRefeicao(Refeicao2create_dto novaRefeicaoDto)
        // {
        //     // Busca o tipo de refeição e o prato
        //     var tipoRefeicao = await _TipoDeRefeicaoRepository.GetTipoRefeicaoById(novaRefeicaoDto.TipoRefeicaoId);
        //     var prato = await _TipoDeRefeicaoRepository.GetPratoById(novaRefeicaoDto.PratoId);

        //     // Verifica se o tipo de refeição ou prato não foram encontrados
        //     if (tipoRefeicao == null || prato == null) return null;

        //     // Cria a nova refeição
        //     var novaRefeicao = new Refeicao
        //     {
        //         Prato = prato,
        //         Data = novaRefeicaoDto.Data,
        //         TipoRefeicao = tipoRefeicao,
        //         QuantidadeProduzida = novaRefeicaoDto.QuantidadeProduzida
        //     };

        //     // Adiciona a refeição ao banco de dados
        //     await _ementasRepository.AddRefeicao(novaRefeicao);

        //     // Retorna os detalhes da nova refeição criada
        //     return new Refeicao2detail_dto
        //     {
        //         Id = novaRefeicao.Id,
        //         Data = novaRefeicao.Data,
        //         TipoRefeicao = tipoRefeicao.Nome,
        //         Prato = prato.Nome,
        //         QuantidadeProduzida = novaRefeicao.QuantidadeProduzida
        //     };
        // }
    }
}
