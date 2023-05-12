using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TableService.Data.Entities
{
    [Table("table-notification")]
    public class TableNotification
    {
        [Key]
        public int NotificationId { get; set; }
        [ForeignKey("RestaurantTable")]
        public int TableId { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Viewed { get; set; }
        public RestaurantTable RestaurantTable { get; set; }
    }
}
