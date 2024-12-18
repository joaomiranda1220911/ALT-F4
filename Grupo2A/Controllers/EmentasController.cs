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
    }
}


