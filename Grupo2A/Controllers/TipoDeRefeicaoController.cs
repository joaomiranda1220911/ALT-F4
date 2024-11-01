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
    public class TipoDeRefeicaoController : ControllerBase
    {
        private readonly CozinhaContext _context;
        private TipoDeRefeicaoService _service;

        public TipoDeRefeicaoController(CozinhaContext context)
        {
            _context = context;
            _service = new TipoDeRefeicaoService(context);
        }

        // US011: Definir tipos de refeição, como almoço ou jantar.
        [HttpPost("CreateTipoRefeicao")]
        public async Task<IActionResult> CreateTipoRefeicao([FromBody] TipoRefeicao2detail_dto tipoRefeicaoDto)
        {
            // Verificar se o objeto recebido é nulo ou se o nome é vazio
            if (tipoRefeicaoDto == null || string.IsNullOrWhiteSpace(tipoRefeicaoDto.Nome))
                return BadRequest("O nome do tipo de refeição não pode ser vazio.");

            // Criar o tipo de refeição
            var tipoRefeicaoCriado = await _service.CreateTipoRefeicao(tipoRefeicaoDto.Nome);

            // Verificar se a criação falhou (tipo de refeição já existe)
            if (tipoRefeicaoCriado == null)
                return Conflict("Tipo de refeição já existe ou ocorreu um erro.");

            // Retornar o resultado da criação com um código de sucesso
            return Ok(tipoRefeicaoCriado);
        }


        //US012: Listar tipos de refeição disponíveis.
        [HttpGet("GetAllTipoRefeicao")]
        public async Task<IActionResult> GetAllTipoRefeicao()
        {
            var tiposRefeicao = await _TipoDeRefeicaoService.GetAllTiposRefeicao();
            return Ok(tiposRefeicao);
        }

        //US013: Criar uma refeição especificando prato, data, tipo e quantidade.
        [HttpPost("CreateRefeicao")]
        public async Task<IActionResult> CreateRefeicao([FromBody] Refeicao2create_dto novaRefeicao)
        {
            var refeicaoCriada = await _TipoDeRefeicaoService.CreateRefeicao(novaRefeicao);
            if (refeicaoCriada == null)
                return BadRequest("Erro ao criar a refeição.");

            return Ok(refeicaoCriada);
        }

    }
}
