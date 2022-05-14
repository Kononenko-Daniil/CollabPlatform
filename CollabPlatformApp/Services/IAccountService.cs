using CollabPlatformApp.Models;

namespace CollabPlatformApp.Services
{
    public interface IAccountService
    {
        public Account GetAccount(string userName);
    }
}
