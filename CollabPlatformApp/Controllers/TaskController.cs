using CollabPlatformApp.Dtos;
using CollabPlatformApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/tasks")]
    public class TaskController : ControllerBase
    {
        ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet("get-project-tasks")]
        public IEnumerable<Models.Task> GetProjectTasks(string projectId)
        {
            var result = _taskService.GetProjectTasks(projectId);

            return result;
        }

        [HttpPost("create-task")]
        public void CreateTask(TaskDto task)
        {
            _taskService.CreateTask(task);
        }

        [HttpDelete("delete-task")]
        public void DeleteTask(string projectId, string taskId)
        {
            _taskService.DeleteTask(projectId, taskId);
        }
    }
}
