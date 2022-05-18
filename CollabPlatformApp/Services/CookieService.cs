using CollabPlatformApp.Repositories;

namespace CollabPlatformApp.Services
{
    public class CookieService : ICookieService
    {
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CookieService(IUserRepository userRepository, 
            IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public void CheckCookie(string userId)
        {
            var user = _userRepository.GetUserById(userId);
            Dictionary<string, string> cookies = user.Cookies;
            foreach(var cookie in cookies)
            {
                _httpContextAccessor.HttpContext.Response.Cookies.Append(cookie.Key, cookie.Value);
            }
        }
    }
}
