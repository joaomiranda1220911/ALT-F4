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

        public async Task<ActionResult> UpdateEstadoIngredienteInativar(long idIngrediente)
        {
            // Verifica se o estado do modelo é válido
            if (!ModelState.IsValid)
            {
                return BadRequest(); // Retorna um erro 400 (Bad Request) se o modelo não for válido
            }

            // Passo 1: Inativar o ingrediente
            var theUpdateIngrediente = await _service.UpdateIngrediente(idIngrediente);

            // Verifica se o ingrediente foi encontrado e atualizado
            if (theUpdateIngrediente == null)
            {
                return NotFound(); // Retorna 404 (Not Found) se o ingrediente não existir
            }

            // Passo 2: Obter todos os pratos que contêm este ingrediente
            var pratos = await _service.GetPratosByIngredienteId(idIngrediente);
            if (pratos == null || !pratos.Any())
            {
                return NoContent(); // Retorna 204 (No Content) se não houver pratos associados
            }

            // Passo 3: Inativar cada prato
            foreach (var prato in pratos)
            {
                prato.Ativo = false; // Define como inativo
                var updateResult = await _serviceP.UpdatePratoByIngrediente(prato.IdPrato, prato);
                if (updateResult == null)
                {
                    // Aqui, você pode adicionar logs ou outros tratamentos de erro
                    return StatusCode(500, "Erro ao atualizar o prato."); // Retorna erro 500 em caso de falha na atualização
                }
            }

            return Ok(theUpdateIngrediente); // Retorna 200 (Ok) com o ingrediente atualizado
        }






        // public async Task<ActionResult> UpdateEstadoIngredienteAtivar(long idIngrediente)
        // {
        //     // Verifica se o estado do modelo é válido
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest(); // Retorna um erro 400 (Bad Request) se o modelo não for válido
        //     }

        //     // Passo 2: Inativar o ingrediente
        //     var theUpdateIngrediente = await _service.UpdateIngrediente(idIngrediente); // Chama o serviço para atualizar o ingrediente pelo ID fornecido

        //     // Verifica se o ingrediente foi encontrado e atualizado
        //     return (theUpdateIngrediente == null) ? NotFound() : Ok(theUpdateIngrediente); // Retorna 404 (Not Found) se o ingrediente não existir, ou 200 (Ok) com o ingrediente atualizado se a operação for bem-sucedida


        //     // inativar todos os pratos em que ele é o unico inativo

        // }

    }
}




