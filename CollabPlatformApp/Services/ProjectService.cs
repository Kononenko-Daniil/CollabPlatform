using CollabPlatformApp.Contexts;
using CollabPlatformApp.Database;
using CollabPlatformApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CollabPlatformApp.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IMongoCollection<Project> _projectsCollection;
        public ProjectService(IOptions<ProjectsDatabaseSettings> projectsDatabaseSettings)
        {
            var mongoClient = new MongoClient(projectsDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(projectsDatabaseSettings.Value.DatabaseName);
            _projectsCollection = mongoDatabase.GetCollection<Project>(
                projectsDatabaseSettings.Value.ProjectsCollectionName);
        }

        public IEnumerable<Project> GetProjects()
        {
            var result = _projectsCollection.Find(_ => true).ToList();

            return result;
        }

        public void PostProject(Project project)
        {
            _projectsCollection.InsertOne(project);
        }
    }
}
