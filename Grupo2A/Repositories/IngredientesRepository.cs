using Cozinha_BE.Model;
using Microsoft.EntityFrameworkCore;

namespace Grupo2A.Repositories{

    public class IngredientesRepository{
        private CozinhaContext _context;
        public IngredientesRepository (CozinhaContext context){

            _context = context;
        }
    }
}