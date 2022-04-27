using CollabPlatformApp.Database;
using CollabPlatformApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CollabPlatformApp.Repositories
{
    public class TaskRepository : MongoCollectionInit, ITaskRepository
    {
        public TaskRepository(IOptions<CollabPlatformDatabaseSettings> collabPlatformDatabaseSettings) :
            base(collabPlatformDatabaseSettings)
        { }

        public void CreateTask(string projectId, Project project)
        {
            _projectsCollection.ReplaceOne(x => x.Id == projectId, project);
        }

        public void DeleteTask(string projectId, Project project)
        {
            _projectsCollection.ReplaceOne(x => x.Id == projectId, project);
        }
    }
}
