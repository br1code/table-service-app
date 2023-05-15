using TableService.Data.Entities;

namespace TableService.Data
{
    public static class DatabaseInitializer
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<TableServiceDbContext>();

                context.Database.EnsureCreated();

                if (context.Restaurants.Any() || context.RestaurantTables.Any() || context.TableNotifications.Any())
                {
                    return;
                }

                var restaurant = new Restaurant
                {
                    Name = "Bonafide",
                    Address = "Calle 123",
                    PhoneNumber = "1234567890",
                    Enabled = true
                };

                var table = new RestaurantTable
                {
                    TableName = "1",
                    Enabled = true
                };

                var notification = new TableNotification
                {
                    Message = "quiero una coca",
                    CreatedAt = DateTime.Now.ToUniversalTime()
                };

                table.TableNotifications = new List<TableNotification> { notification };
                restaurant.RestaurantTables = new List<RestaurantTable> { table };

                context.Restaurants.Add(restaurant);
                context.SaveChanges();
            }
        }
    }
}
