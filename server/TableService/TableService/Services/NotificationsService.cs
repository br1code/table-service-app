using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using TableService.Data;
using TableService.Data.Entities;
using TableService.DTOs;
using TableService.Exceptions;

namespace TableService.Services
{
    public class NotificationsService : INotificationsService
    {
        // TODO: make configurable by restaurant
        private const string DEFAULT_NOTIFICATION_MESSAGE = "La mesa {0} necesita atención,";

        private readonly TableServiceDbContext _context;

        public NotificationsService(TableServiceDbContext context)
        {
            _context = context;
        }

        public async Task CreateNotification(NewTableNotificationDTO newNotification)
        {
            var restaurant = await _context.Restaurants.FirstOrDefaultAsync(r => r.RestaurantId == newNotification.RestaurantId);

            if (restaurant == null)
            {
                throw new EntityNotFoundException($"Restaurant with id {newNotification.RestaurantId} not found.");
            }

            var table = await _context.RestaurantTables.FirstOrDefaultAsync(t => t.TableId == newNotification.TableId);

            if (table == null)
            {
                throw new EntityNotFoundException($"Table with id {newNotification.TableId} not found.");
            }

            var notification = new TableNotification
            {
                RestaurantTable = table,
                TableId = table.TableId,
                Message = GetNotificationMessage(newNotification.Message, table.TableName),
                CreatedAt = DateTime.Now.ToUniversalTime(),
            };

            await _context.TableNotifications.AddAsync(notification);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TableNotificationDTO>> GetNotifications(int restaurantId)
        {
            var tableNotifications = await _context.TableNotifications
                .AsNoTracking()
                .Include(t => t.RestaurantTable)
                .Where(t => t.RestaurantTable.RestaurantId == restaurantId)
                .ToListAsync();

            return tableNotifications.Select(t => new TableNotificationDTO
            {
                NotificationId = t.NotificationId,
                TableId = t.TableId,
                TableName = t.RestaurantTable.TableName,
                Message = t.Message,
                CreatedAt = t.CreatedAt
            });
        }

        private string GetNotificationMessage(string message, string tableName)
        {
            return string.IsNullOrEmpty(message) ? string.Format(DEFAULT_NOTIFICATION_MESSAGE, tableName) : message;
        }
    }
}
