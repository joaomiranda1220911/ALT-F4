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
        private readonly CozinhaContext _context;
        private readonly EmentasService _service;

        public EmentasController(CozinhaContext context)
        {
            _context = context;
            _service = new EmentasService(context);
        }


        //US016: Apresentar ementa disponível com base na data, tipo e quantidade
        [HttpGet("ementa")]
        public async Task<ActionResult<Prato2listing_dto>> ApresentarEmenta(
            [FromQuery] string tipoRefeicao, //Recebe o tipo de refeição como parâmetro de consulta
            [FromQuery] DateTime data)
        {

            var ementa = await _service.GetEmentaDisponivel(tipoRefeicao, data);
            if (ementa == null || !ementa.Any())
            {
                return NotFound("Nenhuma ementa disponível.");
            }
            return Ok(ementa);
        }
        
        //Endpoint para obter a ementa disponível
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prato>>> GetEmentaDisponivel(
            [FromQuery] DateTime data,
            [FromQuery] int tipoDeRefeicaoId)
        {
            var ementa = await _service.GetEmentaDisponivel(data, tipoDeRefeicaoId);
            if (!ementa.Any())
            {
                return NotFound("Nenhuma ementa disponível");
            }
            else
            {
                return Ok(ementa);
            }
        }

    }
}

