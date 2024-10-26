using Cozinha_BE.Model;
using Microsoft.EntityFrameworkCore;

namespace Grupo2A.Repositories{

    public class PratosRepository{
        private CozinhaContext _context;
        public PratosRepository(CozinhaContext context){

            _context = context;
            
        }
  
    }
   

}