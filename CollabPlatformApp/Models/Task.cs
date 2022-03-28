using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CollabPlatformApp.Models
{
    public class Task
    {
        [BsonId]
        public string? Id { get; set; }
        public string? ProjectId { get; set; }
        public string? Text { get; set; }
        public string? CreatingTime { get; set; }
        public string? Deadline { get; set; }
    }
}
