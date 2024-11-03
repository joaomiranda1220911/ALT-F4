using Microsoft.EntityFrameworkCore;

namespace Cozinha_BE.Model
{
    public class CozinhaContext : DbContext
    {
        public CozinhaContext(DbContextOptions<CozinhaContext> options) : base(options) { }

        // Define as tabelas na base de dados
        public DbSet<Ingrediente> Ingredientes { get; set; }
        public DbSet<Prato> Pratos { get; set; }
        public DbSet<Refeicao> Refeicoes { get; set; }
        public DbSet<TipoDePrato> TiposDePrato { get; set; }
        public DbSet<TipoDeRefeicao> TiposDeRefeicao { get; set; }
    }
}
