using Microsoft.AspNetCore.Mvc;
using TableService.DTOs;
using TableService.Services;

namespace TableService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationsService _notificationsService;

        public NotificationsController(INotificationsService notificationsService)
        {
            _notificationsService = notificationsService;
        }

        [HttpGet("{restaurantId}")]
        public async Task<ActionResult<IEnumerable<TableNotificationDTO>>> GetNotifications(int restaurantId)
        {
            if (restaurantId == 0)
            {
                return BadRequest();
            }

            var tableNotifications = await _notificationsService.GetNotifications(restaurantId);
            return Ok(tableNotifications);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTableNotification([FromBody] NewTableNotificationDTO newNotification)
        {
            if (newNotification == null || newNotification.RestaurantId == 0 || newNotification.TableId == 0)
            {
                return BadRequest();
            }

            await _notificationsService.CreateNotification(newNotification);
            return Ok();
        }
    }
}
