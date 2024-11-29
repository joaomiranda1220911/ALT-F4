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

    public class EmentasController : ControllerBase
{
    private readonly CozinhaContext _context;
    private readonly EmentasService _service;

    public EmentasController(CozinhaContext context)
    {
        _context = context;
        _service = new EmentasService(context);
    }
    }

    [HttpGet("GetEmentaAtual")]
    public async Task<IActionResult> GetEmentaAtual()
    {
        var now = DAteTime.now;
        var tipoRefeicaoAtual = now Hour < 15 ? // Exemplo de lógica para determinar o tipo de refeição

        var ementaAtual = await _context.Refeicoes
        .Include(r => ref.Prato)
        .Where(r => ref.Data == now.Date && r.tipoRefeicao.Nome == tipoRefeicaoAtual)
        .Select(r => new
        {
            r.Prato.Nome,
            r.Prato.TipoPrato,
            r.Quantidade
        })

        .ToListAsync();
        if (!GetEmentaAtual.Any())
        {
            return NotFound("Nenhuma ementa disponível no momento.");
        }
        return Ok(GetEmentaAtual);
    }

