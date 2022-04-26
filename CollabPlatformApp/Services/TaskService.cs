using CollabPlatformApp.Database;
using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CollabPlatformApp.Services
{
    public class TaskService : ITaskService
    {
        private readonly IMongoCollection<Project> _projectsCollection;

        public TaskService(IOptions<CollabPlatformDatabaseSettings> collabPlatformDatabaseSettings)
        {
            var mongoClient = new MongoClient(collabPlatformDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(collabPlatformDatabaseSettings.Value.DatabaseName);
            _projectsCollection = mongoDatabase.GetCollection<Project>(
                collabPlatformDatabaseSettings.Value.ProjectsCollectionName);
        }

        public IEnumerable<Models.Task> GetProjectTasks(string projectId)
        {
            Project project = GetProjectById(projectId);
            List<Models.Task> tasks = project.Tasks;

            return tasks;
        }

        public void CreateTask(TaskDto task)
        {
            string taskId = GenerateKey();
            string projectId = task.ProjectId;
            Models.Task result = new Models.Task()
            {
                Id = taskId,
                ProjectId = projectId,
                Text = task.Text,
            };
            Project project = GetProjectById(projectId);
            project.Tasks.Add(result);
            _projectsCollection.ReplaceOne(x => x.Id == projectId, project);
        }

        public void DeleteTask(string projectId, string taskId)
        {
            Project project = GetProjectById(projectId);
            Models.Task taskToRemove = project.Tasks.FirstOrDefault(x => x.Id == taskId);
            project.Tasks.Remove(taskToRemove);
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
