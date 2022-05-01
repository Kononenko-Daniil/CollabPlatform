using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CollabPlatformApp.Models
{
    public class Project
    {
        [BsonId]
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Author { get; set; }
        public List<Task>? Tasks { get; set; }
        public List<Link>? Links { get; set; }
        public List<Contributor>? Contributors { get; set; }
    }
}
