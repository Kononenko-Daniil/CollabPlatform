namespace CollabPlatformApp.Models
{
    public class User
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public List<string>? Projects { get; set; }
    }
}
