// using Grupo2A.Database;
// using Grupo2A.Model;
using Grupo2A.Repositories;
using System.Threading.Tasks;
using Cozinha_BE.Model;

namespace Grupo2A.Services
{
    public class ReceitasService
    {
        private readonly CozinhaContext _context;
        private readonly ReceitasRepository _receitasRepo;

        public ReceitasService(CozinhaContext context)
        {
            _context = context;
            _receitasRepo = new ReceitasRepository(_context);
        }
    }
}
