using Microsoft.EntityFrameworkCore;
using TableService.Data;
using TableService.Middlewares;
using TableService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TableServiceDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddTransient<IRestaurantsService, RestaurantsService>();
builder.Services.AddTransient<INotificationsService, NotificationsService>();

builder.Services.AddScoped<GlobalExceptionHandlerMiddleware>();

// TODO: configure CORS properly when running in prod
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder => 
        builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

DatabaseInitializer.Initialize(app.Services);

app.Run();