using CollabPlatformApp.Dtos;

namespace CollabPlatformApp.Services
{
    public interface IContributorService
    {
        public void AddContributor(ContributorDto contributor);
        public bool ContributorIsExisted(ContributorDto contributor);
    }
}
