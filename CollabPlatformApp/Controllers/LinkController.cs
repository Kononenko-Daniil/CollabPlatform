using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CollabPlatformApp.Validators;
using CollabPlatformApp.RequestErrors;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/links")]
    public class LinkController : ControllerBase
    {
        private readonly ILinkService _linkService;
        private readonly LinkValidator _linkValidator;

        public LinkController(ILinkService linkService, 
            LinkValidator linkValidator)
        {
            _linkService = linkService;
            _linkValidator = linkValidator;
        }

        [Authorize]
        [HttpGet("get-project-links")]
        public IEnumerable<Link> GetProjectLinks(string projectId)
        {
            var result = _linkService.GetProjectLinks(projectId);

            return result;
        }

        [Authorize]
        [HttpPost("create-link")]
        public ActionResult<BaseRequestError> CreateLink(LinkDto link)
        {
            var linkValidationResult = _linkValidator.Validate(link);
            if (!linkValidationResult.IsValid)
            {
                BaseRequestError error = new BaseRequestError()
                {
                    ErrorType = linkValidationResult.Errors.First().PropertyName,
                    ErrorMessage = linkValidationResult.Errors.First().ErrorMessage
                };

                return BadRequest(error);
            }

            _linkService.CreateLink(link);

            return Ok();
        }

        [Authorize]
        [HttpDelete("delete-link")]
        public void DeleteLink(string projectId, string linkId)
        {
            _linkService.DeleteLink(projectId, linkId);
        }
    }
}
