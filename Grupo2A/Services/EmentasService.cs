using Cozinha_BE.Model;
using Cozinha_BE.Model.DTO;
using Grupo2A.Repositories;
using Microsoft.EntityFrameworkCore;


namespace Grupo2A.Services
{
    public class EmentasService
    {
        private CozinhaContext _context;
        private EmentasRepository _repo;
        public EmentasService(CozinhaContext context)
        {
            _context = context;
            _repo = new EmentasRepository(_context);
        }

        public async Task<IEnumerable<Prato>> GetEmentaDisponivel(DateTime data, int tipoDeRefeicaoId)
        {
            return await _repo.GetEmentaDisponivel(data, tipoDeRefeicaoId);
        }

        //US016: Apresentar ementa disponível com base na data, tipo e quantidade
        public async Task<List<Prato2listing_dto>> GetEmentaDisponivel(string tipoRefeicao, DateTime data)
        {
            var pratosDisponiveis = await _context.Pratos
            // Filtra os pratos de acordo com o tipo de refeição, data e quantidade disponível
           .Where(p => p.TipoRefeicao.ToString() == tipoRefeicao && p.DataServico.Date == data.Date && p.Quantidade > 0)
           .Select(p => new Prato2listing_dto
           {
               IdPrato = (int)p.IdPrato,
               Nome = p.Nome,
               TipoPrato = p.TipoPrato,
               Ativo = p.Ativo
           })
            // Executa a consulta assíncrona e converte o resultado numa lista
            .ToListAsync();
            // Retorna a lista de pratos disponíveis que satisfazem os critérios
            return pratosDisponiveis;
        }

    }
}