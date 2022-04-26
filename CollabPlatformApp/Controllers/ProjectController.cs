using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/projects")]
    public class ProjectController : ControllerBase
    {
        IProjectService _projectService;
        
        public ProjectController(IProjectService projectService) 
        {
            _projectService = projectService;
        }

        [Authorize]
        [HttpGet("get-projects")]
        public IEnumerable<Project> GetProjects()
        {
            var userId = User.Identity.Name;
            return _projectService.GetProjects(userId);
        }

        [Authorize]
        [HttpGet("get-project-by-id")]
        public ActionResult<Project> GetProjectById(string projectId)
        {
            string userId = User.Identity.Name;
            var project = _projectService.GetProjectById(projectId, userId);
            if(project == null)
            {
                return BadRequest();
            }
            return project;
        }

        [Authorize]
        [HttpPost("create-project")]
        public string CreateProject([FromBody] ProjectDto project)
        {
            string userId = User.Identity.Name;
            var result = _projectService.CreateProject(project, userId);

            return result;
        }

        [Authorize]
        [HttpDelete("delete-project")]
        public void DeleteProject(string projectId)
        {
            string userId = User.Identity.Name;
            _projectService.DeleteProject(projectId, userId);
        }
    }
}
