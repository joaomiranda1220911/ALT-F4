using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Cozinha_BE.Model;


namespace Receitas.Controllers
{
    public class ReceitasController : ControllerBase
    {
        private readonly CozinhaContext _context;
        private ReceitasService _service;

        public ReceitasController(CozinhaContext context)
        {
            _context = context;
            _service = new ReceitasService(context);
        }

    }
    // [HttpPost("CreateTipoRefeicao")]
    //     public async Task<IActionResult> CreateTipoRefeicao([FromBody] string nomeTipoRefeicao)
    //     {
    //         var tipoRefeicaoCriado = await _service.CreateTipoRefeicao(nomeTipoRefeicao);
    //         return Ok(tipoRefeicaoCriado);
    //     }

    }
