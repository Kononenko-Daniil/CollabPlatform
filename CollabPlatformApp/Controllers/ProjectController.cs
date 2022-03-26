using CollabPlatformApp.Contexts;
using CollabPlatformApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/projects")]
    public class ProjectController : ControllerBase
    {
        ProjectContext db;
        public ProjectController(ProjectContext context) 
        {
            db = context;
        }
        [HttpGet]
        public IEnumerable<Project> GetProjects()
        {
            /*if (!db.Projects.Any())
            {
                db.Projects.Add(new Project { Name = "Chemistry", Author = "Daniil" });
                db.SaveChanges();
            }*/
            return db.Projects;
        }
    }
}
