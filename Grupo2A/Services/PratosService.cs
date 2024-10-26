using Cozinha_BE.Model.DTO;
using Cozinha_BE.Model;
using Grupo2A.Repositories;
using Microsoft.EntityFrameworkCore;


namespace Grupo2A.Services{
    public class PratosService{ 
        private CozinhaContext _context;
        private PratosRepository _repo;

        public PratosService (CozinhaContext context){
            _context = context;
            _repo = new PratosRepository (_context); 

        }
    }
}
