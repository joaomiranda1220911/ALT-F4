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
            var ingredientes = await _service.GetIngredientesByAtiveState(true);

            if (ingredientes == null || !ingredientes.Any())
            {
                return NotFound("Nenhum ingrediente ativo encontrado.");
            }

            return Ok(ingredientes);
        }

        // GET: api/Ingredientes/inactive
        [HttpGet("inactive")]
        public async Task<ActionResult<IEnumerable<Ingrediente2listing_dto>>> GetAllInactiveIngredientes()
        {
            var ingredientes = await _service.GetIngredientesByAtiveState(false);

            if (ingredientes == null || !ingredientes.Any())
            {
                return NotFound("Nenhum ingrediente inativo encontrado.");
            }

            return Ok(ingredientes);
        }



        // PUT: api/Ingredientes/inativar/{idIngrediente}
        [HttpPut("inativar/{idIngrediente}")]
        public async Task<IActionResult> UpdateEstadoIngredienteInativar(long idIngrediente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Informações inválidas.");
            }

            // Inativar o ingrediente
            var theUpdateIngrediente = await _service.UpdateIngrediente(idIngrediente, false);
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
                var info = new Prato2update_dto { Ativo = false }; // Define como inativo
                await _serviceP.UpdateEstadoPratoByIngrediente(prato.IdPrato, info);
            }

            return Ok(new { ingrediente = theUpdateIngrediente });
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
            var theUpdateIngrediente = await _service.UpdateIngrediente(idIngrediente, true);
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

            // Lista para armazenar os pratos que foram ativados
            var pratosAtualizados = new List<Prato2detail_dto>();

            // Verificar o estado de cada prato e ativá-lo apenas se todos os ingredientes estiverem ativos
            foreach (var prato in pratos)
            {
                // Verifica se todos os ingredientes do prato estão ativos
                bool todosIngredientesAtivos = prato.Ingredientes.All(i => i.Ativo == true); // Confirma que Ativo é true

                if (todosIngredientesAtivos)
                {
                    var info = new Prato2update_dto
                    {
                        Ativo = true,
                    };

                    // Atualiza o prato e adiciona-o à lista de pratos atualizados
                    var updatedPrato = await _serviceP.UpdateEstadoPratoByIngrediente(prato.IdPrato, info);
                    if (updatedPrato != null) // Verifica se a atualização foi bem-sucedida
                    {
                        pratosAtualizados.Add(updatedPrato); // Adiciona o prato à lista se for bem-sucedido
                    }
                }
            }

            // Retorna o ingrediente atualizado e a lista de pratos que foram efetivamente ativados
            return Ok(new { ingrediente = theUpdateIngrediente, pratosAtualizados });
        }
    }
}