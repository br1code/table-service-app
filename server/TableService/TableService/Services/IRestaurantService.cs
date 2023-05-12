using TableService.DTOs;

namespace TableService.Services
{
    public interface IRestaurantService
    {
        Task<RestaurantDTO> GetRestaurant(int restaurantId);
        Task<RestaurantTableDTO> GetTable(int restaurantId, int tableId);
    }
}
