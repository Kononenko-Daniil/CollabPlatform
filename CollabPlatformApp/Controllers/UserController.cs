using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Services;
using CollabPlatformApp.Validators;
using CollabPlatformApp.RequestErrors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/users")]
    public class UserController : BaseController
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

        [HttpGet("get-user-id-by-email")]
        public string GetUserIdByEmail(string email)
        {
            var result = _userService.GetUserIdByEmail(email);

            return result;
        }

        [Authorize]
        [HttpGet("is-current-user")]
        public bool IsCurrentUser(string userId)
        {
            var currentUserId = GetUserId();
            if(currentUserId == userId)
                return true;
            return false;
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
            if (_userService.UsernameIsExisting(user.Username))
            {
                BaseRequestError error = new BaseRequestError()
                {
                    ErrorType = "Username",
                    ErrorMessage = Constants.DoubleUsernameMessage
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
            Cookie cookie = new Cookie()
            {
                Key = "user_name",
                Value = _userService.GetUserById(userId).Name
            };
            _userService.SetCookie(cookie, userId);
            cookie = new Cookie()
            {
                Key = "log_in",
                Value = "yes"
            };
            _userService.SetCookie(cookie, userId);
            Authenticate(userId);

            return Ok();
        }

        [Authorize]
        [HttpPost("log-out")]
        public async void LogOut()
        {
            Cookie cookie = new Cookie()
            {
                Key = "log_in",
                Value = "no"
            };
            _userService.SetCookie(cookie, GetUserId());
            cookie = new Cookie()
            {
                Key = "user_name",
                Value = ""
            };
            _userService.SetCookie(cookie, GetUserId());

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
