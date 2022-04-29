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

            _userRepository.UpdateUserProjects(_contributor);
        }
    }
}
