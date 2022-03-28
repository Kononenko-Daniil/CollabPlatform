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

        public IEnumerable<Models.Task> GetProjectTasks(string projectId)
        {
            Project project = GetProjectById(projectId);
            List<Models.Task> tasks = project.Tasks;

            return tasks;
        }

        public void CreateProject(Project project)
        {
            string projectId = GenerateKey();
            project.Id = projectId;
            _projectsCollection.InsertOne(project);
        }

        public void CreateTask(string projectId, Models.Task task)
        {
            task.Id = GenerateKey();
            task.ProjectId = projectId;
            task.CreatingTime = DateTime.Now.ToString();
            Project project = GetProjectById(projectId);
            project.Tasks.Add(task);
            _projectsCollection.ReplaceOne(x => x.Id == projectId, project);
        }

        public void DeleteProject(string projectId)
        {
            _projectsCollection.DeleteOne(x => x.Id == projectId);
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
            var projects = GetProjects();
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
