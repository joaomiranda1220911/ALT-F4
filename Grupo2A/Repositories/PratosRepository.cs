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

        //US007 - Criar Prato
        public async Task<Prato> AddPrato(Prato prato)
        {
            var newPrato = await _context.Pratos.AddAsync(prato);

            await _context.SaveChangesAsync();
            return newPrato.Entity;
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
                .Include(p => p.Ingredientes)
                .Where(p => p.Ingredientes.Any(i => i.IdIngrediente == ingredienteId))
                .ToListAsync();
        }


        // public async Task <Prato> ServirPratoAsync (int IdPrato){
        //     var prato = await _context.Pratos.FindAsync(IdPrato);
        //     if (prato != null && prato.Quantidade > 0){
        //         prato.Quantidade -= 1;
        //         await _context.SaveChangesAsync();
        //     }

        // }
        public async Task<bool?> GetEstadoDePratoById(long pratoId)
        {
            var prato = await _context.Pratos.FindAsync(pratoId);
            if (prato == null)
            {
                return null; // Retorna null se o prato não for encontrado
            }
            return prato.Ativo; // Retorna o estado (Ativo ou Inativo)
        }
    }
}