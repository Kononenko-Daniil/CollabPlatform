using CollabPlatformApp.Dtos;
using CollabPlatformApp.Repositories;

namespace CollabPlatformApp.Services
{
    public class ProjectUserService : IProjectUserService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IUserRepository _userRepository;

        public ProjectUserService(IProjectRepository projectRepository, 
            IUserRepository userRepository)
        {
            _projectRepository = projectRepository;
            _userRepository = userRepository;
        }

        public void AddUser(ProjectUserDto user)
        {
            var _user = _userRepository.GetUserByEmail(user.Email);
            _user.Projects.Add(user.ProjectId);

            _userRepository.UpdateUserProjects(_user);
        }
    }
}
