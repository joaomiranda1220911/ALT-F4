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
        private object? _service;
        private CozinhaContext _context;
        private PratosRepository _repo;
        private object service;

        public PratosService(CozinhaContext context)
        {
            _service = service;
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

        //US014: Servir Refeição (decrementar quantidade)
        public async Task<Prato?> ServirRefeicao(long idPrato)
        {

            //Procura o prato na base de dados
            var prato = await _context.Pratos.FindAsync(idPrato);
            //Verifica se o prato possui quantidade suficiente para ser servido
            if (prato == null || prato.Quantidade <= 0) //Se o prato não existir ou a quantidade for 0 ou <0, retorna null
            {
                return null; //Retorna null se o prato não for encontrado ou se a quantidade for insuficiente
            }

            prato.Quantidade--; //Incrementa a quantidade disponível do prato
            await _context.SaveChangesAsync(); //Guarda as mudanças
            return prato; //Retorna o prato atualizado com a nova quantidade
        }

        //US015: Remover uma refeição futura
        public async Task<bool> DeleteRefeicao(long idPrato)
        {
            //Procura o prato na base de dados
            var prato = await _context.Pratos.FindAsync(idPrato);

            //Verifica se o prato existe e se a data de serviço é futura
            if (prato == null || prato.DataServico <= DateTime.Now)
            {
                return false; //Caso o prato não seja encontrado ou a data já tenha passado
            }

            //Remove prato da BD e guarda as mudanças
            _context.Pratos.Remove(prato);
            await _context.SaveChangesAsync();
            //Retorna true indicando que o prato foi removido com sucesso
            return true;
        }

    }

}

