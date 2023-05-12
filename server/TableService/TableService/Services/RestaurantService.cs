using Microsoft.EntityFrameworkCore;
using TableService.Data;
using TableService.DTOs;
using TableService.Exceptions;

namespace TableService.Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly TableServiceDbContext _context;

        public RestaurantService(TableServiceDbContext context)
        {
            _context = context;
        }

        public async Task<RestaurantDTO> GetRestaurant(int restaurantId)
        {
            var restaurant = await _context.Restaurants
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.RestaurantId == restaurantId && r.Enabled);

            if (restaurant == null)
            {
                throw new EntityNotFoundException($"Restaurant with id {restaurantId} not found.");
            }

            return new RestaurantDTO
            {
                RestaurantId = restaurant.RestaurantId,
                RestaurantName = restaurant.Name
            };
        }

        public async Task<RestaurantTableDTO> GetTable(int restaurantId, int tableId)
        {
            var table = await _context.RestaurantTables
                .AsNoTracking()
                .Include(t => t.Restaurant)
                .FirstOrDefaultAsync(t =>
                    t.RestaurantId == restaurantId &&
                    t.Restaurant.Enabled &&
                    t.TableId == tableId &&
                    t.Enabled);

            if (table == null)
            {
                throw new EntityNotFoundException($"Table with id {tableId} not found.");
            }

            return new RestaurantTableDTO
            {
                RestaurantId = table.RestaurantId,
                RestaurantName = table.Restaurant.Name,
                TableId = table.TableId,
                TableNumber = table.TableNumber
            };
        }
    }
}
