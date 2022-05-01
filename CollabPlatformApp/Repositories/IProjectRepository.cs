using CollabPlatformApp.Models;

namespace CollabPlatformApp.Repositories
{
    public interface IProjectRepository
    {
        public IEnumerable<Project> GetProjects();
        public Project GetProjectById(string projectId);
        public void InsertProject(Project project);
        public void UpdateProject(Project project);
        public void DeleteProject(string projectId);
    }
}
