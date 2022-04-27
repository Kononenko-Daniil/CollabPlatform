using CollabPlatformApp.Database;
using CollabPlatformApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CollabPlatformApp.Repositories
{
    public class UserRepository : MongoCollectionInit, IUserRepository
    {
        public UserRepository(IOptions<CollabPlatformDatabaseSettings> collabPlatformDatabaseSettings) :
            base(collabPlatformDatabaseSettings)
        { }

        public IEnumerable<User> GetUsers()
        {
            var result = _usersCollection.Find(_ => true).ToList();

            return result;
        }

        public User GetUserById(string userId)
        {
            var users = GetUsers();
            var result = users.FirstOrDefault(x => x.Id == userId);

            return result;
        }

        public User GetUserByEmail(string email)
        {
            var users = GetUsers();
            var result = users.FirstOrDefault(x => x.Email == email);

            return result;
        }

        public void CreateUser(User user)
        {
            _usersCollection.InsertOne(user);
        }

        public void UpdateUserProjects(string userId, User user)
        {
            _usersCollection.ReplaceOne(x => x.Id == userId, user);
        }
    }
}
