using CollabPlatformApp.Contexts;
using CollabPlatformApp.Database;
using CollabPlatformApp.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var AllowOrigins = "_allowOrigins";

builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen();
string connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ProjectContext>(options => options.UseSqlServer(connection));
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.Configure<ProjectsDatabaseSettings>(
    builder.Configuration.GetSection("ProjectsDatabase"));

builder.Services.AddCors(p => p.AddPolicy(AllowOrigins, builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
var app = builder.Build();


if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseCors(AllowOrigins);
app.UseStaticFiles();
app.UseRouting();
app.UseSwagger();
app.UseSwaggerUI();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
