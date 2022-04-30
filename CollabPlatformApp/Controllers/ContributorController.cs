using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Repositories;
using CollabPlatformApp.RequestErrors;
using CollabPlatformApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/project-contributors")]
    public class ContributorController : ControllerBase
    {
        private readonly IContributorService _contributorService;
        private readonly IUserRepository _userRepository;

        public ContributorController(IContributorService contributorService, 
            IUserRepository userRepository)
        {
            _contributorService = contributorService;
            _userRepository = userRepository;
        }

        [HttpGet("get-project-contributors")]
        public IEnumerable<User> GetProjectContributors()
        {
            return new List<User>();
        }

        [HttpPost("add-contributor")]
        public ActionResult<BaseRequestError> AddContributor(ContributorDto contributor)
        {
            if(_userRepository.GetUserByEmail(contributor.Email) == null)
            {
                BaseRequestError error = new BaseRequestError()
                {
                    ErrorType = "ContributorEmail",
                    ErrorMessage = Constants.AccountNotExistErrorMessage
                };

                return BadRequest(error);
            }
            if(_contributorService.ContributorIsExisted(contributor))
            {
                BaseRequestError error = new BaseRequestError()
                {
                    ErrorType = "ContributorIsExisted",
                    ErrorMessage = Constants.ContributorIsExisted
                };

                return BadRequest(error);
            }
            _contributorService.AddContributor(contributor);

            return Ok();
        }

        [HttpDelete("delete-contributor")]
        public void DeleteContributor(string userId, string porjectId)
        { }
    }
}
