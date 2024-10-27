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

    }
}


