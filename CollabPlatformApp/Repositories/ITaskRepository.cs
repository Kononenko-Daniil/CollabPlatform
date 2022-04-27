using CollabPlatformApp.Models;

namespace CollabPlatformApp.Repositories
{
    public interface ITaskRepository
    {
        public void CreateTask(string projectId, Project project);
        public void DeleteTask(string projectId, Project project);
    }
}
