using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Services;
using CollabPlatformApp.Validators;
using CollabPlatformApp.RequestErrors;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/users")]
    public class UserController : ControllerBase
    {
        IUserService _userService;
        UserValidator _userValidator;
        public UserController(IUserService userService, UserValidator userValidator)
        {
            _userService = userService;
            _userValidator = userValidator;
        }

        [HttpGet("get-users")]
        public IEnumerable<User> GetUsers()
        {
            return _userService.GetUsers();
        }

        [HttpPost("create-user")]
        public ActionResult<UserSignUpError> CreteUser(UserDto user)
        {
            var userValidationResult = _userValidator.Validate(user);
            if (!userValidationResult.IsValid)
            {
                UserSignUpError error = new UserSignUpError()
                {
                    ErrorType = userValidationResult.Errors.First().PropertyName,
                    ErrorMessage = userValidationResult.Errors.First().ErrorMessage
                };

                return BadRequest(error);
            }
            _userService.CreateUser(user);

            return Ok();
        }
    }
}
