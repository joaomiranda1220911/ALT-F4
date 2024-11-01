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

            // Se a refeição for nula, poderias lançar uma exceção ou retornar um valor padrão
            if (refeicao == null)
            {
                throw new KeyNotFoundException($"Refeição com ID {id} não encontrada.");
                // ou retorna um valor padrão, dependendo da lógica do teu sistema
            }

            return refeicao;
        }


        public async Task<List<Refeicao>> GetAllRefeicoes()
        {
            return await _context.Refeicoes.ToListAsync();
        }

        public async Task<Refeicao> AddRefeicao(Refeicao refeicao)
        {
            var newRefeicao = await _context.Refeicoes.AddAsync(refeicao);
            await _context.SaveChangesAsync();

            // Retorna a refeição adicionada
            return newRefeicao.Entity;
        }
    }
}

