using CollabPlatformApp.Models;

namespace CollabPlatformApp.Services
{
    public interface IProjectService
    {
        public IEnumerable<Project> GetProjects();
        public Project GetProjectById(string projectId);
        public IEnumerable<Models.Task> GetProjectTasks(string projectId);
        public IEnumerable<Link> GetProjectLinks(string projectId);

        public string CreateProject(Project project);
        public void CreateTask(string projectId, Models.Task task);
        public void CreateLink(string projectId, Link link);

        public void DeleteProject(string projectId);
        public void DeleteTask(string projectId, string taskId);
        public void DeleteLink(string projectId, string linkId);
    }
}
