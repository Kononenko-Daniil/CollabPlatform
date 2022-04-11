using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/links")]
    public class LinkController : ControllerBase
    {
        ILinkService _linkService;
        public LinkController(ILinkService linkService)
        {
            _linkService = linkService;
        }

        [HttpGet("get-project-links")]
        public IEnumerable<Link> GetProjectLinks(string projectId)
        {
            var result = _linkService.GetProjectLinks(projectId);

            return result;
        }

        [HttpPost("create-link")]
        public void CreateLink(LinkDto link)
        {
            _linkService.CreateLink(link);
        }

        [HttpDelete("delete-link")]
        public void DeleteLink(string projectId, string linkId)
        {
            _linkService.DeleteLink(projectId, linkId);
        }
    }
}
