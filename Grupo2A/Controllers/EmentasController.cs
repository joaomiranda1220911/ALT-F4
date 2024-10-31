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
    public class EmentasController : ControllerBase
    {
        private readonly EmentasService _ementasService;

        public EmentasController(EmentasService ementasService)
        {
            _ementasService = ementasService;
        }

        //Endpoint para obter a ementa disponível
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prato>>> GetEmentaDisponivel(
            [FromQuery] DateTime data,
            [FromQuery] int tipoDeRefeicaoId)
        {
            var ementa = await _ementasService.GetEmentaDisponivel(data, tipoDeRefeicaoId);
            if (!ementa.Any())
            {
                return NotFound("Nenhum prato disponível");
            }
            else
            {
                return Ok(ementa);
            }
        }

    }
}

