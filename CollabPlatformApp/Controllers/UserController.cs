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

        [HttpGet("get-user-by-id")]
        public User GetUserById(string userId)
        {
            return _userService.GetUserById(userId);
        }

        [HttpPost("create-user")]
        public ActionResult<UserError> CreteUser(UserSignUpDto user)
        {
            var userValidationResult = _userValidator.Validate(user);
            if (!userValidationResult.IsValid)
            {
                UserError error = new UserError()
                {
                    ErrorType = userValidationResult.Errors.First().PropertyName,
                    ErrorMessage = userValidationResult.Errors.First().ErrorMessage
                };

                return BadRequest(error);
            }
            if (_userService.EmailIsExisting(user.Email))
            {
                UserError error = new UserError()
                {
                    ErrorType = "Email",
                    ErrorMessage = Constants.DoubleEmailMessage
                };
                return BadRequest(error);
            }
            _userService.CreateUser(user);
            
            return Ok();
        }

        [HttpPost("sign-in")]
        public ActionResult<UserError> SignIn(UserSignInDto user)
        {
            if (!_userService.AccountIsExisting(user.Email, user.Password)) 
            {
                UserError error = new UserError()
                {
                    ErrorType = "SignIn",
                    ErrorMessage = Constants.SignInErrorMessage
                };
                return BadRequest(error);
            }
            _userService.SignIn(user);
            return Ok();
        }
    }
}
