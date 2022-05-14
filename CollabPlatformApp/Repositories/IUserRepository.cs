using CollabPlatformApp.Models;

namespace CollabPlatformApp.Repositories
{
    public interface IUserRepository
    {
        public IEnumerable<User> GetUsers();
        public User GetUserById(string userId);
        public User GetUserByName(string userName);
        public User GetUserByEmail(string email);
        public void CreateUser(User user);
        public void UpdateUser(User user);
    }
}
