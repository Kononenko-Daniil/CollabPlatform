using CollabPlatformApp.Contexts;
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
        [HttpGet("/get-projects")]
        public IEnumerable<Project> GetProjects()
        {
            var result = _projectService.GetProjects();

            return result;
        }
        [HttpGet("/get-project-by-key")]
        public Project GetProjectByKey(int key)
        {
            var result = _projectService.GetProjectByKey(key);

            return result;
        }

        [HttpPost("/add-project")]
        public void AddProject(Project project)
        {
            _projectService.PostProject(project);
        }
    }
}
