using CollabPlatformApp.Database;
using CollabPlatformApp.Dtos;
using CollabPlatformApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CollabPlatformApp.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _usersCollection;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(IOptions<CollabPlatformDatabaseSettings> collabPlatformDatabaseSettings, 
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            var mongoClient = new MongoClient(collabPlatformDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(collabPlatformDatabaseSettings.Value.DatabaseName);
            _usersCollection = mongoDatabase.GetCollection<User>(
                collabPlatformDatabaseSettings.Value.UsersCollectionName);
        }

        public IEnumerable<User> GetUsers()
        {
            var result = _usersCollection.Find(_ => true).ToList();

            return result;
        }

        public void CreateUser(UserDto user)
        {
            string userId = GenerateKey();
            User result = new User()
            {
                Id = userId,
                Name = user.Username,
                Email = user.Email,
                Password = user.Password,
                Projects = new List<string>()
            };
            _usersCollection.InsertOne(result);
            
        }

        public bool CheckDoubleEmail(string email)
        {
            User result = _usersCollection.Find(_ => true).ToList().FirstOrDefault(x => x.Email == email);
            if(result != null)
                return false;
            return true;
        }

        public string GenerateKey()
        {
            string result = Guid.NewGuid().ToString("N");

            return result;
        }
    }
}
