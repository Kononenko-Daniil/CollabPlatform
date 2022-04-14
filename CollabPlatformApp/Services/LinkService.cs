using CollabPlatformApp.Database;
using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CollabPlatformApp.Services
{
    public class LinkService : ILinkService
    {
        private readonly IMongoCollection<Project> _projectsCollection;
        public LinkService(IOptions<CollabPlatformDatabaseSettings> collabPlatformDatabaseSettings)
        {
            var mongoClient = new MongoClient(collabPlatformDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(collabPlatformDatabaseSettings.Value.DatabaseName);
            _projectsCollection = mongoDatabase.GetCollection<Project>(
                collabPlatformDatabaseSettings.Value.ProjectsCollectionName);
        }

        public IEnumerable<Link> GetProjectLinks(string projectId)
        {
            Project project = GetProjectById(projectId);
            List<Link> links = project.Links;

            return links;
        }

        public void CreateLink(LinkDto link)
        {
            string linkId = GenerateKey();
            string projectId = link.ProjectId;
            Link result = new Link()
            {
                Id = linkId,
                ProjectId = projectId,
                Name = link.Name,
                Url = link.Url
            };
            Project project = GetProjectById(projectId);
            project.Links.Add(result);
            _projectsCollection.ReplaceOne(x => x.Id == projectId, project);
        }

        public void DeleteLink(string projectId, string linkId)
        {
            Project project = GetProjectById(projectId);
            Link linkToRemove = project.Links.FirstOrDefault(x => x.Id == linkId);
            project.Links.Remove(linkToRemove);
            _projectsCollection.ReplaceOne(x => x.Id == projectId, project);
        }

        public Project GetProjectById(string projectId)
        {
            var projects = _projectsCollection.Find(_ => true).ToList();
            Project result = projects.FirstOrDefault(x => x.Id == projectId);

            return result;
        }

        public string GenerateKey()
        {
            string result = Guid.NewGuid().ToString("N");

            return result;
        }
    }
}
