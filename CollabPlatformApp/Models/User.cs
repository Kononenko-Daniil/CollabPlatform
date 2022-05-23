namespace CollabPlatformApp.Models
{
    public class User
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Bio { get; set; }
        public string? PublicEmail { get; set; }
        public string? Company { get; set; }
        public string? Location { get; set; }
        public string? Website { get; set; }
        public List<string>? Projects { get; set; }
        public Dictionary<string, string>? Cookies { get; set; }
    }
}
