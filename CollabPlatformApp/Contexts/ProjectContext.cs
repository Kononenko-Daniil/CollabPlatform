using CollabPlatformApp.Models;
using Microsoft.EntityFrameworkCore;

namespace CollabPlatformApp.Contexts
{
    public class ProjectContext : DbContext
    {
        public DbSet<Project>? Projects { get; set; }
        public ProjectContext(DbContextOptions<ProjectContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
