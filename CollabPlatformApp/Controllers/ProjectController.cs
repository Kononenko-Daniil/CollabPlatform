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
            return _projectService.GetProjects();
        }
        [HttpGet("/get-project-tasks")]
        public IEnumerable<Models.Task> GetProjectTasks(string projectId)
        {
            var result = _projectService.GetProjectTasks(projectId);

            return result;
        }
        [HttpGet("/get-project-links")]
        public IEnumerable<Link> GetProjectLinks(string projectId)
        {
            var result = _projectService.GetProjectLinks(projectId);

            return result;
        }

        [HttpPost("/create-project")]
        public void CreateProject(Project project)
        {
            project.Tasks.Clear();
            project.Links.Clear();
            _projectService.CreateProject(project);
        } 
        [HttpPost("/create-task")]
        public void CreateTask(string projectId, Models.Task task)
        {
            _projectService.CreateTask(projectId, task);
        }
        [HttpPost("/create-link")]
        public void CreateLink(string projectId, Link link)
        {
            _projectService.CreateLink(projectId, link);
        }

        [HttpDelete("/delete-project")]
        public void DeleteProject(string projectId)
        {
            _projectService.DeleteProject(projectId);
        }
        [HttpDelete("/delete-task")]
        public void DeleteTask(string projectId, string taskId)
        {
            _projectService.DeleteTask(projectId, taskId);
        }
        [HttpDelete("/delete-link")]
        public void DeleteLink(string projectId, string linkId)
        {
            _projectService.DeleteLink(projectId, linkId);
        }
    }
}
