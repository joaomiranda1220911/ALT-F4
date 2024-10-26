using Cozinha_BE.Model;
using Microsoft.EntityFrameworkCore;

namespace Grupo2A.Repositories{

    public class ReceitasRepository{
        private CozinhaContext _context;
        public ReceitasRepository(CozinhaContext context){

            _context = context;
            
        }
    }
}

// public async Task<TipoRefeicao> AddTipoRefeicao(TipoRefeicao tipoRefeicao)
// {
//     _context.TiposDeRefeicao.Add(tipoRefeicao);
//     await _context.SaveChangesAsync();
//     return tipoRefeicao;
// }
