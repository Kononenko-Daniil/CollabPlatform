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
        public UserService(IOptions<CollabPlatformDatabaseSettings> collabPlatformDatabaseSettings)
        {
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

        public string GenerateKey()
        {
            string result = Guid.NewGuid().ToString("N");

            return result;
        }
    }
}
