using CollabPlatformApp.Contexts;
using CollabPlatformApp.Database;
using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Security.Claims;

namespace CollabPlatformApp.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IMongoCollection<Project> _projectsCollection;
        private readonly IMongoCollection<User> _usersCollection;
        public ProjectService(IOptions<CollabPlatformDatabaseSettings> collabPlatformDatabaseSettings)
        {
            var mongoClient = new MongoClient(collabPlatformDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(collabPlatformDatabaseSettings.Value.DatabaseName);
            _projectsCollection = mongoDatabase.GetCollection<Project>(
                collabPlatformDatabaseSettings.Value.ProjectsCollectionName);
            _usersCollection = mongoDatabase.GetCollection<User>(
                collabPlatformDatabaseSettings.Value.UsersCollectionName);
        }

        public IEnumerable<Project> GetProjects(string userId)
        {
            var user = _usersCollection.Find(_ => true).ToList().FirstOrDefault(x => x.Id == userId);
            var projects = _projectsCollection.Find(_ => true).ToList();
            var projectIds = user.Projects;
            List<Project> result = new List<Project>();
            foreach (var projectId in projectIds)
            {
                var project = projects.FirstOrDefault(x => x.Id == projectId);
                result.Add(project);
            }

            return result;
        }

        public Project GetProjectById(string projectId, string userId)
        {
            var projects = GetProjects(userId);
            Project result = projects.FirstOrDefault(x => x.Id == projectId);

            return result;
        }

        public string CreateProject(ProjectDto project, string userId)
        {
            var user = _usersCollection.Find(_ => true).ToList().FirstOrDefault(x => x.Id == userId);
            string projectId = GenerateKey();
            user.Projects.Add(projectId);
            _usersCollection.ReplaceOne(x => x.Id == userId, user);

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

        public void DeleteProject(string projectId, string userId)
        {
            _projectsCollection.DeleteOne(x => x.Id == projectId);

            var user = _usersCollection.Find(_ => true).ToList().FirstOrDefault(x => x.Id == userId);
            var project = user.Projects.FirstOrDefault(x => x == projectId);
            user.Projects.Remove(project);
            _usersCollection.ReplaceOne(x => x.Id == userId, user);
        }

        public string GenerateKey()
        {
            string result = Guid.NewGuid().ToString("N");

            return result;
        }
    }
}
