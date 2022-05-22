using CollabPlatformApp.Models;
using CollabPlatformApp.Repositories;

namespace CollabPlatformApp.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUserRepository _userRepository;

        public AccountService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Account GetAccount(string userName)
        {
            var user = _userRepository.GetUserByName(userName);
            Account result = new Account()
            {
                Name = user.Name,
                ProjectNum = user.Projects.Count(),
                Bio = user.Bio,
                PublicEmail = user.PublicEmail,
                Company = user.Company,
                Location = user.Location,
                Website = user.Website
            };

            return result;
        }
    }
}
