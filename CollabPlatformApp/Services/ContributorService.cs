using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Repositories;

namespace CollabPlatformApp.Services
{
    public class ContributorService : IContributorService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IUserRepository _userRepository;

        public ContributorService(IProjectRepository projectRepository, 
            IUserRepository userRepository)
        {
            _projectRepository = projectRepository;
            _userRepository = userRepository;
        }

        public IEnumerable<Contributor> GetContributors(string projectId)
        {
            var project = _projectRepository.GetProjectById(projectId);
            return project.Contributors;
        }

        public void AddContributor(ContributorDto contributor)
        {
            var user = _userRepository.GetUserByName(contributor.Name);
            user.Projects.Add(contributor.ProjectId);
            var _project = _projectRepository.GetProjectById(contributor.ProjectId);
            Contributor _contributor = new Contributor()
            {
                Name = user.Name
            };
            _project.Contributors.Add(_contributor);

            _userRepository.UpdateUser(user);
            _projectRepository.UpdateProject(_project);
        }

        public void DeleteContributor(ContributorDto contributor)
        {
            var user = _userRepository.GetUserByName(contributor.Name);
            var project = _projectRepository.GetProjectById(contributor.ProjectId);
            var projectId = user.Projects.FirstOrDefault(x => x == contributor.ProjectId);
            user.Projects.Remove(projectId);
            var _contributor = project.Contributors.FirstOrDefault(x => x.Name == contributor.Name);
            project.Contributors.Remove(_contributor);

            _userRepository.UpdateUser(user);
            _projectRepository.UpdateProject(project);
        }

        public bool IsDeletingYourself(string userId, ContributorDto contributor)
        {
            var _contributor = _userRepository.GetUserByName(contributor.Name);
            if (_contributor.Id == userId)
                return true;
            return false;
        }

        public bool ContributorIsExisted(ContributorDto contributor)
        {
            var project = _projectRepository.GetProjectById(contributor.ProjectId);
            var _contributor = project.Contributors.FirstOrDefault(x => x.Name == contributor.Name);
            if(_contributor == null)
                return false;
            return true;
        }
    }
}
