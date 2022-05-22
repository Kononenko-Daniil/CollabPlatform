using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;

namespace CollabPlatformApp.Services
{
    public interface IProjectService
    {
        public IEnumerable<Project> GetProjectsByUserId(string userId);
        public IEnumerable<Project> GetProjectsByUserName(string userName);
        public IEnumerable<PublicProject> GetPublicProjects(string userName);
        public Project GetProjectById(string projectId, string userId);
        public PublicProject GetPublicProjectById(string projectId, string userId);

        public string CreateProject(ProjectDto project, string userId);

        public void DeleteProject(string projectId);
    }
}
