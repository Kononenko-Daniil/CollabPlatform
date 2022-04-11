using CollabPlatformApp.Models;

namespace CollabPlatformApp.Services
{
    public interface IUserService
    {
        public IEnumerable<User> GetUsers();

        public void CreateUser(User user);
    }
}
