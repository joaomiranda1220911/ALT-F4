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

        public RefeicoesController(CozinhaContext context )
        {
            _context = context;
            _service = new RefeicoesService(context);
            _serviceP=new PratosService(context);
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
        [HttpDelete("{IdRefeicao}")]
        public async Task<ActionResult> DeleteRefeicao(long IdRefeicao)
        {
            //Chama o método RemoverRefeicaoFutura para eliminar a refeição futura
            var result = await _service.DeleteRefeicao(IdRefeicao);
            //Se a refeição não for encontrada, retorna NotFound
            if (!result)
            {
                return NotFound("Refeição futura não encontrada.");
            }
            return NoContent();// Caso a refeição seja eliminada com sucesso, retorna NoContent
        }

        //US016: Apresentar ementa disponível com base na data, tipo e quantidade
        [HttpGet("ementa")]
        public async Task<ActionResult<Prato2listing_dto>> ApresentarEmenta(
            [FromQuery] string tipoRefeicao, //Recebe o tipo de refeição como parâmetro de consulta
            [FromQuery] DateTime data)
        {

            var ementa = await _service.GetEmentaDisponivel(tipoRefeicao, data);
            if (ementa == null || !ementa.Any())
            {
                return NotFound("Nenhuma ementa disponível.");
            }
            return Ok(ementa);
        }
    }
}


