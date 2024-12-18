using Cozinha_BE.Model;
using Cozinha_BE.Model.DTO;
using Cozinha_BE.Model.Repositories;
using Grupo2A.Repositories;
using Microsoft.EntityFrameworkCore;


namespace Grupo2A.Services
{
    public class RefeicoesService
    {
        private CozinhaContext _context;
        private RefeicoesRepository _repo;
        private PratosRepository _repoPrato;
        private TipoDeRefeicaoRepository _repoTipodeRefeicao;
        private EmentasRepository _repoEmenta;
        private readonly PratosService _pratoService;

        public RefeicoesService(CozinhaContext context)
        {
            _context = context;
            _pratoService = new PratosService(_context);
            _repo = new RefeicoesRepository(_context);
            _repoPrato = new PratosRepository(_context);
            _repoTipodeRefeicao = new TipoDeRefeicaoRepository(_context);
            _repoEmenta = new EmentasRepository(_context);
        }


        // US013: Criar uma refeição especificando prato, data, tipo e quantidade
        public async Task<(Refeicao? refeicao, string? mensagem)> CreateNewRefeicao(Refeicao2create_dto info)
        {
            if (info == null)
            {
                throw new ArgumentNullException(nameof(info));
            }

            // Verifica se o prato está ativo
            var pratoAtivo = await _pratoService.IsPratoAtivo(info.IdPrato);
            if (!pratoAtivo)
            {
                return (null, "O prato especificado não está ativo.");
            }

            // Carrega o prato correspondente
            var prato = await _repoPrato.GetPratoById(info.IdPrato);
            if (prato == null)
            {
                return (null, "Prato não encontrado.");
            }

            // Valida TipoRefeicao
            var tipoRefeicao = await _repoTipodeRefeicao.GetTipoRefeicaoById(info.TipoRefeicaoId);
            if (tipoRefeicao == null)
            {
                return (null, "Tipo de refeição não encontrado.");
            }

            // Cria uma nova refeição
            Refeicao novaRefeicao = new Refeicao
            {
                QuantidadeProduzida = info.QuantidadeProduzida,
                Data = info.Data, // A data da refeição deve ser recebida do dto
                TipoRefeicao = tipoRefeicao, // Atribuí o tipo de refeição
                Prato = prato // Atribuí o prato à refeição
            };

            // Adiciona a nova refeição ao repositório
            await _repo.AddRefeicao(novaRefeicao);

            // Verifica se o ID foi atribuído
            Console.WriteLine("ID da refeição após salvar: " + novaRefeicao.IdRefeicao);

            return (novaRefeicao, null);
        }


        private Refeicao2detail_dto RefeicaoDetail(Refeicao r)
        {
            return new Refeicao2detail_dto
            {
                IdRefeicao = r.IdRefeicao,
                Data = r.Data,
                Prato = r.Prato,
                tipoDeRefeicao = r.TipoRefeicao,
                QuantidadeProduzida = r.QuantidadeProduzida
            };
        }


        //US014: Servir Refeição (decrementar quantidade)
        public async Task<Refeicao?> ServirRefeicao(long idRefeicao)
        {

            //Procura a refeiçao na base de dados
            var refeicao = await _context.Refeicoes.FindAsync(idRefeicao);
            //Verifica se a refeição possui quantidade suficiente para ser servida
            if (refeicao == null || refeicao.QuantidadeProduzida <= 0) //Se a refeição não existir ou a quantidade for 0 ou <0, retorna null
            {
                return null; //Retorna null se a refeição não for encontrada ou se a quantidade for insuficiente
            }

            refeicao.QuantidadeProduzida--; //Incrementa a quantidade disponível da refeição
            await _context.SaveChangesAsync(); //Guarda as mudanças
            return refeicao; //Retorna a refeição atualizada com a nova quantidade
        }


        //US015: Remover uma refeição futura
        public async Task<bool> DeleteRefeicao(long idRefeicao)
        {
            // Encontra a refeição a ser deletada
            var refeicao = await _context.Refeicoes.FindAsync(idRefeicao);

            // Verifica se a refeição existe
            if (refeicao == null)
            {
                return false;
            }

            // Remove apenas a refeição, sem tocar nas entidades relacionadas
            _context.Refeicoes.Remove(refeicao);

            // Salva as alterações no banco de dados
            await _context.SaveChangesAsync();
            return true;
        }

        //US016: Apresentar ementa disponível com base na data, tipo e quantidade
        public async Task<IEnumerable<Refeicao>> GetRefeicaoByDataETipo(DateTime data, TipoDeRefeicao tipoRefeicao)
        {
            return await _context.Refeicoes
                .Where(r => r.Data == data && r.TipoRefeicao == tipoRefeicao)
                .ToListAsync();
        }

        public async Task<List<Refeicao>> GetAllRefeicoes()
        {
            return await _repo.GetAllRefeicoes();
        }

        public async Task<List<Refeicao>> ObterRefeicoesFuturasAsync()
        {
            DateTime dataAtual = DateTime.UtcNow; // Data e hora atual em UTC

            // Buscar as refeições com data maior que a data atual
            return await _context.Refeicoes
                                 .Where(r => r.Data > dataAtual)
                                 .ToListAsync();
        }

    }
}
