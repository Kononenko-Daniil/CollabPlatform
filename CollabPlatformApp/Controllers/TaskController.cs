using CollabPlatformApp.Dtos;
using CollabPlatformApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CollabPlatformApp.Validators;
using CollabPlatformApp.RequestErrors;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/tasks")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly TaskValidator _taskValidator;

        public TaskController(ITaskService taskService, 
            TaskValidator taskValidator)
        {
            _taskService = taskService;
            _taskValidator = taskValidator;
        }

        [Authorize]
        [HttpGet("get-project-tasks")]
        public IEnumerable<Models.Task> GetProjectTasks(string projectId)
        {
            var result = _taskService.GetProjectTasks(projectId);

            return result;
        }

        [Authorize]
        [HttpPost("create-task")]
        public ActionResult<BaseRequestError> CreateTask(TaskDto task)
        {
            var taskValidationResult = _taskValidator.Validate(task);
            if (!taskValidationResult.IsValid)
            {
                BaseRequestError error = new BaseRequestError()
                {
                    ErrorType = taskValidationResult.Errors.First().PropertyName,
                    ErrorMessage = taskValidationResult.Errors.First().ErrorMessage
                };

                return BadRequest(error);
            }

            _taskService.CreateTask(task);

            return Ok();
        }

        [Authorize]
        [HttpDelete("delete-task")]
        public void DeleteTask(string projectId, string taskId)
        {
            _taskService.DeleteTask(projectId, taskId);
        }
    }
}
