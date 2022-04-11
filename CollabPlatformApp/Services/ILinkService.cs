using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;

namespace CollabPlatformApp.Services
{
    public interface ILinkService
    {
        public IEnumerable<Link> GetProjectLinks(string projectId);

        public void CreateLink(LinkDto link);

        public void DeleteLink(string projectId, string linkId);
    }
}
