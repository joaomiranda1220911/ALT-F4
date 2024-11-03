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

        //US007 - Criar Prato
        [HttpPost]
        public async Task<ActionResult<Prato2detail_dto>> PostPrato(Prato2create_dto prato)
        {
            var (novoPrato, mensagem) = await _service.CreateNewPrato(prato);

            if (novoPrato == null)
            {
                // Return a BadRequest with the message if prato creation failed
                return BadRequest(mensagem);
            }

            // Return the created Prato2detail_dto
            return CreatedAtAction(nameof(PostPrato), new { id = novoPrato.IdPrato }, novoPrato);
        }

        // PUT ou PATCH para atualizar o estado do prato
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEstadoPrato(long id, [FromBody] Prato2update_dto info)
        {
            if (info == null)
            {
                return BadRequest("As informações do prato não podem ser nulas.");
            }

            var updatedPrato = await _service.UpdateEstadoPrato(id, info);

            if (updatedPrato == null)
            {
                return NotFound($"Prato com ID {id} não encontrado.");
            }

            return Ok(updatedPrato); // Retorna os detalhes do prato atualizado
        }
    }

    

}



