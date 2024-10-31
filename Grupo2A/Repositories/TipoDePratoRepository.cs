using Cozinha_BE.Model;
using Microsoft.EntityFrameworkCore;

namespace Grupo2A.Repositories{
    public class TipoDePratoRepository{
        private CozinhaContext _context;
        public TipoDePratoRepository(CozinhaContext context){
            _context = context;
        }

        //US004 - Criar Tipo de Prato
        public async Task <TipoDePrato> AddTipoDePrato(TipoDePrato tipoDePrato){
            System.Console.WriteLine("in");
            var newTipoDePrato = await _context.TiposDePrato.AddAsync(tipoDePrato);

            await _context.SaveChangesAsync();
            return newTipoDePrato.Entity;
        }

        //US005 - Listar todos os tipos de pratos
        public async Task <List<TipoDePrato>> GetAllTiposDePratosFromDataBase(){
            return await _context.TiposDePrato.ToListAsync();
        }
    }
}