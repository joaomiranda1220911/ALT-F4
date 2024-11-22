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
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace Grupo2A.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PratosController : ControllerBase
    {
        private readonly CozinhaContext _context;
        private PratosService _service;

        public PratosController(CozinhaContext context)
        {
            _context = context;
            _service = new PratosService(context);
        }

        [HttpGet("{idPrato}")]
        public async Task<IActionResult> GetPratoById(long idPrato)
        {
            var prato = await _context.Pratos
                .Include(p => p.TipoPrato) 
                .Include(p => p.Ingredientes) 
                .FirstOrDefaultAsync(p => p.IdPrato == idPrato); // Procura o prato pelo ID fornecido

            if (prato == null)
            {
                return NotFound("Prato não encontrado.");
            }

            return Ok(prato);
        }

        //US007 - Criar Prato
        [HttpPost]
        public async Task<ActionResult<Prato2detail_dto>> PostPrato(Prato2create_dto prato)
        {
            var (novoPrato, mensagem) = await _service.CreateNewPrato(prato);

            if (novoPrato == null)
            {
                // Retorna um BadRequest com a mensagem no caso de a criação falhar
                return BadRequest(mensagem);
            }


            return CreatedAtAction(nameof(PostPrato), new { id = novoPrato.IdPrato }, novoPrato);
        }

        // PUT: api/Pratos/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEstadoPratoByIngrediente(long id, [FromBody] Prato2update_dto info)
        {
            // Verifica se o objeto `info` foi recebido no body e contém o campo `Ativo`
            if (info == null || info.Ativo == null)
            {
                return BadRequest("As informações do prato, incluindo o estado Ativo, são necessárias.");
            }

            // Chama o Service para atualizar o estado do prato
            var updatedPrato = await _service.UpdateEstadoPratoByIngrediente(id, info);

            // Retorna NotFound se o prato não existir
            if (updatedPrato == null)
            {
                return NotFound($"Prato com ID {id} não encontrado.");
            }

            // Retorna o prato atualizado com status 200 OK
            return Ok(updatedPrato);
        }

        [HttpPut("estadoPrato/{id}")]
        public async Task<IActionResult> UpdateEstadoPrato(long id, [FromBody] Prato2update_dto info)
        {
            // Verifica se o objeto `info` foi recebido no body e contém o campo `Ativo`
            if (info == null || info.Ativo == null)
            {
                return BadRequest("As informações do prato, incluindo o estado Ativo, são necessárias.");
            }

            // Chama o Service para atualizar o estado do prato
            var updatedPrato = await _service.UpdateEstadoPrato(id, info);

            // Retorna NotFound se o prato não existir
            if (updatedPrato == null)
            {
                return NotFound($"Prato com ID {id} não encontrado.");
            }

            // Retorna o prato atualizado com status 200 OK
            return Ok(updatedPrato);
        }

        //US009
        [HttpGet("{id}/estado")]
        public async Task<ActionResult<bool?>> GetEstadoDePrato(long id)
        {
            var estado = await _service.GetEstadoDePratoById(id);
            if (estado == null)
            {
                return NotFound(); // Retorna 404 se o prato não for encontrado
            }
            return Ok(estado); // Retorna o estado do prato 
        }


    }



}



