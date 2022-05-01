using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Services;
using CollabPlatformApp.Validators;
using CollabPlatformApp.RequestErrors;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserValidator _userValidator;

        public UserController(IUserService userService, 
            UserValidator userValidator)
        {
            _userService = userService;
            _userValidator = userValidator;
        }

        [HttpGet("get-users")]
        public IEnumerable<User> GetUsers()
        {
            var result = _userService.GetUsers();

            return result;
        }

        [HttpGet("get-user-by-id")]
        public User GetUserById(string userId)
        {
            var result = _userService.GetUserById(userId);

            return result;
        }

        [HttpPost("create-user")]
        public ActionResult<BaseRequestError> CreteUser(UserSignUpDto user)
        {
            var userValidationResult = _userValidator.Validate(user);

            if (!userValidationResult.IsValid)
            {
                BaseRequestError error = new BaseRequestError()
                {
                    ErrorType = userValidationResult.Errors.First().PropertyName,
                    ErrorMessage = userValidationResult.Errors.First().ErrorMessage
                };

                return BadRequest(error);
            }
            if (_userService.EmailIsExisting(user.Email))
            {
                BaseRequestError error = new BaseRequestError()
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
        public ActionResult<BaseRequestError> SignIn(UserSignInDto user)
        {
            if (!_userService.AccountIsExisting(user.Email, user.Password)) 
            {
                BaseRequestError error = new BaseRequestError()
                {
                    ErrorType = "SignIn",
                    ErrorMessage = Constants.AccountNotExistErrorMessage
                };

                return BadRequest(error);
            }
            var userId = _userService.SignIn(user);
            Authenticate(userId);

            return Ok();
        }

        [HttpPost("log-out")]
        public async void LogOut()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        private async void Authenticate(string userId)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userId)
            };
            ClaimsIdentity id = new ClaimsIdentity(claims, 
                "ApplicationCookie", 
                ClaimsIdentity.DefaultNameClaimType, 
                ClaimsIdentity.DefaultRoleClaimType);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, 
                new ClaimsPrincipal(id));
        }
    }
}
