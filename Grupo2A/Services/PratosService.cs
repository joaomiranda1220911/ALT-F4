using Cozinha_BE.Model.DTO;
using Cozinha_BE.Model;
using Grupo2A.Repositories;
using Microsoft.EntityFrameworkCore;


namespace Grupo2A.Services
{
    public class PratosService
    {
        private CozinhaContext _context;
        private PratosRepository _repo;

        public PratosService(CozinhaContext context)
        {
            _context = context;
            _repo = new PratosRepository(_context);

        }

        private Prato2detail_dto PratoDetail(Prato p)
        {
            return new Prato2detail_dto
            {
                Nome = p.Nome,
                TipoPrato = p.TipoPrato,
                Ingredientes = p.Ingredientes,
                Receita = p.Receita,
                Ativo = p.Ativo ? "Ativo" : "Inativo"

            };
        }


        public async Task<Prato2detail_dto?> UpdatePrato(long id, Prato2update_dto info)
        {
            // Verifica se o prato existe no repositório
            var thePrato = await _repo.GetPratoById(id);
            if (thePrato == null)
            {
                return null;
            }

            // Atualiza o estado de Ativo, caso tenha sido fornecido no DTO
            if (info.Ativo.HasValue)
            {
                thePrato.Ativo = info.Ativo.Value;
            }

            // Atualiza o prato no repositório
            var updatedPrato = await _repo.UpdatePrato(thePrato);

            // Devolve os detalhes atualizados do prato
            return PratoDetail(updatedPrato);
        }

        public async Task<Prato2detail_dto?> UpdatePratoByIngrediente(long id, Prato prato)
        {
            // Verifica se o prato existe no repositório
            var thePrato = await _repo.GetPratoById(id);
            if (thePrato == null)
            {
                return null; // Retorna nulo se o prato não for encontrado
            }

            // Atualiza o estado de Ativo, se fornecido
            if (prato.Ativo.HasValue)
            {
                thePrato.Ativo = prato.Ativo.Value; // Atualiza o estado
            }

            // Atualiza o prato no repositório
            var updatedPrato = await _repo.UpdatePrato(thePrato);

            // Devolve os detalhes atualizados do prato
            return PratoDetail(updatedPrato); // Retorna o DTO com os detalhes do prato atualizado

        }

    }
}
