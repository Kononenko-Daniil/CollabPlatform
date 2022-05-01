using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;

namespace CollabPlatformApp.Services
{
    public interface IContributorService
    {
        public IEnumerable<Contributor> GetContributors(string projectId);
        public void AddContributor(ContributorDto contributor);
        public void DeleteContributor(ContributorDto contributor);
        public bool ContributorIsExisted(ContributorDto contributor);
    }
}
