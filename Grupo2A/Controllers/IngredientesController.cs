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


namespace Grupo2A.Controllers{
    public class IngredientesController : ControllerBase
    {
        private readonly CozinhaContext _context;
        private IngredientesService _service;

        public IngredientesController(CozinhaContext context)
        {
            _context = context;
            _service = new IngredientesService(context);
        }



        // public async Task<ActionResult> UpdateEstadoIngredienteInativar(long idIngrediente)
        // {
        //     // procurar o ingrediente e inativá-lo

        //     //procurar os pratos que o contem e update estado prato


        // public async Task<ActionResult> UpdateEstadoIngredienteAtivar(long idIngrediente)
        // {
        //     // procurar o ingrediente e ativa-lo

        //     //procurar os pratos que o contem e fazer logica para update estado prato
        // }

    }
}




