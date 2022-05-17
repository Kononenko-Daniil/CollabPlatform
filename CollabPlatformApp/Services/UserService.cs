using CollabPlatformApp.Database;
using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using CollabPlatformApp.Repositories;

namespace CollabPlatformApp.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(IUserRepository userRepository, 
            IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public IEnumerable<User> GetUsers()
        {
            var result = _userRepository.GetUsers();

            return result;
        }

        public User GetUserById(string userId)
        {
            var result = _userRepository.GetUserById(userId);

            return result;
        }

        public string GetUserIdByEmail(string email)
        {
            var user = _userRepository.GetUserByEmail(email);
            var result = user.Id;

            return result;
        }

        public void CreateUser(UserSignUpDto user)
        {
            string userId = GenerateKey();
            User result = new User()
            {
                Id = userId,
                Name = user.Username,
                Email = user.Email,
                Password = user.Password,
                Projects = new List<string>(),
                Cookies = new Dictionary<string, string>()
            };

            _userRepository.CreateUser(result);
        }

        public string SignIn(UserSignInDto user)
        {
            var _user = _userRepository.GetUserByEmail(user.Email);
            var userId = _user.Id;

            return userId;
        }

        public void SetCookie(Cookie cookie, string userId)
        {
            _httpContextAccessor.HttpContext.Response.Cookies.Append(cookie.Key, cookie.Value);

            var user = _userRepository.GetUserById(userId);
            var cookies = user.Cookies;
            cookies[cookie.Key] = cookie.Value;
            _userRepository.UpdateUser(user);
        }

        public bool UsernameIsExisting(string userName)
        {
            User result = _userRepository.GetUserByName(userName);
            if (result != null)
                return true;

            return false;
        }

        public bool EmailIsExisting(string email)
        {
            User result = _userRepository.GetUserByEmail(email);
            if(result != null)
                return true;

            return false;
        }

        public bool AccountIsExisting(string email, string password)
        {
            if (EmailIsExisting(email))
            {
                User user = _userRepository.GetUserByEmail(email);
                if(user.Password == password)
                {
                    return true;
                }

                return false;
            }

            return false;
        }

        public string GenerateKey()
        {
            string result = Guid.NewGuid().ToString("N");

            return result;
        }
    }
}
