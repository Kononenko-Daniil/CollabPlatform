using CollabPlatformApp.Contexts;
using CollabPlatformApp.Models;

namespace CollabPlatformApp.Services
{
    public class ProjectService : IProjectService
    {
        ProjectContext db;
        public ProjectService(ProjectContext context)
        {
            db = context;
        }
        public IEnumerable<Project> GetProjects()
        {
            var result = db.Projects.ToList();

            return result;
        }

        public void PostProject(Project project)
        {
            db.Add(project);
            db.SaveChanges();
        }
    }
}
