using Cozinha_BE.Model;
using Cozinha_BE.Model.DTO;
using Grupo2A.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Grupo2A.Services
{

    public class IngredientesService
    {
        private CozinhaContext _context;
        private IngredientesRepository _repo;

        private PratosRepository _repoP;

        public IngredientesService(CozinhaContext context)
        {
            _context = context;
            _repo = new IngredientesRepository(_context);
            _repoP = new PratosRepository (_context);
        }



        public async Task<IEnumerable<Prato>> GetPratosByIngredienteId(long ingredienteId)
    {
        // Chama o repositório para obter os pratos que contêm o ingrediente pelo ID
        var pratos = await _repoP.GetPratosByIngredienteId(ingredienteId);
        
        // Retorna a lista de pratos
        return pratos;
    }

        private Ingrediente2detail_dto IngredienteDetail(Ingrediente i)
        {
            return new Ingrediente2detail_dto
            {
                Nome = i.Nome,
                Categoria = i.Categoria,
                Ativo = i.Ativo ? "Ativo" : "Inativo"

            };
        }


        public async Task<Ingrediente2detail_dto?> UpdateIngrediente(long idIngrediente)
        {
            // Verifica se o ingrediente existe no repositório
            var theIngrediente = await _repo.GetIngredienteById(idIngrediente);
            if (theIngrediente == null)
            {
                return null; // Retorna null se o ingrediente não existir
            }

            // Altera o estado do ingrediente: se estiver ativo, passa a inativo e vice-versa
            theIngrediente.Ativo = !theIngrediente.Ativo; // Inverte o estado atual

            // Atualiza o ingrediente no repositório
            var updatedIngrediente = await _repo.UpdateIngrediente(theIngrediente);

            // Devolve os detalhes atualizados do ingrediente
            return IngredienteDetail(updatedIngrediente); // Supondo que há um método para transformar o ingrediente atualizado em um DTO
        }

    }
}


