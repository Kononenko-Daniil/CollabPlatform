using CollabPlatformApp.Models;

namespace CollabPlatformApp.Services
{
    public interface IProjectService
    {
        public IEnumerable<Project> GetProjects();
        public IEnumerable<Models.Task> GetProjectTasks(string projectId);
        public void CreateProject(Project project);
        public void CreateTask(string projectId, Models.Task task);
        public void DeleteProject(string projectId);
        public void DeleteTask(string projectId, string taskId);
    }
}
