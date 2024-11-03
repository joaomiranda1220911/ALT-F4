using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Cozinha_BE.Model;
using Grupo2A.Services;
using Cozinha_BE.Model.DTO;


namespace Grupo2A.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefeicoesController : ControllerBase
    {
        private readonly CozinhaContext _context;
        private RefeicoesService _service;
        private PratosService _serviceP;

        public RefeicoesController(CozinhaContext context)
        {
            _context = context;
            _service = new RefeicoesService(context);
            _serviceP = new PratosService(context);
        }


        //US013 - Criar Refeicao
        [HttpPost]
        public async Task<ActionResult<Refeicao2detail_dto>> PostRefeicao(Refeicao2create_dto refeicao)
        {
            var (novaRefeicao, mensagem) = await _service.CreateNewRefeicao(refeicao);

            if (novaRefeicao == null)
            {
                // Return a BadRequest with the message if refeicao creation failed
                return BadRequest(mensagem);
            }

            // Return the created refeicao2detail_dto
            return CreatedAtAction(nameof(PostRefeicao), new { id = novaRefeicao.IdRefeicao }, novaRefeicao);
        }

        //US014: Servir Refeição (decrementar quantidade)
        [HttpPost("{idPrato}/servir")]
        public async Task<ActionResult> ServirRefeicao(long idPrato)
        {
            // Chama o serviço para servir uma refeição (decrementar a quantidade)
            var prato = await _service.ServirRefeicao(idPrato);

            // Verifica se o prato existe e possui quantidade disponível
            if (prato == null)
            {
                return NotFound("Refeição não encontrada ou quantidade insuficiente."); // Retorna 404 se não for encontrado ou se não houver quantidade suficiente
            }

            return Ok(prato); // Retorna o prato atualizado com a quantidade decrementada
        }


        //US015: Remover refeição futura
        [HttpDelete("{idRefeicao}")]
        public async Task<ActionResult> DeleteRefeicao(long idRefeicao)
        {
            // Chama o serviço para remover a refeição
            var result = await _service.DeleteRefeicao(idRefeicao);

            // Verifica se a refeição foi encontrada e removida
            if (!result)
            {
                return NotFound("Refeição não encontrada.");
            }

            // Retorna uma mensagem de confirmação ao Postman
            return Ok("Refeição eliminada com sucesso.");
        }

        //US016: Apresentar ementa disponível com base na data, tipo e quantidade[HttpPost("filtrar")][HttpPost("filtrar")]
        [HttpPost("filtrar")]
        public async Task<ActionResult<IEnumerable<Refeicao>>> GetRefeicaoByDataETipo(
                    [FromBody] Refeicao2listing_dto request)
        {
            if (request == null)
            {
                return BadRequest("Request não pode ser nulo.");
            }

            // Obtém a data e o tipo de refeição do DTO
            var data = request.Data;
            var tipoRefeicao = request.TipoRefeicao;

            // Implementa a lógica para obter as refeições com base na data e tipo de refeição
            var refeicoes = await _service.GetRefeicaoByDataETipo(data, tipoRefeicao);

            if (refeicoes == null || !refeicoes.Any())
            {
                return NotFound("Nenhuma refeição disponível para os critérios especificados.");
            }

            return Ok(refeicoes);
        }

    }
}


