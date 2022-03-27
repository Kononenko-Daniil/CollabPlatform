using CollabPlatformApp.Models;

namespace CollabPlatformApp.Services
{
    public interface IProjectService
    {
        public IEnumerable<Project> GetProjects();
        public Project GetProjectByKey(int key);
        public void PostProject(Project project);
    }
}
