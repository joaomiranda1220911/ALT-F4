using Cozinha_BE.Model;
using Grupo2A.Migrations;
using Grupo2A.Repositories;

namespace Grupo2A.Services{
    public class TipoDePratoService{
        private CozinhaContext _context;
        private TipoDePratoRepository _repo;

        public TipoDePratoService(CozinhaContext context){
            _context = context;
            _repo = new TipoDePratoRepository(_context);
        }

    }
}