using CollabPlatformApp.Models;

namespace CollabPlatformApp.Repositories
{
    public interface IProjectRepository
    {
        public IEnumerable<Project> GetProjects();
        public void InsertProject(Project project);
        public void DeleteProject(string projectId);
    }
}
