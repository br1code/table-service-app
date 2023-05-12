namespace TableService.DTOs
{
    public class NewTableNotificationDTO
    {
        public int RestaurantId { get; set; }
        public int TableId { get; set; }
        public string Message { get; set; }
    }
}
