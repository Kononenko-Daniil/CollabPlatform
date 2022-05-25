using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Repositories;
using MongoDB.Driver;

namespace CollabPlatformApp.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IUserRepository _userRepository;

        public ProjectService(IProjectRepository projectRepository, 
            IUserRepository userRepository)
        {
            _projectRepository = projectRepository;
            _userRepository = userRepository;
        }

        public IEnumerable<Project> GetProjectsByUserId(string userId)
        {
            var user = _userRepository.GetUserById(userId);
            var result = GetProjectsFromUser(user);

            return result;
        }

        public IEnumerable<Project> GetProjectsByUserName(string userName)
        {
            var user = _userRepository.GetUserByName(userName);
            var result = GetProjectsFromUser(user);

            return result;
        }

        public IEnumerable<PublicProject> GetPublicProjects(string userName)
        {
            var projects = GetProjectsByUserName(userName);
            var result = new List<PublicProject>();
            foreach (var project in projects)
            {
                var publicProject = ConvertProjectToPublicProject(project);

                result.Add(publicProject);
            }

            return result;
        }

        public Project GetProjectById(string projectId, string userId)
        {
            var projects = GetProjectsByUserId(userId);
            Project result = projects.FirstOrDefault(x => x.Id == projectId);

            return result;
        }

        public PublicProject GetPublicProjectById(string projectId, string userId)
        {
            var project = GetProjectById(projectId, userId);
            if(project == null)
            {
                return null;
            }

            var result = ConvertProjectToPublicProject(project);

            return result;
        }

        public string CreateProject(ProjectDto project, string userId)
        {
            var user = _userRepository.GetUserById(userId);
            string projectId = GenerateKey();
            user.Projects.Add(projectId);
            _userRepository.UpdateUser(user);

            Project result = new Project()
            {
                Id = projectId,
                Name = project.Name,
                Author = user.Name,
                Tasks = new List<Models.Task>(),
                Links = new List<Link>(),
                Contributors = new List<Contributor>()
            };
            Contributor contributor = new Contributor()
            {
                Name = user.Name
            };
            result.Contributors.Add(contributor);
            _projectRepository.InsertProject(result);

            return projectId;
        }

        public bool DeleteProject(string projectId, string userId)
        {
            var currentUserName = _userRepository.GetUserById(userId).Name;
            var project = _projectRepository.GetProjectById(projectId);
            if(project.Author == currentUserName)
            {
                foreach (var contributor in project.Contributors)
                {
                    var user = _userRepository.GetUserByName(contributor.Name);
                    var _project = user.Projects.FirstOrDefault(x => x == projectId);
                    user.Projects.Remove(_project);
                    _userRepository.UpdateUser(user);
                }

                _projectRepository.DeleteProject(projectId);

                return true;
            } else {
                return false;
            }
            
        }

        public IEnumerable<Project> GetProjectsFromUser(User user)
        {
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

        public PublicProject ConvertProjectToPublicProject(Project project)
        {
            PublicProject result = new PublicProject()
            {
                Id = project.Id,
                Name = project.Name,
                Author = project.Author,
                TaskNum = project.Tasks.Count(),
                LinkNum = project.Links.Count(),
                ContributorNum = project.Contributors.Count()
            };

            return result;
        }

        public string GenerateKey()
        {
            string result = Guid.NewGuid().ToString("N");

            return result;
        }
    }
}
