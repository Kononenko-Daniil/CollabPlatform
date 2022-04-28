using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using CollabPlatformApp.Repositories;
using MongoDB.Driver;

namespace CollabPlatformApp.Services
{
    public class LinkService : ILinkService
    {
        private readonly IProjectRepository _projectRepository;

        public LinkService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public IEnumerable<Link> GetProjectLinks(string projectId)
        {
            Project project = _projectRepository.GetProjectById(projectId);
            List<Link> links = project.Links;

            return links;
        }

        public void CreateLink(LinkDto link)
        {
            string linkId = GenerateKey();
            string projectId = link.ProjectId;
            Link result = new Link()
            {
                Id = linkId,
                ProjectId = projectId,
                Name = link.Name,
                Url = link.Url
            };
            Project project = _projectRepository.GetProjectById(projectId);
            project.Links.Add(result);
            _projectRepository.UpdateProject(project);
        }

        public void DeleteLink(string projectId, string linkId)
        {
            Project project = _projectRepository.GetProjectById(projectId);
            Link linkToRemove = project.Links.FirstOrDefault(x => x.Id == linkId);
            project.Links.Remove(linkToRemove);
            _projectRepository.UpdateProject(project);
        }

        public string GenerateKey()
        {
            string result = Guid.NewGuid().ToString("N");

            return result;
        }
    }
}
