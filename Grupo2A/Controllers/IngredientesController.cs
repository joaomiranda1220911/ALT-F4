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
    public class IngredientesController : ControllerBase
    {
        private readonly CozinhaContext _context;
        private IngredientesService _service;
        private PratosService _serviceP;

        public IngredientesController(CozinhaContext context)
        {
            _context = context;
            _service = new IngredientesService(context);
            _serviceP = new PratosService(context);
        }
        
        [HttpPost]
        public async Task<ActionResult<Ingrediente2detail_dto>> PostIngrediente(Ingrediente2create_dto ingrediente)
        {
            return await _service.CreateNewIngrediente(ingrediente);
        }

        // GET: api/Ingredientes/active
        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<Ingrediente2listing_dto>>> GetAllActiveIngredientes()
        {
            return await _service.GetIngredientesByAtiveState(true);
        }

        // GET: api/Ingredientes/inactive
        [HttpGet("inactive")]
        public async Task<ActionResult<IEnumerable<Ingrediente2listing_dto>>> GetAllInactiveIngredientes()
        {
            return await _service.GetIngredientesByAtiveState(false);
        }

        // PUT: api/Ingredientes/inativar/{idIngrediente}
        [HttpPut("inativar/{idIngrediente}")]
        public async Task<IActionResult> UpdateEstadoIngredienteInativar(long idIngrediente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            // Inativar o ingrediente
            var theUpdateIngrediente = await _service.UpdateIngrediente(idIngrediente);
            if (theUpdateIngrediente == null)
            {
                return NotFound();
            }

            // Obter todos os pratos que contêm este ingrediente
            var pratos = await _service.GetPratosByIngredienteId(idIngrediente);
            if (pratos == null || !pratos.Any())
            {
                return NoContent();
            }

            // Inativar cada prato associado ao ingrediente
            foreach (var prato in pratos)
            {
                prato.Ativo = false;
                var info = new Prato2update_dto
                {
                    Ativo = prato.Ativo,
                };

                var updateResult = await _serviceP.UpdateEstadoPrato(prato.IdPrato, info);
                if (updateResult == null)
                {
                    return StatusCode(500, "Erro ao atualizar o prato.");
                }
            }

            return Ok(theUpdateIngrediente);
        }

        // PUT: api/Ingredientes/ativar/{idIngrediente}
        [HttpPut("ativar/{idIngrediente}")]
        public async Task<IActionResult> UpdateEstadoIngredienteAtivar(long idIngrediente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            // Ativar o ingrediente
            var theUpdateIngrediente = await _service.UpdateIngrediente(idIngrediente);
            if (theUpdateIngrediente == null)
            {
                return NotFound();
            }

            // Obter todos os pratos que contêm este ingrediente
            var pratos = await _service.GetPratosByIngredienteId(idIngrediente);
            if (pratos == null || !pratos.Any())
            {
                return NoContent();
            }

            // Verificar o estado de cada prato e ativá-lo se todos os ingredientes estiverem ativos
            foreach (var prato in pratos)
            {
                bool todosIngredientesAtivos = prato.Ingredientes.All(i => i.Ativo);

                if (todosIngredientesAtivos)
                {
                    var info = new Prato2update_dto
                    {
                        Ativo = true,
                    };

                    await _serviceP.UpdateEstadoPrato(prato.IdPrato, info);
                }
            }

            return Ok(theUpdateIngrediente);
        }
    }
}