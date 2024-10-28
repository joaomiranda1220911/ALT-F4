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

        //US11
        // public async Task<TipoDeRefeicao> GetTipoRefeicaoByName(string nome)
        // {
        //     return await _context.TiposDeRefeicao.FirstOrDefaultAsync(t => t.Nome == nome);
        // }

        // public async Task AddTipoRefeicao(TipoDeRefeicao tipoRefeicao)
        // {
        //     await _context.TiposDeRefeicao.AddAsync(tipoRefeicao);
        //     await _context.SaveChangesAsync();
        // }

        //US12
        // public async Task<List<TipoDeRefeicao>> GetAllTiposRefeicao()
        // {
        //     return await _context.TiposDeRefeicao.ToListAsync();
        // }

        //US13
        // // Método para obter TipoDeRefeicao pelo Id
        // public async Task<TipoDeRefeicao> GetTipoRefeicaoById(int tipoRefeicaoId)
        // {
        //     return await _context.TipoDeRefeicao.FindAsync(tipoRefeicaoId);
        // }

        // // Método para obter Prato pelo Id
        // public async Task<Prato> GetPratoById(long pratoId)
        // {
        //     return await _context.Pratos
        //         .Where(p => p.Id == pratoId && p.Ativo) // Verifica se o prato está ativo
        //         .FirstOrDefaultAsync();
        // }

        // // Método para adicionar uma nova refeição
        // public async Task AddRefeicao(Refeicao refeicao)
        // {
        //     await _context.Refeicoes.AddAsync(refeicao);
        //     await _context.SaveChangesAsync();
        // }


    }
}