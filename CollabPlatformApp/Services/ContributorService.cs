using CollabPlatformApp.Dtos;
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

        public void AddContributor(ContributorDto contributor)
        {
            var _contributor = _userRepository.GetUserByEmail(contributor.Email);
            _contributor.Projects.Add(contributor.ProjectId);
            var _project = _projectRepository.GetProjectById(contributor.ProjectId);
            _project.Contributors.Add(contributor.Email);

            _userRepository.UpdateUserProjects(_contributor);
            _projectRepository.UpdateProject(_project);
        }

        public bool ContributorIsExisted(ContributorDto contributor)
        {
            var project = _projectRepository.GetProjectById(contributor.ProjectId);
            var _contributor = project.Contributors.FirstOrDefault(x => x == contributor.Email);
            if(_contributor == null)
                return false;
            return true;
        }
    }
}
