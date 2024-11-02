using Cozinha_BE.Model;
using Cozinha_BE.Model.DTO;
using Grupo2A.Repositories;
using Microsoft.AspNetCore.Mvc;
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
            _repoP = new PratosRepository(_context);
        }

        public async Task<IEnumerable<Prato>> GetPratosByIngredienteId(long ingredienteId)
        {
            // Chama o repositório para obter os pratos que contêm o ingrediente pelo ID
            var pratos = await _repoP.GetPratosByIngredienteId(ingredienteId);

            // Retorna a lista de pratos
            return pratos;
        }

        public async Task<Ingrediente2detail_dto> CreateNewIngrediente(Ingrediente2create_dto info)
        {
            Ingrediente newIngrediente = new Ingrediente
            {
                IdIngrediente = (int)info.IdIngrediente,
                Nome = info.Nome,
                Categoria = info.Categoria,
                Ativo = info.Ativo
            };
            return IngredienteDetail(await _repo.AddIngrediente(newIngrediente));
        }

        private Ingrediente2detail_dto IngredienteDetail(Ingrediente i)
        {
            return new Ingrediente2detail_dto
            {
                Nome = i.Nome,
                Categoria = i.Categoria,
                Ativo = i.Ativo

            };
        }

        private Ingrediente2listing_dto IngredienteListItem(Ingrediente i)
        {
            return new Ingrediente2listing_dto
            {
                IdIngrediente = i.IdIngrediente,
                Nome = i.Nome,
                Categoria = i.Categoria
            };
        }
        public async Task<List<Ingrediente2listing_dto>> GetAllActiveIngredientes(bool state)
        {
            List<Ingrediente> allMatchingIngredientes = await _repo.GetIngredientesByStateFromDataBase(state);

            return allMatchingIngredientes.Select(x => IngredienteListItem(x)).ToList();
        }

        public async Task<Ingrediente2detail_dto?> UpdateIngrediente(long idIngrediente)
        {
            // Verifica se o ingrediente existe no repositório
            var theIngrediente = await _repo.GetIngredienteById(idIngrediente);
            if (theIngrediente == null)
            {
                return null; // Retorna null se o ingrediente não existir
            }

            // Altera o estado do ingrediente
            theIngrediente.Ativo = !theIngrediente.Ativo; // Inverte o estado atual

            // Atualiza o ingrediente no repositório
            var updatedIngrediente = await _repo.UpdateIngrediente(theIngrediente);

            // Devolve os detalhes atualizados do ingrediente
            return IngredienteDetail(updatedIngrediente);
        }

        public async Task<List<Ingrediente2listing_dto>> GetIngredientesByAtiveState(bool state)
        {
            List<Ingrediente> allMatchingIngredientes = await _repo.GetIngredientesByStateFromDataBase(state);

            return allMatchingIngredientes.Select(x => IngredienteListItem(x)).ToList();
        }
    }
}