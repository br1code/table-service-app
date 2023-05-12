using Microsoft.EntityFrameworkCore;
using TableService.Data.Entities;

namespace TableService.Data
{
    public class TableServiceDbContext : DbContext
    {
        public TableServiceDbContext(DbContextOptions<TableServiceDbContext> options) : base(options)
        {
        }

        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<RestaurantTable> RestaurantTables { get; set; }
        public DbSet<TableNotification> TableNotifications { get; set; }
    }
}
