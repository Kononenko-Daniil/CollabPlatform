using CollabPlatformApp.Models;

namespace CollabPlatformApp.Repositories
{
    public interface IUserRepository
    {
        public IEnumerable<User> GetUsers();
        public User GetUserById(string userId);
        public User GetUserByEmail(string email);
        public void CreateUser(User user);
        public void UpdateUserProjects(User user);
    }
}
