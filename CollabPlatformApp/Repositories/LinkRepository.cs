using CollabPlatformApp.Database;
using CollabPlatformApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CollabPlatformApp.Repositories
{
    public class LinkRepository : MongoCollectionInit, ILinkRepository
    {
        public LinkRepository(IOptions<CollabPlatformDatabaseSettings> collabPlatformDatabaseSettings) :
            base(collabPlatformDatabaseSettings)
        { }

        public Project GetProjectById(string projectId)
        {
            var projects = _projectsCollection.Find(_ => true).ToList();
            Project result = projects.FirstOrDefault(x => x.Id == projectId);

            return result;
        }

        public void CreateLink(string projectId, Project project)
        {
            _projectsCollection.ReplaceOne(x => x.Id == projectId, project);
        }

        public void DeleteLink(string projectId, Project project)
        {
            _projectsCollection.ReplaceOne(x => x.Id == projectId, project);
        }
    }
}
