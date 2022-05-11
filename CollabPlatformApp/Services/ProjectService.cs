﻿using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Repositories;
using MongoDB.Driver;

namespace CollabPlatformApp.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IUserRepository _userRepository;

        public ProjectService(IProjectRepository projectRepository, 
            IUserRepository userRepository)
        {
            _projectRepository = projectRepository;
            _userRepository = userRepository;
        }

        public IEnumerable<Project> GetProjects(string userId)
        {
            var user = _userRepository.GetUserById(userId);
            var projects = _projectRepository.GetProjects();
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
            var user = _userRepository.GetUserById(userId);
            string projectId = GenerateKey();
            user.Projects.Add(projectId);
            _userRepository.UpdateUserProjects(user);

            Project result = new Project()
            {
                Id = projectId,
                Name = project.Name,
                Author = "admin",
                Tasks = new List<Models.Task>(),
                Links = new List<Link>(),
                Contributors = new List<Contributor>()
            };
            Contributor contributor = new Contributor()
            {
                Name = user.Name,
                Email = user.Email
            };
            result.Contributors.Add(contributor);
            _projectRepository.InsertProject(result);

            return projectId;
        }

        public void DeleteProject(string projectId)
        {
            var project = _projectRepository.GetProjectById(projectId);
            foreach(var contributor in project.Contributors)
            {
                var user = _userRepository.GetUserByEmail(contributor.Email);
                var _project = user.Projects.FirstOrDefault(x => x == projectId);
                user.Projects.Remove(_project);
                _userRepository.UpdateUserProjects(user);
            }

            _projectRepository.DeleteProject(projectId);
        }

        public string GenerateKey()
        {
            string result = Guid.NewGuid().ToString("N");

            return result;
        }
    }
}
