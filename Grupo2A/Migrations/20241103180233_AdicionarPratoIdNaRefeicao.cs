using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Grupo2A.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarPratoIdNaRefeicao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Refeicoes_Pratos_PratoId",
                table: "Refeicoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Refeicoes_TiposDeRefeicao_TipoRefeicaoId1",
                table: "Refeicoes");

            migrationBuilder.DropIndex(
                name: "IX_Refeicoes_PratoId",
                table: "Refeicoes");

            migrationBuilder.DropColumn(
                name: "PratoId",
                table: "Refeicoes");

            migrationBuilder.RenameColumn(
                name: "TipoRefeicaoId1",
                table: "Refeicoes",
                newName: "PratoIdPrato");

            migrationBuilder.RenameIndex(
                name: "IX_Refeicoes_TipoRefeicaoId1",
                table: "Refeicoes",
                newName: "IX_Refeicoes_PratoIdPrato");

            migrationBuilder.AlterColumn<long>(
                name: "TipoRefeicaoId",
                table: "Refeicoes",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "INTEGER");

            migrationBuilder.CreateIndex(
                name: "IX_Refeicoes_TipoRefeicaoId",
                table: "Refeicoes",
                column: "TipoRefeicaoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Refeicoes_Pratos_PratoIdPrato",
                table: "Refeicoes",
                column: "PratoIdPrato",
                principalTable: "Pratos",
                principalColumn: "IdPrato",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Refeicoes_TiposDeRefeicao_TipoRefeicaoId",
                table: "Refeicoes",
                column: "TipoRefeicaoId",
                principalTable: "TiposDeRefeicao",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Refeicoes_Pratos_PratoIdPrato",
                table: "Refeicoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Refeicoes_TiposDeRefeicao_TipoRefeicaoId",
                table: "Refeicoes");

            migrationBuilder.DropIndex(
                name: "IX_Refeicoes_TipoRefeicaoId",
                table: "Refeicoes");

            migrationBuilder.RenameColumn(
                name: "PratoIdPrato",
                table: "Refeicoes",
                newName: "TipoRefeicaoId1");

            migrationBuilder.RenameIndex(
                name: "IX_Refeicoes_PratoIdPrato",
                table: "Refeicoes",
                newName: "IX_Refeicoes_TipoRefeicaoId1");

            migrationBuilder.AlterColumn<long>(
                name: "TipoRefeicaoId",
                table: "Refeicoes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "PratoId",
                table: "Refeicoes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Refeicoes_PratoId",
                table: "Refeicoes",
                column: "PratoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Refeicoes_Pratos_PratoId",
                table: "Refeicoes",
                column: "PratoId",
                principalTable: "Pratos",
                principalColumn: "IdPrato",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Refeicoes_TiposDeRefeicao_TipoRefeicaoId1",
                table: "Refeicoes",
                column: "TipoRefeicaoId1",
                principalTable: "TiposDeRefeicao",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
