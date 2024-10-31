using Cozinha_BE.Model;
using Cozinha_BE.Model.DTO;
using Grupo2A.Repositories;
using Microsoft.EntityFrameworkCore;


namespace Grupo2A.Services
{
    public class EmentasService
    {
        private CozinhaContext _context;
        private EmentasRepository _repo;
        public EmentasService(CozinhaContext context)
        {
            _context = context;
            _repo = new EmentasRepository(_context);
        }

        public async Task<IEnumerable<Prato>> GetEmentaDisponivel(DateTime data, int tipoDeRefeicaoId)
        {
            return await _repo.GetEmentaDisponivel(data, tipoDeRefeicaoId);
        }

    }
}