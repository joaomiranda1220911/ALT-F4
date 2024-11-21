using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Cozinha_BE.Model;

namespace Cozinha_BE.Model.Repositories
{
    public class RefeicoesRepository
    {
        private CozinhaContext _context;

        public RefeicoesRepository(CozinhaContext context)
        {
            _context = context;
        }

        public async Task<Refeicao> GetByRefeicaoById(long id)
        {
            var refeicao = await _context.Refeicoes.FindAsync(id);


            if (refeicao == null)
            {
                throw new KeyNotFoundException($"Refeição com ID {id} não encontrada.");
            }

            return refeicao;
        }


        public async Task<List<Refeicao>> GetAllRefeicoes()
        {
            return await _context.Refeicoes.ToListAsync();
        }

        public async Task AddRefeicao(Refeicao refeicao)
        {
            // Adiciona a refeição ao contexto
            await _context.Refeicoes.AddAsync(refeicao);

            // Chama o SaveChangesAsync para persistir as mudanças e gerar o ID
            await _context.SaveChangesAsync();
        }


        //US016: Apresentar ementa disponível com base na data, tipo e quantidade
        public async Task<IEnumerable<Refeicao>> GetRefeicaoByDataETipo(DateTime data, TipoDeRefeicao tipoRefeicao)
        {
            return await _context.Refeicoes
                .Where(r => r.Data.Date == data.Date && r.TipoRefeicao.Id == tipoRefeicao.Id) // Ajusta a comparação
                .ToListAsync();
        }

    }
}

