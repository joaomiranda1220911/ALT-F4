using Cozinha_BE.Model;
using Microsoft.EntityFrameworkCore;

namespace Grupo2A.Repositories
{
    public class TipoDeRefeicaoRepository
    {

        private CozinhaContext _context;
        public TipoDeRefeicaoRepository(CozinhaContext context)
        {
            _context = context;
        }

        //US011: Definir tipos de refeição, como almoço ou jantar.
        public async Task<TipoDeRefeicao> GetTipoRefeicaoByName(string nome)
        {
            return await _context.TiposDeRefeicao.FirstOrDefaultAsync(t => t.Nome == nome);
        }


        public async Task AddTipoRefeicao(TipoDeRefeicao tipoRefeicao)
        {
            await _context.TiposDeRefeicao.AddAsync(tipoRefeicao);
            await _context.SaveChangesAsync();
        }



        //US012: Listar tipos de refeição disponíveis.
        public async Task<List<TipoDeRefeicao>> GetAllTiposRefeicao()
        {
            return await _context.TiposDeRefeicao.ToListAsync();
        }


        // Método para obter TipoDeRefeicao pelo Id
        public async Task<TipoDeRefeicao> GetTipoRefeicaoById(int tipoRefeicaoId)
        {
            return await _context.TiposDeRefeicao.FindAsync(tipoRefeicaoId);
        }
    }
}