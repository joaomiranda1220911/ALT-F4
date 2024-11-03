using Cozinha_BE.Model;
using Microsoft.AspNetCore.Mvc;
using Grupo2A.Services;
using Cozinha_BE.Model.DTO;

namespace Grupo2A.Controllers{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoDePratoController : ControllerBase{
        private readonly CozinhaContext _context;
        private TipoDePratoService _service;

    public TipoDePratoController(CozinhaContext context){
        _context = context;
        _service = new TipoDePratoService(context);
    }
    

    //US004 - Criar Tipo de Prato
    [HttpPost]
    public async Task<ActionResult<TipoDePrato2detail_dto>> PostTipoDePrato(TipoDePrato tipoDePrato){
        return await _service.CreateNewTipoDePrato(tipoDePrato);
    }

    //US005 - Listar todos os Tipos de Prato
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TipoDePrato2listing_dto>>> GetTiposDePratos(){
        return await _service.GetTiposDePratos();
    }

    //US006 - Obter informação sobre um Tipo de Prato Específico
    [HttpGet("{Id}")]
    public async Task<ActionResult<TipoDePrato2detail_dto>> GetTipoDePratoById(long Id){
        var tipoDePrato = await _service.GetTipoDePratoById(Id);
        if(tipoDePrato == null){
            return NotFound();
        }
        return Ok(tipoDePrato);
    }

    }
}