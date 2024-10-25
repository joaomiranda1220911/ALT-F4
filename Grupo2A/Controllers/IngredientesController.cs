using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Cozinha_BE.Model;
using IngredientesService.Services;


namespace Ingredientes.Controllers
{
    public class IngredientesController : ControllerBase
    {
        private readonly CozinhaContext _context;
        private IngredientesService _service;

        public IngredientesController(CozinhaContext context)
        {
            _context = context;
            _service = new IngredientesService(context);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEstadoPrato(long id, Prato2update_dto info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var theUpdatePrato = await _service.PutHero(id, info);

            return (theUpdatePrato == null) ? NotFound() : theUpdatePrato;
        }


        // public async Task<ActionResult> UpdateEstadoIngredienteInativar(long idIngrediente)
        // {
        //     // procurar o ingrediente e inativá-lo

        //     //procurar os pratos que o contem e update estado prato
        // public async Task<ActionResult> UpdateEstadoIngredienteAtivar(long idIngrediente)
        // {
        //     // procurar o ingrediente e ativa-lo

        //     //procurar os pratos que o contem e fazer logica para update estado prato
        // }

    }
}




