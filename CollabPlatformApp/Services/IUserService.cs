using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;

namespace CollabPlatformApp.Services
{
    public interface IUserService
    {
        public IEnumerable<User> GetUsers();
        public bool CheckDoubleEmail(string email);
        public void CreateUser(UserDto user);
    }
}
