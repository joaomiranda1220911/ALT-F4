using Cozinha_BE.Model;
using Microsoft.EntityFrameworkCore;

namespace Grupo2A.Repositories
{

    public class IngredientesRepository
    {
        private CozinhaContext _context;
        public IngredientesRepository(CozinhaContext context)
        {

            _context = context;
        }

        public async Task<List<Ingrediente>> GetAllIngredientesFromDataBase()
        {
            return await _context.Ingredientes.ToListAsync();
        }
        public async Task<List<Ingrediente>> GetIngredientesByStateFromDataBase(bool state)
        {
            return await _context.Ingredientes.Where(i => i.Ativo == state).ToListAsync();
        }

        public async Task<Ingrediente> AddIngrediente(Ingrediente ingrediente)
        {
            var newIngrediente = await _context.Ingredientes.AddAsync(ingrediente);

            await _context.SaveChangesAsync();
            return newIngrediente.Entity;
        }

        public async Task<Ingrediente?> GetIngredienteById(long id)
        {
            return await _context.Ingredientes.FindAsync(id);
        }

        public async Task<Ingrediente> UpdateIngrediente(Ingrediente ingrediente)
        {
            _context.Ingredientes.Update(ingrediente);
            await _context.SaveChangesAsync();
            return ingrediente;
        }




        public async Task<IEnumerable<Prato>> GetPratosByIngredienteId(long ingredienteId)
        {
            return await _context.Pratos
                .Where(p => p.Ingredientes.Any(i => i.IdIngrediente == ingredienteId)) // Filtra pratos que contêm o ingrediente
                .ToListAsync(); // Executa e retorna a lista de pratos
        }
    }
}