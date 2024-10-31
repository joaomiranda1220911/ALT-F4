using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Cozinha_BE.Model;
using Grupo2A.Services;


namespace Grupo2A.Controllers
{
    public class TipoDeRefeicaoController : ControllerBase
    {
        private readonly CozinhaContext _context;
        private TipoDeRefeicaoService _service;

        public TipoDeRefeicaoController(CozinhaContext context)
        {
            _context = context;
            _service = new TipoDeRefeicaoService(context);
        }

        //US11
        // [HttpPost("CreateTipoRefeicao")]
        // public async Task<IActionResult> CreateTipoRefeicao([FromBody] string nomeTipoRefeicao)
        // {
        //     var tipoRefeicaoCriado = await _TipoDeRefeicaoService.CreateTipoRefeicao(nomeTipoRefeicao);
        //     if (tipoRefeicaoCriado == null)
        //         return BadRequest("Tipo de refeição já existe ou ocorreu um erro.");

        //     return Ok(tipoRefeicaoCriado);
        // }

        //US12
        // [HttpGet("GetAllTipoRefeicao")]
        // public async Task<IActionResult> GetAllTipoRefeicao()
        // {
        //     var tiposRefeicao = await _TipoDeRefeicaoService.GetAllTiposRefeicao();
        //     return Ok(tiposRefeicao);
        // }

        //US13
        // [HttpPost("CreateRefeicao")]
        // public async Task<IActionResult> CreateRefeicao([FromBody] Refeicao2create_dto novaRefeicao)
        // {
        //     var refeicaoCriada = await _TipoDeRefeicaoService.CreateRefeicao(novaRefeicao);
        //     if (refeicaoCriada == null)
        //         return BadRequest("Erro ao criar a refeição.");

        //     return Ok(refeicaoCriada);
        // }

    }
}
