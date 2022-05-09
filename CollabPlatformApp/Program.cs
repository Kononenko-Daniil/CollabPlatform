using CollabPlatformApp.Contexts;
using CollabPlatformApp.Database;
using CollabPlatformApp.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using CollabPlatformApp.Validators;
using CollabPlatformApp.Repositories;
using CollabPlatformApp.Hubs;

var builder = WebApplication.CreateBuilder(args);

var AllowOrigins = "_allowOrigins";
string connection = builder.Configuration.GetConnectionString("DefaultConnection");
string loginPath = "/users/sign-in";

builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSignalR();

//Services
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<ILinkService, LinkService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IContributorService, ContributorService>();

//Databases
builder.Services.AddDbContext<ProjectContext>(options => options.UseSqlServer(connection));
builder.Services.Configure<CollabPlatformDatabaseSettings>(
    builder.Configuration.GetSection("CollabPlatformDatabase"));

//Repositories
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

//Validators
builder.Services.AddScoped<UserValidator>();
builder.Services.AddScoped<ProjectValidator>();
builder.Services.AddScoped<TaskValidator>();
builder.Services.AddScoped<LinkValidator>();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = new Microsoft.AspNetCore.Http.PathString(loginPath);
    });

builder.Services.AddCors(p => p.AddPolicy(AllowOrigins, builder =>
{
    builder.WithOrigins("https://localhost:44413")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials();
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
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints => { 
    endpoints.MapControllers();
    endpoints.MapHub<ChatHub>("/hubs/chat");
});
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
