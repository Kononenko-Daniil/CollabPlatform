using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Repositories;
using CollabPlatformApp.RequestErrors;
using CollabPlatformApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/contributors")]
    public class ContributorController : BaseController
    {
        private readonly IContributorService _contributorService;
        private readonly IUserRepository _userRepository;

        public ContributorController(IContributorService contributorService, 
            IUserRepository userRepository)
        {
            _contributorService = contributorService;
            _userRepository = userRepository;
        }

        [Authorize]
        [HttpGet("get-project-contributors")]
        public IEnumerable<Contributor> GetProjectContributors(string projectId)
        {
            var contributors = _contributorService.GetContributors(projectId);

            return contributors;
        }

        [Authorize]
        [HttpPost("add-contributor")]
        public ActionResult<BaseRequestError> AddContributor(ContributorDto contributor)
        {
            if(_userRepository.GetUserByName(contributor.Name) == null)
            {
                BaseRequestError error = new BaseRequestError()
                {
                    ErrorType = "ContributorName",
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

        [Authorize]
        [HttpDelete("delete-contributor")]
        public void DeleteContributor(ContributorDto contributor)
        {
            var userId = GetUserId();
            if (!_contributorService.IsDeletingYourself(userId, contributor))
                _contributorService.DeleteContributor(contributor);
        }
    }
}
