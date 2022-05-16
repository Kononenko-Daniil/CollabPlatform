using Microsoft.AspNetCore.Mvc;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected string GetUserId()
        {
            var userId = User.Identity.Name;

            return userId;
        }

        protected void SetCookie(string key, string value)
        {
            HttpContext.Response.Cookies.Append(key, value);
        }
    }
}
