using Cozinha_BE.Model;

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
    }
}