using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;

namespace CollabPlatformApp.Services
{
    public interface IUserService
    {
        public IEnumerable<User> GetUsers();
        public User GetUserById(string userId);

        public void CreateUser(UserSignUpDto user);
        public string SignIn(UserSignInDto user);

        public bool EmailIsExisting(string email);
        public bool AccountIsExisting(string email, string password);
    }
}
