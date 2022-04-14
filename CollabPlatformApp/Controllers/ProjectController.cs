using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Services;
using Microsoft.AspNetCore.Mvc;

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
        
        [HttpGet("get-projects")]
        public IEnumerable<Project> GetProjects()
        {
            return _projectService.GetProjects();
        }

        [HttpGet("get-project-by-id")]
        public Project GetProjectById(string projectId)
        {
            return _projectService.GetProjectById(projectId);
        }

        [HttpPost("create-project")]
        public string CreateProject([FromBody] ProjectDto project)
        {
            var result = _projectService.CreateProject(project);

            return result;
        }

        [HttpDelete("delete-project")]
        public void DeleteProject(string projectId)
        {
            _projectService.DeleteProject(projectId);
        }
    }
}
