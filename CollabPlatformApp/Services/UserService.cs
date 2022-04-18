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

        public User GetUserById(string userId)
        {
            var result = GetUsers().FirstOrDefault(x => x.Id == userId);

            return result;
        }

        public void CreateUser(UserSignUpDto user)
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

        public void SignIn(UserSignInDto user)
        {
            var userId = GetUsers().FirstOrDefault(x => x.Email == user.Email).Id;

            _httpContextAccessor.HttpContext.Response.Cookies.Append("userId", userId);
        }

        public bool EmailIsExisting(string email)
        {
            User result = GetUsers().FirstOrDefault(x => x.Email == email);
            if(result != null)
                return true;
            return false;
        }

        public bool AccountIsExisting(string email, string password)
        {
            if (EmailIsExisting(email))
            {
                User user = _usersCollection.Find(_ => true).ToList().FirstOrDefault(x => x.Email == email);
                if(user.Password == password)
                {
                    return true;
                }
                return false;
            }
            return false;
        }

        public string GenerateKey()
        {
            string result = Guid.NewGuid().ToString("N");

            return result;
        }
    }
}
