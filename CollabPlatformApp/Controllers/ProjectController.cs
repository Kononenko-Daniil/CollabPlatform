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
        
        [HttpGet]
        public IEnumerable<Project> GetProjects()
        {
            return _projectService.GetProjects();
        }
        [HttpPost]
        public void AddProject(Project project)
        {
            _projectService.PostProject(project);
        } 
    }
}
