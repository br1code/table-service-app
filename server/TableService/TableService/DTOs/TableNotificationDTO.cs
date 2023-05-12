namespace TableService.DTOs
{
    public class TableNotificationDTO
    {
        public int NotificationId { get; set; }
        public int TableId { get; set; }
        public string TableName { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Message { get; set; }
    }
}
