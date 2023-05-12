using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TableService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        [HttpGet("{restaurantId}")]
        public async Task<IActionResult> GetNotifications(int restaurantId)
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateNotification(/* TODO: From Body */)
        {
            /* Get from body
             { 
                "restaurant_id": "", 
                "table_id": "", 
                "message": ""
            }
             */
            return Ok();
        }
    }
}
