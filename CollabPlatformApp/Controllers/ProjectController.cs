using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CollabPlatformApp.Validators;
using CollabPlatformApp.RequestErrors;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/projects")]
    public class ProjectController : BaseController
    {
        private readonly IProjectService _projectService;
        private readonly ProjectValidator _projectValidator;
        
        public ProjectController(IProjectService projectService, 
            ProjectValidator projectValidator) 
        {
            _projectService = projectService;
            _projectValidator = projectValidator;
        }

        [Authorize]
        [HttpGet("get-projects-current-user")]
        public IEnumerable<Project> GetCurrentUserProjects()
        {
            var userId = GetUserId();

            var result = _projectService.GetProjectsByUserId(userId);

            return result;
        }

        [Authorize]
        [HttpGet("get-projects-public")]
        public IEnumerable<PublicProject> GetProjectsPublic(string userName)
        {
            var result = _projectService.GetPublicProjects(userName);

            return result;
        }

        [Authorize]
        [HttpGet("get-project-by-id")]
        public ActionResult<Project> GetProjectById(string projectId)
        {
            var userId = GetUserId();

            var result = _projectService.GetProjectById(projectId, userId);
            if(result == null)
            {
                return BadRequest();
            }

            return result;
        }

        [Authorize]
        [HttpGet("get-public-project-by-id")]
        public ActionResult<PublicProject> GetPublicProjectById(string projectId)
        {
            var userId = GetUserId();
            var result = _projectService.GetPublicProjectById(projectId, userId);
            if(result == null)
            {
                return BadRequest();
            }

            return result;
        }

        [Authorize]
        [HttpPost("create-project")]
        public ActionResult<string> CreateProject([FromBody] ProjectDto project)
        {
            var projectValidationResult = _projectValidator.Validate(project);
            if (!projectValidationResult.IsValid)
            {
                BaseRequestError error = new BaseRequestError()
                {
                    ErrorType = projectValidationResult.Errors.First().PropertyName,
                    ErrorMessage = projectValidationResult.Errors.First().ErrorMessage
                };

                return BadRequest(error);
            }

            var userId = GetUserId();
            var result = _projectService.CreateProject(project, userId);

            return result;
        }

        [Authorize]
        [HttpDelete("delete-project")]
        public ActionResult DeleteProject(string projectId)
        {
            var userId = GetUserId();
            bool wasDeleted = _projectService.DeleteProject(projectId, userId);
            if (wasDeleted)
                return Ok();

            return BadRequest();
        }
    }
}
