using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Repositories;
using MongoDB.Driver;

namespace CollabPlatformApp.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public IEnumerable<Project> GetProjects(string userId)
        {
            var user = _projectRepository.GetUser(userId);
            var projects = _projectRepository.GetProjects();
            var projectIds = user.Projects;
            List<Project> result = new List<Project>();

            foreach (var projectId in projectIds)
            {
                var project = projects.FirstOrDefault(x => x.Id == projectId);
                result.Add(project);
            }

            return result;
        }

        public Project GetProjectById(string projectId, string userId)
        {
            var projects = GetProjects(userId);
            Project result = projects.FirstOrDefault(x => x.Id == projectId);

            return result;
        }

        public string CreateProject(ProjectDto project, string userId)
        {
            var user = _projectRepository.GetUser(userId);
            string projectId = GenerateKey();
            user.Projects.Add(projectId);
            _projectRepository.UpdateUserProjects(userId, user);

            Project result = new Project()
            {
                Id = projectId,
                Name = project.Name,
                Author = "admin",
                Tasks = new List<Models.Task>(),
                Links = new List<Link>()
            };

            _projectRepository.InsertProject(result);

            return projectId;
        }

        public void DeleteProject(string projectId, string userId)
        {
            _projectRepository.DeleteProject(projectId);

            var user = _projectRepository.GetUser(userId);
            var project = user.Projects.FirstOrDefault(x => x == projectId);
            user.Projects.Remove(project);

            _projectRepository.UpdateUserProjects(userId, user);
        }

        public string GenerateKey()
        {
            string result = Guid.NewGuid().ToString("N");

            return result;
        }
    }
}
