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
    public class TipoDeRefeicaoController : ControllerBase
    {
        private readonly CozinhaContext _context;
        private TipoDeRefeicaoService _service;

        public TipoDeRefeicaoController(CozinhaContext context)
        {
            _context = context;
            _service = new TipoDeRefeicaoService(context);
        }

        [HttpPost("CreateTipoRefeicao")]
        public async Task<IActionResult> CreateTipoRefeicao([FromBody] TipoRefeicao2detail_dto tipoRefeicaoDto)
        {
            if (tipoRefeicaoDto == null || string.IsNullOrWhiteSpace(tipoRefeicaoDto.Nome))
                return BadRequest("O nome do tipo de refeição não pode ser vazio.");

            var tipoRefeicaoCriado = await _service.CreateTipoRefeicao(tipoRefeicaoDto.Nome);

            // Se a criação falhar devido ao tipo de refeição já existir
            if (tipoRefeicaoCriado == null)
            {
                return Conflict(new { Message = "Tipo de refeição já existe." });
            }
            return Ok(tipoRefeicaoCriado);
        }

        [HttpGet("GetAllTiposRefeicao")]
        public async Task<IActionResult> GetAllTiposRefeicao()
        {
            var tiposRefeicao = await _service.GetAllTiposRefeicao();
            return Ok(tiposRefeicao);
        }

        // GET: api/TipoDeRefeicao/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoRefeicao2detail_dto>> GetTipoRefeicaoById(int id)
        {
            var tipoRefeicao = await _service.GetTipoRefeicaoById(id);
            if (tipoRefeicao == null)
            {
                return NotFound(); // Retorna 404 se não encontrar o tipo de refeição
            }
            return Ok(tipoRefeicao); // Retorna 200 com os detalhes do tipo de refeição
        }
        
    }
}
