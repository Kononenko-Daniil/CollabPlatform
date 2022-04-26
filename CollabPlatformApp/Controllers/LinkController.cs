using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/links")]
    public class LinkController : ControllerBase
    {
        private readonly ILinkService _linkService;

        public LinkController(ILinkService linkService)
        {
            _linkService = linkService;
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
        public void CreateLink(LinkDto link)
        {
            _linkService.CreateLink(link);
        }

        [Authorize]
        [HttpDelete("delete-link")]
        public void DeleteLink(string projectId, string linkId)
        {
            _linkService.DeleteLink(projectId, linkId);
        }
    }
}
