using Cozinha_BE.Model;
using Microsoft.AspNetCore.Mvc;
using Grupo2A.Services;

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

    }
}