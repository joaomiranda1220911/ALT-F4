using Cozinha_BE.Model;
using Microsoft.EntityFrameworkCore;

namespace Grupo2A.Repositories
{

    public class PratosRepository
    {
        private CozinhaContext _context;
        public PratosRepository(CozinhaContext context)
        {

            _context = context;

        }

        public async Task<Prato?> GetPratoById(long id)
        {
            return await _context.Pratos.FindAsync(id);
        }

        public async Task<Prato> UpdatePrato(Prato prato)
        {
            _context.Entry(prato).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return prato;
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }
        public async Task<IEnumerable<Prato>> GetPratosByIngredienteId(long ingredienteId)
        {
            return await _context.Pratos
                .Where(p => p.Ingredientes.Any(i => i.IdIngrediente == ingredienteId)) // Filtra pratos que contêm o ingrediente
                .ToListAsync(); // Executa a consulta e retorna a lista de pratos
        }
    }
}