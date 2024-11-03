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
                TipoRefeicao = tipoRefeicao, // Atribuindo o tipo de refeição
                Prato = prato // Atribuindo o prato à refeição
            };

            // Adiciona a nova refeição ao repositório
            await _repo.AddRefeicao(novaRefeicao);

            return (novaRefeicao, null);
        }


        private Refeicao2detail_dto RefeicaoDetail(Refeicao r)
        {
            return new Refeicao2detail_dto
            {
                IdRefeicao = r.IdRefeicao,
                Data = r.Data,
                Prato = r.Prato, 
                tipoDeRefeicao =r.TipoRefeicao,
                QuantidadeProduzida = r.QuantidadeProduzida
            };
        }


        //US014: Servir Refeição (decrementar quantidade)
        public async Task<Prato?> ServirRefeicao(long idPrato)
        {

            //Procura o prato na base de dados
            var prato = await _context.Pratos.FindAsync(idPrato);
            //Verifica se o prato possui quantidade suficiente para ser servido
            if (prato == null || prato.Quantidade <= 0) //Se o prato não existir ou a quantidade for 0 ou <0, retorna null
            {
                return null; //Retorna null se o prato não for encontrado ou se a quantidade for insuficiente
            }

            prato.Quantidade--; //Incrementa a quantidade disponível do prato
            await _context.SaveChangesAsync(); //Guarda as mudanças
            return prato; //Retorna o prato atualizado com a nova quantidade
        }


        //US015: Remover uma refeição futura
        public async Task<bool> DeleteRefeicao(long IdRefeicao)
        {
            //Procura o prato na base de dados
            var prato = await _context.Pratos.FindAsync(IdRefeicao);

            //Verifica se o prato existe e se a data de serviço é futura
            if (prato == null || prato.DataServico <= DateTime.Now)
            {
                return false; //Caso o prato não seja encontrado ou a data já tenha passado
            }

            //Remove prato da BD e guarda as mudanças
            _context.Pratos.Remove(prato);
            await _context.SaveChangesAsync();
            //Retorna true indicando que o prato foi removido com sucesso
            return true;
        }


        //US016: Apresentar ementa disponível com base na data, tipo e quantidade
        public async Task<List<Prato2listing_dto>> GetEmentaDisponivel(string tipoRefeicao, DateTime data)
        {
            var pratosDisponiveis = await _context.Pratos
            // Filtra os pratos de acordo com o tipo de refeição, data e quantidade disponível
           .Where(p => p.TipoRefeicao != null &&
                       p.TipoRefeicao.ToString() == tipoRefeicao &&
                       p.DataServico.Date == data.Date &&
                       p.Quantidade > 0)
           .Select(p => new Prato2listing_dto
           {
               IdPrato = (int)p.IdPrato,
               Nome = p.Nome,
               TipoPrato = p.TipoPrato!,
               Ativo = p.Ativo
           })
            // Executa a consulta assíncrona e converte o resultado numa lista
            .ToListAsync();
            // Retorna a lista de pratos disponíveis que satisfazem os critérios
            return pratosDisponiveis;
        }
    }
}
