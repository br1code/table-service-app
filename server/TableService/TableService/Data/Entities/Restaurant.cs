using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TableService.Data.Entities
{
    [Table("restaurant")]
    public class Restaurant
    {
        [Key]
        public int RestaurantId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public bool Enabled { get; set; }
        public ICollection<RestaurantTable> RestaurantTables { get; set; }
    }
}
