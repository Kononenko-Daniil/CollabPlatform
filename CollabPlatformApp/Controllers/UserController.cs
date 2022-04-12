using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/users")]
    public class UserController : ControllerBase
    {
        IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("get-users")]
        public IEnumerable<User> GetUsers()
        {
            return _userService.GetUsers();
        }

        [HttpPost("create-user")]
        public void CreteUser(UserDto user)
        {
            _userService.CreateUser(user);
        }
    }
}
