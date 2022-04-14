using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;

namespace CollabPlatformApp.Services
{
    public interface IProjectService
    {
        public IEnumerable<Project> GetProjects();
        public Project GetProjectById(string projectId);

        public string CreateProject(ProjectDto project);

        public void DeleteProject(string projectId);
    }
}
