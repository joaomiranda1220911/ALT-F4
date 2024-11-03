using Cozinha_BE.Model;
using Cozinha_BE.Model.DTO;
using Grupo2A.Repositories;

namespace Grupo2A.Services
{
    public class TipoDePratoService
    {
        private CozinhaContext _context;
        private TipoDePratoRepository _repo;

        public TipoDePratoService(CozinhaContext context)
        {
            _context = context;
            _repo = new TipoDePratoRepository(_context);
        }

        //US004 - Criar Tipo de Prato
        public async Task<TipoDePrato2detail_dto> CreateNewTipoDePrato(TipoDePrato newTipoDePrato)
        {

            return TipoDePratoDetail(await _repo.AddTipoDePrato(newTipoDePrato));
        }

        private TipoDePrato2detail_dto TipoDePratoDetail(TipoDePrato tipoDePrato)
        {
            return new TipoDePrato2detail_dto
            {
                IdTipoPrato = tipoDePrato.IdTipoPrato,
                Nome = tipoDePrato.Nome,
                DescricaoTipoPrato = tipoDePrato.DescricaoTipoPrato
            };
        }

        //US005 - Listar todos os tipos de pratos
        public async Task<List<TipoDePrato2listing_dto>> GetTiposDePratos()
        {
            List<TipoDePrato> allTiposDePratos = await _repo.GetAllTiposDePratosFromDataBase();
            return allTiposDePratos.Select(x => TipoDePratoListItem(x)).ToList();

        }

        private TipoDePrato2listing_dto TipoDePratoListItem(TipoDePrato tipoDePrato)
        {
            return new TipoDePrato2listing_dto
            {
                IdTipoPrato = tipoDePrato.IdTipoPrato,
                Nome = tipoDePrato.Nome,
                DescricaoTipoPrato = tipoDePrato.DescricaoTipoPrato
            };
        }

        //US006 - Obter informação sobre um Tipo de Prato Específico
        public async Task<TipoDePrato2detail_dto?> GetTipoDePratoById(long Id)
        {
            var tipoDePrato = await _repo.GetTipoDePratoById(Id);
            return tipoDePrato == null ? null : TipoDePratoDetail(tipoDePrato);
        }

    }
}