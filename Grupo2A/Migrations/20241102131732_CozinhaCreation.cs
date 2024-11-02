using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Grupo2A.Migrations
{
    /// <inheritdoc />
    public partial class CozinhaCreation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Receita",
                columns: table => new
                {
                    IdReceita = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Descricao = table.Column<string>(type: "TEXT", nullable: true),
                    Passos = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Receita", x => x.IdReceita);
                });

            migrationBuilder.CreateTable(
                name: "TiposDePrato",
                columns: table => new
                {
                    IdTipoPrato = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposDePrato", x => x.IdTipoPrato);
                });

            migrationBuilder.CreateTable(
                name: "TiposDeRefeicao",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposDeRefeicao", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pratos",
                columns: table => new
                {
                    IdPrato = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    TipoPratoIdTipoPrato = table.Column<int>(type: "INTEGER", nullable: false),
                    ReceitaIdReceita = table.Column<int>(type: "INTEGER", nullable: true),
                    Ativo = table.Column<bool>(type: "INTEGER", nullable: false),
                    Quantidade = table.Column<int>(type: "INTEGER", nullable: false),
                    DataServico = table.Column<DateTime>(type: "TEXT", nullable: false),
                    TipoRefeicaoId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pratos", x => x.IdPrato);
                    table.ForeignKey(
                        name: "FK_Pratos_Receita_ReceitaIdReceita",
                        column: x => x.ReceitaIdReceita,
                        principalTable: "Receita",
                        principalColumn: "IdReceita");
                    table.ForeignKey(
                        name: "FK_Pratos_TiposDePrato_TipoPratoIdTipoPrato",
                        column: x => x.TipoPratoIdTipoPrato,
                        principalTable: "TiposDePrato",
                        principalColumn: "IdTipoPrato",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Pratos_TiposDeRefeicao_TipoRefeicaoId",
                        column: x => x.TipoRefeicaoId,
                        principalTable: "TiposDeRefeicao",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Ingredientes",
                columns: table => new
                {
                    IdIngrediente = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Categoria = table.Column<string>(type: "TEXT", nullable: false),
                    Ativo = table.Column<bool>(type: "INTEGER", nullable: false),
                    PratoIdPrato = table.Column<long>(type: "INTEGER", nullable: true),
                    ReceitaIdReceita = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredientes", x => x.IdIngrediente);
                    table.ForeignKey(
                        name: "FK_Ingredientes_Pratos_PratoIdPrato",
                        column: x => x.PratoIdPrato,
                        principalTable: "Pratos",
                        principalColumn: "IdPrato");
                    table.ForeignKey(
                        name: "FK_Ingredientes_Receita_ReceitaIdReceita",
                        column: x => x.ReceitaIdReceita,
                        principalTable: "Receita",
                        principalColumn: "IdReceita");
                });

            migrationBuilder.CreateTable(
                name: "Refeicoes",
                columns: table => new
                {
                    IdRefeicao = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PratoId = table.Column<long>(type: "INTEGER", nullable: false),
                    Data = table.Column<DateTime>(type: "TEXT", nullable: false),
                    TipoRefeicaoId = table.Column<long>(type: "INTEGER", nullable: false),
                    QuantidadeProduzida = table.Column<int>(type: "INTEGER", nullable: false),
                    TipoRefeicaoId1 = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Refeicoes", x => x.IdRefeicao);
                    table.ForeignKey(
                        name: "FK_Refeicoes_Pratos_PratoId",
                        column: x => x.PratoId,
                        principalTable: "Pratos",
                        principalColumn: "IdPrato",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Refeicoes_TiposDeRefeicao_TipoRefeicaoId1",
                        column: x => x.TipoRefeicaoId1,
                        principalTable: "TiposDeRefeicao",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ingredientes_PratoIdPrato",
                table: "Ingredientes",
                column: "PratoIdPrato");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredientes_ReceitaIdReceita",
                table: "Ingredientes",
                column: "ReceitaIdReceita");

            migrationBuilder.CreateIndex(
                name: "IX_Pratos_ReceitaIdReceita",
                table: "Pratos",
                column: "ReceitaIdReceita");

            migrationBuilder.CreateIndex(
                name: "IX_Pratos_TipoPratoIdTipoPrato",
                table: "Pratos",
                column: "TipoPratoIdTipoPrato");

            migrationBuilder.CreateIndex(
                name: "IX_Pratos_TipoRefeicaoId",
                table: "Pratos",
                column: "TipoRefeicaoId");

            migrationBuilder.CreateIndex(
                name: "IX_Refeicoes_PratoId",
                table: "Refeicoes",
                column: "PratoId");

            migrationBuilder.CreateIndex(
                name: "IX_Refeicoes_TipoRefeicaoId1",
                table: "Refeicoes",
                column: "TipoRefeicaoId1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ingredientes");

            migrationBuilder.DropTable(
                name: "Refeicoes");

            migrationBuilder.DropTable(
                name: "Pratos");

            migrationBuilder.DropTable(
                name: "Receita");

            migrationBuilder.DropTable(
                name: "TiposDePrato");

            migrationBuilder.DropTable(
                name: "TiposDeRefeicao");
        }
    }
}
