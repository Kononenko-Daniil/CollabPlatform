using CollabPlatformApp.Database;
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

        public void CreateUser(User user)
        {
            string userId = GenerateKey();
            user.Id = userId;
            user.Projects.Clear();
            _usersCollection.InsertOne(user);
        }

        public string GenerateKey()
        {
            string result = Guid.NewGuid().ToString("N");

            return result;
        }
    }
}
