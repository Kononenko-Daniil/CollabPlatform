using CollabPlatformApp.Contexts;
using CollabPlatformApp.Database;
using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CollabPlatformApp.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IMongoCollection<Project> _projectsCollection;
        public ProjectService(IOptions<CollabPlatformDatabaseSettings> collabPlatformDatabaseSettings)
        {
            var mongoClient = new MongoClient(collabPlatformDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(collabPlatformDatabaseSettings.Value.DatabaseName);
            _projectsCollection = mongoDatabase.GetCollection<Project>(
                collabPlatformDatabaseSettings.Value.ProjectsCollectionName);
        }

        public IEnumerable<Project> GetProjects()
        {
            var result = _projectsCollection.Find(_ => true).ToList();

            return result;
        }

        public Project GetProjectById(string projectId)
        {
            var projects = GetProjects();
            Project result = projects.FirstOrDefault(x => x.Id == projectId);

            return result;
        }

        public string CreateProject(ProjectDto project)
        {
            string projectId = GenerateKey();

            Project result = new Project()
            {
                Id = projectId,
                Name = project.Name,
                Author = "admin",
                Tasks = new List<Models.Task>(),
                Links = new List<Link>()
            };

            _projectsCollection.InsertOne(result);

            return projectId;
        }

        public void DeleteProject(string projectId)
        {
            _projectsCollection.DeleteOne(x => x.Id == projectId);
        }

        public string GenerateKey()
        {
            string result = Guid.NewGuid().ToString("N");

            return result;
        }
    }
}
