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

            // Lista para armazenar os pratos atualizados
            var pratosInativados = new List<Prato>();

            // Inativar cada prato associado ao ingrediente
            foreach (var prato in pratos)
            {
                prato.Ativo = false; // Atualiza o estado do prato para inativo
                var info = new Prato2update_dto
                {
                    Ativo = prato.Ativo,
                };

                var updateResult = await _serviceP.UpdateEstadoPrato(prato.IdPrato, info);
                if (updateResult != null)
                {
                    pratosInativados.Add(prato); // Adiciona o prato à lista se a atualização for bem-sucedida
                }
            }

            return Ok(new
            {
                ingrediente = theUpdateIngrediente,
                pratosInativados // Retorna a lista de pratos inativados
            });
        }



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

            // Crie uma lista para armazenar os pratos atualizados
            var pratosAtualizados = new List<Prato2detail_dto>();

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

                    // Atualiza o prato e adiciona à lista de pratos atualizados
                    var updatedPrato = await _serviceP.UpdateEstadoPrato(prato.IdPrato, info);
                    pratosAtualizados.Add(updatedPrato);
                }
            }

            // Retorna o ingrediente atualizado e a lista de pratos atualizados
            return Ok(new { ingrediente = theUpdateIngrediente, pratosAtualizados });
        }

        // GET: api/Ingredientes/{idIngrediente}
        [HttpGet("{idIngrediente}")]
        public async Task<ActionResult<Ingrediente2detail_dto>> GetIngredienteById(long idIngrediente)
        {
            // Buscar o ingrediente pelo ID
            var ingrediente = await _service.GetIngredienteById(idIngrediente);

            // Verificar se o ingrediente foi encontrado
            if (ingrediente == null)
            {
                return NotFound(); // Retorna 404 se o ingrediente não existir
            }

            return Ok(ingrediente); // Retorna o ingrediente encontrado
        }


        // DELETE: api/Ingredientes/{idIngrediente}
        [HttpDelete("{idIngrediente}")]
        public async Task<IActionResult> DeleteIngredienteById(long idIngrediente)
        {
            // Verificar se o ingrediente existe
            var ingrediente = await _service.GetIngredienteById(idIngrediente);
            if (ingrediente == null)
            {
                return NotFound();
            }

            // Remover o ingrediente
            await _service.DeleteIngrediente(idIngrediente);

            // Opcional: Se você quiser inativar todos os pratos que contêm este ingrediente ao excluí-lo
            var pratos = await _service.GetPratosByIngredienteId(idIngrediente);
            if (pratos != null && pratos.Any())
            {
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
                        return StatusCode(500, "Erro ao atualizar o prato associado ao ingrediente.");
                    }
                }
            }

            return NoContent(); // Indica que a exclusão foi bem-sucedida, mas não há conteúdo para retornar.
        }

    }
}