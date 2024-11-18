using Cozinha_BE.Model.DTO;
using Cozinha_BE.Model;
using Grupo2A.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using Grupo2A.Services;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Grupo2A.Services
{
    public class PratosService
    {
        // Dependências do serviço, inicializadas no construtor
        private readonly CozinhaContext _context;
        private readonly PratosRepository _repo;
        private readonly TipoDeRefeicaoRepository _repoTipoDeRefeicao;
        private readonly TipoDePratoRepository _repoTipoDePrato;
        private readonly IngredientesRepository _repoIngredientes;

        public PratosService(CozinhaContext context)
        {
            // Garante que o context não seja nulo
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _repo = new PratosRepository(_context);
            _repoTipoDeRefeicao = new TipoDeRefeicaoRepository(_context);
            _repoTipoDePrato = new TipoDePratoRepository(_context);
            _repoIngredientes = new IngredientesRepository(_context);

        }


        public async Task<bool> IsPratoAtivo(long pratoId)
        {
            // Recupera o prato pelo ID
            var prato = await _repo.GetPratoById(pratoId);
            return prato != null && prato.Ativo; // Simplified condition
        }

        // US007 - Criar Prato
        public async Task<(Prato? prato, string? mensagem)> CreateNewPrato(Prato2create_dto pratoDto)
        {
            if (pratoDto == null)
            {
                throw new ArgumentNullException(nameof(pratoDto));
            }

            // Validate TipoPrato
            var tipoPrato = await _repoTipoDePrato.GetTipoDePratoById(pratoDto.TipoPratoId);
            if (tipoPrato == null)
            {
                return (null, "Tipo de prato não encontrado.");
            }

            // Initialize ingredientes
            var ingredientesAssociados = new List<Ingrediente>();
            foreach (var ingredienteId in pratoDto.IngredientesIds)
            {
                var ingrediente = await _repoIngredientes.GetIngredienteById(ingredienteId);
                if (ingrediente == null)
                {
                    return (null, $"Ingrediente com ID {ingredienteId} não encontrado.");
                }
                ingredientesAssociados.Add(ingrediente);
            }

            // Create a new Prato instance
            var novoPrato = new Prato
            {
                Nome = pratoDto.Nome,
                TipoPrato = tipoPrato,
                Ingredientes = ingredientesAssociados,
                Receita = pratoDto.Receita,
                Ativo = pratoDto.Ativo,
            };

            // Add the new Prato to the repository
            await _repo.AddPrato(novoPrato);

            return (novoPrato, null);
        }

        // Método para transformar um Prato em Prato2detail_dto
        private Prato2detail_dto PratoDetail(Prato p)
        {
            return new Prato2detail_dto
            {
                Nome = p.Nome,
                TipoPrato = p.TipoPrato,
                Ingredientes = p.Ingredientes,
                Receita = p.Receita,
                Ativo = p.Ativo
            };
        }
        public async Task<Prato2detail_dto?> UpdateEstadoPrato(long id, Prato2update_dto info, Prato? prato = null)
        {
            // Verifica se o prato existe no repositório
            var thePrato = await _repo.GetPratoById(id);
            if (thePrato == null)
            {
                return null; // Retorna null se o prato não for encontrado
            }

            // Atualiza o estado de Ativo usando info.Ativo se info estiver presente
            if (info != null && info.Ativo != null)
            {
                thePrato.Ativo = info.Ativo;
            }
            // Usa prato.Ativo se info não foi fornecido e prato está presente
            else if (prato != null)
            {
                thePrato.Ativo = prato.Ativo;
            }

            // Atualiza o prato no repositório
            var updatedPrato = await _repo.UpdatePrato(thePrato);

            // Devolve os detalhes atualizados do prato
            return PratoDetail(updatedPrato);
        }

        public async Task<Prato2detail_dto?> UpdateEstadoPratoByIngrediente(long id, Prato2update_dto info, Prato? prato = null)
        {
            // Verifica se o prato existe no repositório
            var thePrato = await _repo.GetPratoById(id);
            if (thePrato == null)
            {
                return null; // Retorna null se o prato não for encontrado
            }

            // Se info.Ativo for verdadeiro, verifica o estado dos ingredientes
            if (info != null && info.Ativo == true)
            {
                // Verifica se todos os ingredientes do prato estão ativos
                bool todosIngredientesAtivos = thePrato.Ingredientes.All(ing => ing.Ativo);

                // Ativa o prato somente se todos os ingredientes estiverem ativos
                thePrato.Ativo = todosIngredientesAtivos;
            }
            else if (info != null && info.Ativo == false)
            {
                // Desativa o prato se info.Ativo for falso
                thePrato.Ativo = false;
            }

            // Atualiza o prato no repositório
            var updatedPrato = await _repo.UpdatePrato(thePrato);

            // Devolve os detalhes atualizados do prato
            return PratoDetail(updatedPrato);
        }


        //Método para transformar um prato em Prato2listing_dto
        public Prato2listing_dto PratoListItem(Prato p)
        {
            // Verifica se TipoPrato é nulo
            if (p.TipoPrato == null)
            {
                throw new ArgumentNullException(nameof(p.TipoPrato), "TipoPrato não pode ser nulo.");
            }

            return new Prato2listing_dto
            {
                IdPrato = (int)p.IdPrato,
                Nome = p.Nome,
                TipoPrato = p.TipoPrato,
                Ativo = p.Ativo,
                Receita = p.Receita
            };
        }

        public async Task UpdateEstadoDosPratosQueContemIngrediente(long ingredienteId)
        {
            // Obtém todos os pratos que contêm esse ingrediente
            var pratos = await _repo.GetPratosByIngredienteId(ingredienteId);

            foreach (var prato in pratos)
            {
                // Reavalia o estado do prato com base nos estados dos ingredientes
                await UpdateEstadoPratoByIngrediente(prato.IdPrato, new Prato2update_dto { Ativo = prato.Ativo });
            }
        }


        //US009
        public async Task<bool?> GetEstadoDePratoById(long pratoId)
        {
            // Usa diretamente o método IsPratoAtivo para verificar o estado do prato
            var prato = await _repo.GetPratoById(pratoId);
            return prato?.Ativo;
        }
    }
}
