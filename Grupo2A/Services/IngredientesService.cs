using Cozinha_BE.Model;
using Cozinha_BE.Model.DTO;
using Grupo2A.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Grupo2A.Services{

    public class IngredientesService{
        private CozinhaContext _context;
        private IngredientesRepository _repo;

        public IngredientesService(CozinhaContext context){
            _context = context;
            _repo = new IngredientesRepository(_context);
        }
    }
}
