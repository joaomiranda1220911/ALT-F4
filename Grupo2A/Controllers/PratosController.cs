using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Cozinha_BE.Model;
using Cozinha_BE.Model.DTO;
using Grupo2A.Services;


namespace Grupo2A.Controllers
{
    public class PratosController : ControllerBase
    {
        private readonly CozinhaContext _context;
        private PratosService _service;

        public PratosController(CozinhaContext context)
        {
            _context = context;
            _service = new PratosService(context);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEstadoPrato(long id, Prato2update_dto info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var theUpdatePrato = await _service.UpdatePrato(id, info);

            return (theUpdatePrato == null) ? NotFound() : Ok(theUpdatePrato);
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
        public async Task<ActionResult> DeleteRefeicao(long idPrato){
            //Chama o método RemoverRefeicaoFutura para eliminar a refeição futura
            var result = await _service.DeleteRefeicao(idPrato);
            //Se a refeição não for encontrada, retorna NotFound
            if (!result){
                return NotFound("Refeição futura não encontrada.");
            }
            return NoContent();// Caso a refeição seja eliminada com sucesso, retorna NoContent
        }
    }

}



