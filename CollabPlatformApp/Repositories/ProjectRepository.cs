using CollabPlatformApp.Database;
using CollabPlatformApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CollabPlatformApp.Repositories
{
    public class ProjectRepository : MongoCollectionInit, IProjectRepository
    {
        public ProjectRepository(IOptions<CollabPlatformDatabaseSettings> collabPlatformDatabaseSettings) :
            base(collabPlatformDatabaseSettings)
        { }

        public IEnumerable<User> GetUsers()
        {
            var result = _usersCollection.Find(_ => true).ToList();

            return result;
        }

        public User GetUser(string userId)
        {
            var result = GetUsers().FirstOrDefault(x => x.Id == userId);

            return result;
        }

        public void UpdateUserProjects(string userId, User user)
        {
            _usersCollection.ReplaceOne(x => x.Id == userId, user);
        }

        public IEnumerable<Project> GetProjects()
        {
            var result = _projectsCollection.Find(_ => true).ToList();

            return result;
        }

        public void InsertProject(Project project)
        {
            _projectsCollection.InsertOne(project);
        }

        public void DeleteProject(string projectId)
        {
            _projectsCollection.DeleteOne(x => x.Id == projectId);
        }
    }
}
