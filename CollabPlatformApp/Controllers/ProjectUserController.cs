using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Repositories;
using CollabPlatformApp.RequestErrors;
using CollabPlatformApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/project-users")]
    public class ProjectUserController : ControllerBase
    {
        private readonly IProjectUserService _projectUserService;
        private readonly IUserRepository _userRepository;

        public ProjectUserController(IProjectUserService projectUserService, 
            IUserRepository userRepository)
        {
            _projectUserService = projectUserService;
            _userRepository = userRepository;
        }

        [HttpGet("get-project-users")]
        public IEnumerable<User> GetProjectUsers()
        {
            return new List<User>();
        }

        [HttpPost("add-user")]
        public ActionResult<BaseRequestError> AddUser(ProjectUserDto user)
        {
            if(_userRepository.GetUserByEmail(user.Email) == null)
            {
                BaseRequestError error = new BaseRequestError()
                {
                    ErrorType = "ProjectUserEmail",
                    ErrorMessage = Constants.AccountNotExistErrorMessage
                };

                return BadRequest(error);
            }
            _projectUserService.AddUser(user);

            return Ok();
        }

        [HttpDelete("delete-user-from-project")]
        public void DeleteUser(string userId, string porjectId)
        { }
    }
}
