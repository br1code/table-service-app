using Microsoft.AspNetCore.Mvc;
using TableService.DTOs;
using TableService.Exceptions;
using TableService.Services;

namespace TableService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        private readonly IRestaurantService _restaurantService;

        public RestaurantsController(IRestaurantService restaurantService)
        {
            _restaurantService = restaurantService;
        }

        [HttpGet("{restaurantId}")]
        public async Task<ActionResult<RestaurantDTO>> GetRestaurant(int restaurantId)
        {
            if (restaurantId == 0)
            {
                return BadRequest();
            }

            try
            {
                var restaurant = await _restaurantService.GetRestaurant(restaurantId);
                return Ok(restaurant);
            }
            catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{restaurantId}/table/{tableId}")]
        public async Task<ActionResult<RestaurantTableDTO>> GetTable(int restaurantId, int tableId)
        {
            if (restaurantId == 0 || tableId == 0)
            {
                return BadRequest();
            }

            try
            {
                var table = await _restaurantService.GetTable(restaurantId, tableId);
                return Ok(table);
            }
            catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }


    }
}
