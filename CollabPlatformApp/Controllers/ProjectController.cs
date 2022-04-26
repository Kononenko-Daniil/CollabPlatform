using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/projects")]
    public class ProjectController : BaseController
    {
        private readonly IProjectService _projectService;
        
        public ProjectController(IProjectService projectService) 
        {
            _projectService = projectService;
        }

        [Authorize]
        [HttpGet("get-projects")]
        public IEnumerable<Project> GetProjects()
        {
            var userId = GetUserId();

            var result = _projectService.GetProjects(userId);

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
        [HttpPost("create-project")]
        public string CreateProject([FromBody] ProjectDto project)
        {
            var userId = GetUserId();

            var result = _projectService.CreateProject(project, userId);

            return result;
        }

        [Authorize]
        [HttpDelete("delete-project")]
        public void DeleteProject(string projectId)
        {
            var userId = GetUserId();

            _projectService.DeleteProject(projectId, userId);
        }
    }
}
