using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TableService.Data.Entities
{
    [Table("restaurant-table")]
    public class RestaurantTable
    {
        [Key]
        public int TableId { get; set; }
        [ForeignKey("Restaurant")]
        public int RestaurantId { get; set; }
        public int TableNumber { get; set; }
        public bool Enabled { get; set; }
        public Restaurant Restaurant { get; set; }
        public ICollection<TableNotification> TableNotifications { get; set; }
    }
}
