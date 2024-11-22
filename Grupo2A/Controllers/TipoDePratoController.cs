using Cozinha_BE.Model;
using Microsoft.AspNetCore.Mvc;
using Grupo2A.Services;
using Cozinha_BE.Model.DTO;
using Microsoft.EntityFrameworkCore;

namespace Grupo2A.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoDePratoController : ControllerBase
    {
        private readonly CozinhaContext _context;
        private TipoDePratoService _service;

        public TipoDePratoController(CozinhaContext context)
        {
            _context = context;
            _service = new TipoDePratoService(context);
        }


        //US004 - Criar Tipo de Prato
        [HttpPost]
        public async Task<ActionResult<TipoDePrato2detail_dto>> PostTipoDePrato(TipoDePrato tipoDePrato)
        {
            return await _service.CreateNewTipoDePrato(tipoDePrato);
        }

        [HttpGet]
        public async Task<IActionResult> GetTiposDePratos()
        {
            var tiposDePratos = await _context.TiposDePrato
                .ToListAsync(); // Converte a consulta para uma lista

            if (tiposDePratos == null || !tiposDePratos.Any())
            {
                return NotFound("Nenhum tipo de prato encontrado.");
            }

            return Ok(tiposDePratos);
        }


        //US006 - Obter informação sobre um Tipo de Prato Específico
        [HttpGet("{Id}")]
        public async Task<ActionResult<TipoDePrato2detail_dto>> GetTipoDePratoById(long Id)
        {
            var tipoDePrato = await _service.GetTipoDePratoById(Id);
            if (tipoDePrato == null)
            {
                return NotFound();
            }
            return Ok(tipoDePrato);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoDePratoById(long id)
        {
            var tipoDePrato = await _context.TiposDePrato.FindAsync(id);
            if (tipoDePrato == null)
            {
                return NotFound();
            }

            _context.TiposDePrato.Remove(tipoDePrato);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}