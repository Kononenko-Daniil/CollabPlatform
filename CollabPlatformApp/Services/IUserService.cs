using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;

namespace CollabPlatformApp.Services
{
    public interface IUserService
    {
        public IEnumerable<User> GetUsers();
        public User GetUserById(string userId);
        public string GetUserIdByEmail(string email);

        public void CreateUser(UserSignUpDto user);
        public string SignIn(UserSignInDto user);
        public void SetCookie(Cookie cookie, string userId);
        public void ChangeUserDescription(UserDescriptionDto userDescription, string userId);

        public bool UsernameIsExisting(string userName);
        public bool EmailIsExisting(string email);
        public bool AccountIsExisting(string email, string password);
    }
}
