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

        public void InsertProject(Project project)
        {
            _projectsCollection.InsertOne(project);
        }

        public void UpdateProject(Project project)
        {
            _projectsCollection.ReplaceOne(x => x.Id == project.Id, project);
        }

        public void DeleteProject(string projectId)
        {
            _projectsCollection.DeleteOne(x => x.Id == projectId);
        }
    }
}
