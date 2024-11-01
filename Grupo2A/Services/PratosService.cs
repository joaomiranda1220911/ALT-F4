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


        public async Task<bool> IsPratoAtivo(long pratoId)
        {
            // Recupera o prato pelo ID
            var prato = await _repo.GetPratoById(pratoId);
            // Verifica se o prato existe e se está ativo
            return prato != null && prato.Ativo == true; // Verifica se Ativo é true
        }



        //US007 - Criar Prato
        public async Task<Prato2detail_dto> CreateNewPrato(Prato2create_dto info)
        {
            Prato newPrato = new Prato
            {
                Nome = info.Nome,
                TipoPrato = info.TipoPrato,
                Ingredientes = info.Ingredientes,
                Receita = info.Receita
            };
            return PratoDetail(await _repo.AddPrato(newPrato));
        }


        //Método para transformar um prato em Prato2detail_dto
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

        //US008: Atualizar o estado do Prato
        //Também usado em US009 e US010 
        public async Task<Prato2detail_dto?> UpdateEstadoPrato(long id, Prato2update_dto? info = null, Prato? prato = null)
        {
            // Verifica se o prato existe no repositório
            var thePrato = await _repo.GetPratoById(id);
            if (thePrato == null)
            {
                return null; // Retorna nulo se o prato não for encontrado
            }

            // Atualiza o estado de Ativo com base no tipo de objeto passado

            // Verifica se o parâmetro `info` foi fornecido e contém um valor para o estado `Ativo`.
            // Se `info` estiver presente, o estado do prato será atualizado com `info.Ativo`.
            if (info?.Ativo.HasValue == true)
            {
                thePrato.Ativo = info.Ativo.Value;
            }
            // Se `info` não foi fornecido, verifica o parâmetro `prato`, que também é opcional e pode ser `null`.
            // Se `prato` for passado, usa `prato.Ativo` para atualizar o estado do prato.
            else if (prato?.Ativo.HasValue == true)
            {
                thePrato.Ativo = prato.Ativo.Value;
            }

            // Atualiza o prato no repositório
            var updatedPrato = await _repo.UpdatePrato(thePrato);

            // Devolve os detalhes atualizados do prato
            return PratoDetail(updatedPrato);
        }

        //Método para transformar um prato em Prato2listing_dto
        public Prato2listing_dto PratoListItem(Prato p)
        {
            return new Prato2listing_dto
            {
                IdPrato = (int)p.IdPrato,
                Nome = p.Nome,
                TipoPrato = p.TipoPrato,
                Ativo = p.Ativo
            };
        }
    }
}

