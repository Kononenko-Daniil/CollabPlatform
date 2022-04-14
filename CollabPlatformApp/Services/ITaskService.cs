using CollabPlatformApp.Dtos;

namespace CollabPlatformApp.Services
{
    public interface ITaskService
    {
        public IEnumerable<Models.Task> GetProjectTasks(string projectId);

        public void CreateTask(TaskDto task);

        public void DeleteTask(string projectId, string taskId);
    }
}
