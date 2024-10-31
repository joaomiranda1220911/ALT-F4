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

    }
}