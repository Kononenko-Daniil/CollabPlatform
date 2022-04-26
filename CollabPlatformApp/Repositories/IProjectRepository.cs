using CollabPlatformApp.Models;

namespace CollabPlatformApp.Repositories
{
    public interface IProjectRepository
    {
        public IEnumerable<User> GetUsers();
        public User GetUser(string userId);
        public void UpdateUserProjects(string userId, User user);

        public IEnumerable<Project> GetProjects();
        public void InsertProject(Project project);
        public void DeleteProject(string projectId);
    }
}
