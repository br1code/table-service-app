using TableService.DTOs;

namespace TableService.Services
{
    public interface INotificationsService
    {
        Task CreateNotification(NewTableNotificationDTO notification);
        Task<IEnumerable<TableNotificationDTO>> GetNotifications(int restaurantId);
    }
}
