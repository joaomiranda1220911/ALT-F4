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
    public class RefeicoesController : ControllerBase
    {
        private readonly CozinhaContext _context;
        private RefeicoesService _service;

        public RefeicoesController(CozinhaContext context, PratosService pratoService)
        {
            _context = context;
            _service = new RefeicoesService(context,pratoService);
        }

        // US013: Criar uma refeição especificando prato, data, tipo e quantidade.
        public async Task<ActionResult<Refeicao2detail_dto>> PostRefeicao(Refeicao2create_dto refeicao)
        {
            return await _service.CreateNewRefeicao(refeicao);
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
        [HttpDelete("{idPrato}")]
        public async Task<ActionResult> DeleteRefeicao(long idPrato)
        {
            //Chama o método RemoverRefeicaoFutura para eliminar a refeição futura
            var result = await _service.DeleteRefeicao(idPrato);
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

