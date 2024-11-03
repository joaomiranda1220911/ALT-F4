using Microsoft.EntityFrameworkCore;
using Cozinha_BE.Model;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy", policy =>
    {
        policy.WithOrigins("https://localhost:5057")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add services to the container.

builder.Services.AddControllers();

// Adicionar o contexto da Cozinha
builder.Services.AddDbContext<CozinhaContext>(
    opt => opt.UseSqlite("Data Source=Database/CozinhaDB"));

//TestDataSeeder (necessário ou não?)
//builder.Services.AddTransient<TestDataSeeder>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("MyPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
