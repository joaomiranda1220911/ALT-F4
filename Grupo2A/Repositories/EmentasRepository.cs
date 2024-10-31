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

        public async Task<IEnumerable<Prato>> GetEmentaDisponivel(DateTime data, int tipoDeRefeicaoId)
        {
            return await _context.Pratos
            .Include(p => p.TipoPrato)
            .Include(p => p.TipoRefeicao)
            .Include(p => p.Ingredientes)
            .Where(p => p.Data.Date == data.Date && p.TipoRefeicao.Id == tipoDeRefeicaoId)
            .Where(p => p.Quantidade > 0 && p.Ativo == true)
            .ToListAsync();
        }
    }
}