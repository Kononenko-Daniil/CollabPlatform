using CollabPlatformApp.Database;
using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Repositories;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CollabPlatformApp.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public IEnumerable<Models.Task> GetProjectTasks(string projectId)
        {
            Project project = _taskRepository.GetProjectById(projectId);
            List<Models.Task> tasks = project.Tasks;

            return tasks;
        }

        public void CreateTask(TaskDto task)
        {
            string taskId = GenerateKey();
            string projectId = task.ProjectId;
            Models.Task result = new Models.Task()
            {
                Id = taskId,
                ProjectId = projectId,
                Text = task.Text,
            };

            Project project = _taskRepository.GetProjectById(projectId);
            project.Tasks.Add(result);
            _taskRepository.CreateTask(projectId, project);
        }

        public void DeleteTask(string projectId, string taskId)
        {
            Project project = _taskRepository.GetProjectById(projectId);
            Models.Task taskToRemove = project.Tasks.FirstOrDefault(x => x.Id == taskId);
            project.Tasks.Remove(taskToRemove);

            _taskRepository.DeleteTask(projectId, project);
        }

        public string GenerateKey()
        {
            string result = Guid.NewGuid().ToString("N");

            return result;
        }
    }
}
