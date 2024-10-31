using Cozinha_BE.Model;

namespace Grupo2A.Repositories{
    public class TipoDePratoRepository{
        private CozinhaContext _context;
        public TipoDePratoRepository(CozinhaContext context){
            _context = context;
        }
    }
}