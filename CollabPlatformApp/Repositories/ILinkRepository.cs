using CollabPlatformApp.Models;

namespace CollabPlatformApp.Repositories
{
    public interface ILinkRepository
    {
        public void CreateLink(string projectId, Project project);
        public void DeleteLink(string projectId, Project project);
    }
}
