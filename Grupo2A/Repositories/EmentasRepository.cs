using Cozinha_BE.Model;
using Microsoft.EntityFrameworkCore;

namespace Grupo2A.Repositories
{
    public class EmentasRepository
    {

        private CozinhaContext _context;
        public EmentasRepository(CozinhaContext context)
        {
            _context = context;
        }

        public async Task<Refeicao> AddRefeicao(Refeicao refeicao)
        {
            if (refeicao == null)
            {
                throw new ArgumentNullException(nameof(refeicao), "A refeição não pode ser nula.");
            }

            // Adiciona a refeição ao contexto
            await _context.Refeicoes.AddAsync(refeicao);

            // Salva as alterações na base de dados
            await _context.SaveChangesAsync();

            // Retorna a refeição adicionada (incluindo o ID gerado)
            return refeicao;
        }


        public async Task<IEnumerable<Prato>> GetEmentaDisponivel(DateTime data, int tipoDeRefeicaoId)
        {
            return await _context.Pratos
            .Include(p => p.TipoPrato)
            .Include(p => p.TipoRefeicao)
            .Include(p => p.Ingredientes)
            .Where(p => p.DataServico.Date == data.Date && p.TipoRefeicao != null && p.TipoRefeicao.Id == tipoDeRefeicaoId)
            .Where(p => p.Quantidade > 0 && p.Ativo == true)
            .ToListAsync();
        }
    }
}