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
        public async Task<ActionResult<Prato2detail_dto>> PostPrato (Prato2create_dto prato){
            return await _service.CreateNewPrato(prato);
        }

        //US008: Atualizar o estado do Prato
        [HttpPut("{id}/estado")]
        public async Task<ActionResult> UpdateEstadoPrato(long id, Prato2update_dto info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var theUpdatePrato = await _service.UpdateEstadoPrato(id, info);

            return (theUpdatePrato == null) ? NotFound() : Ok(theUpdatePrato);
        }

        
    }

}



