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
    }


}