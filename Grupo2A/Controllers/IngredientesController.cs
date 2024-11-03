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
        public async Task<IActionResult> UpdateEstadoIngredienteInativar(long idIngrediente, [FromBody] Prato2update_dto info)
        {
            if (!ModelState.IsValid || info == null)
            {
                return BadRequest("Informações inválidas.");
            }

            // Inativar o ingrediente
            var theUpdateIngrediente = await _service.UpdateIngrediente(idIngrediente, false); // Passa 'false' para inativar
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

            // Lista para armazenar os pratos atualizados
            var pratosInativados = new List<Prato2detail_dto>();

            // Inativar cada prato associado ao ingrediente
            foreach (var prato in pratos)
            {
                var updateInfo = new Prato2update_dto { Ativo = false };
                var updateResult = await _serviceP.UpdateEstadoPrato(prato.IdPrato, updateInfo);
                if (updateResult != null)
                {
                    pratosInativados.Add(updateResult); // Adiciona o prato à lista se a atualização for bem-sucedida
                }
            }

            return Ok(new
            {
                ingrediente = theUpdateIngrediente,
                pratosInativados // Retorna a lista de pratos inativados
            });
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
            var theUpdateIngrediente = await _service.UpdateIngrediente(idIngrediente, true); // Passa 'true' para ativar
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

            // Lista para armazenar os pratos que foram efetivamente ativados
            var pratosAtualizados = new List<Prato2detail_dto>();

            // Verificar o estado de cada prato e ativá-lo apenas se todos os ingredientes estiverem ativos
            foreach (var prato in pratos)
            {
                bool todosIngredientesAtivos = prato.Ingredientes.All(i => i.Ativo);
                if (todosIngredientesAtivos)
                {
                    var updateInfo = new Prato2update_dto { Ativo = true };
                    var updatedPrato = await _serviceP.UpdateEstadoPrato(prato.IdPrato, updateInfo);
                    if (updatedPrato != null)
                    {
                        pratosAtualizados.Add(updatedPrato); // Adiciona o prato à lista de pratos atualizados
                    }
                }
            }

            return Ok(new { ingrediente = theUpdateIngrediente, pratosAtualizados });
        }
    }
}