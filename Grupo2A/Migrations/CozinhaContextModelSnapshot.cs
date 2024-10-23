﻿// <auto-generated />
using System;
using Cozinha_BE.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Grupo2A.Migrations
{
    [DbContext(typeof(CozinhaContext))]
    partial class CozinhaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.10");

            modelBuilder.Entity("Cozinha_BE.Model.Ingrediente", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Ativo")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Categoria")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<int?>("PratoId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ReceitaId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("PratoId");

                    b.HasIndex("ReceitaId");

                    b.ToTable("Ingredientes");
                });

            modelBuilder.Entity("Cozinha_BE.Model.Prato", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Ativo")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<int>("ReceitaId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TipoPratoId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ReceitaId");

                    b.HasIndex("TipoPratoId");

                    b.ToTable("Pratos");
                });

            modelBuilder.Entity("Cozinha_BE.Model.Receita", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<string>("Passos")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Receita");
                });

            modelBuilder.Entity("Cozinha_BE.Model.TipoDePrato", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("TiposDePrato");
                });

            modelBuilder.Entity("Cozinha_BE.Model.TipoDeRefeicao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("TiposDeRefeicao");
                });

            modelBuilder.Entity("Cozinha_BE.Model.Ingrediente", b =>
                {
                    b.HasOne("Cozinha_BE.Model.Prato", null)
                        .WithMany("Ingredientes")
                        .HasForeignKey("PratoId");

                    b.HasOne("Cozinha_BE.Model.Receita", null)
                        .WithMany("Ingredientes")
                        .HasForeignKey("ReceitaId");
                });

            modelBuilder.Entity("Cozinha_BE.Model.Prato", b =>
                {
                    b.HasOne("Cozinha_BE.Model.Receita", "Receita")
                        .WithMany()
                        .HasForeignKey("ReceitaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Cozinha_BE.Model.TipoDePrato", "TipoPrato")
                        .WithMany()
                        .HasForeignKey("TipoPratoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Receita");

                    b.Navigation("TipoPrato");
                });

            modelBuilder.Entity("Cozinha_BE.Model.Prato", b =>
                {
                    b.Navigation("Ingredientes");
                });

            modelBuilder.Entity("Cozinha_BE.Model.Receita", b =>
                {
                    b.Navigation("Ingredientes");
                });
#pragma warning restore 612, 618
        }
    }
}
