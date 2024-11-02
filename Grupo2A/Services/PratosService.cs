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

        public PratosService(CozinhaContext context)
        {
            // Garante que o context não seja nulo
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _repo = new PratosRepository(_context);
            _repoTipoDeRefeicao = new TipoDeRefeicaoRepository(_context);

        }


        public async Task<bool> IsPratoAtivo(long pratoId)
        {
            // Recupera o prato pelo ID
            var prato = await _repo.GetPratoById(pratoId);
            // Verifica se o prato existe e se está ativo
            return prato != null && prato.Ativo == true; // Verifica se Ativo é true
        }



        // US007 - Criar Prato
        // US007 - Criar Prato
        public async Task<Prato2detail_dto> CreateNewPrato(Prato2create_dto info)
        {
            Prato newPrato = new Prato
            {
                Nome = info.Nome,
                TipoPrato = info.TipoPrato, // Este campo deve ser obrigatório
                Ingredientes = info.Ingredientes, // Este campo é opcional
                Receita = info.Receita,
                Ativo = info.Ativo,
                Quantidade = info.Quantidade ?? 0, // Define um valor padrão caso não esteja preenchido
                DataServico = info.DataServico ?? DateTime.Now, // Usa a data atual como valor padrão se estiver vazio
                TipoRefeicao = info.TipoRefeicao // Este campo é opcional
            };

            // Verificar se o tipo de refeição foi preenchido e, se sim, verificar a sua existência
            if (newPrato.TipoRefeicao != null)
            {
                var tipoRefeicaoExistente = await _repoTipoDeRefeicao.GetTipoRefeicaoByNome(newPrato.TipoRefeicao.Nome);
                if (tipoRefeicaoExistente == null)
                {
                    throw new ArgumentException("Esse tipo de refeição não existe.");
                }
            }

            return PratoDetail(await _repo.AddPrato(newPrato));
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
                Ativo = p.Ativo,
                Quantidade = p.Quantidade, // Inclui o valor opcional de Quantidade
                DataServico = p.DataServico, // Inclui o valor opcional de DataServico
                TipoRefeicao = p.TipoRefeicao // Inclui o valor opcional de TipoRefeicao
            };
        }


        //US008: Atualizar o estado do Prato
        //Também usado em US009 e US010 
        public async Task<Prato2detail_dto?> UpdateEstadoPrato(long id, Prato2update_dto info, Prato? prato = null)
        {
            // Verifica se o prato existe no repositório
            var thePrato = await _repo.GetPratoById(id);
            if (thePrato == null)
            {
                return null; // Retorna nulo se o prato não for encontrado
            }

            // Atualiza o estado de Ativo usando o valor de info.Ativo
            if (info != null)
            {
                // Como Ativo é requerido em Prato2update_dto, não precisa de verificação adicional.
                thePrato.Ativo = info.Ativo;
            }
            // Se `info` não foi fornecido, mas `prato` foi passado, usa prato.Ativo.
            else if (prato != null)
            {
                thePrato.Ativo = prato.Ativo; // prato.Ativo é requerido
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
                TipoRefeicao = p.TipoRefeicao, 
                Receita = p.Receita, 
                Quantidade = p.Quantidade, 
                DataServico = p.DataServico
            };
        }

    }
}

