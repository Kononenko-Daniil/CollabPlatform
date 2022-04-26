﻿using CollabPlatformApp.Database;
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

        public Project GetProjectById(string projectId)
        {
            var projects = _projectsCollection.Find(_ => true).ToList();
            Project result = projects.FirstOrDefault(x => x.Id == projectId);

            return result;
        }

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