using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;

namespace CollabPlatformApp.Services
{
    public interface IProjectService
    {
        public IEnumerable<Project> GetProjects(string userId);
        public IEnumerable<PublicProject> GetPublicProjects(string userId);
        public Project GetProjectById(string projectId, string userId);

        public string CreateProject(ProjectDto project, string userId);

        public void DeleteProject(string projectId);
    }
}
