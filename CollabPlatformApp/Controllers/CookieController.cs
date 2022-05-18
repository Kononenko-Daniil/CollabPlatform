using CollabPlatformApp.RequestErrors;
using CollabPlatformApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace CollabPlatformApp.Controllers
{
    [ApiController]
    [Route("/cookie")]
    public class CookieController  : BaseController
    {
        private readonly ICookieService _cookieService;

        public CookieController(ICookieService cookieService)
        {
            _cookieService = cookieService;
        }

        [HttpGet("check-cookies")]
        public ActionResult<BaseRequestError> CheckCookies()
        {
            var userId = GetUserId();
            if(userId == null)
            {
                BaseRequestError error = new BaseRequestError()
                {
                    ErrorType = "Unsigned",
                    ErrorMessage = ""
                };

                return BadRequest(error);
            }
            _cookieService.CheckCookie(userId);

            return Ok();
        }
    }
}
