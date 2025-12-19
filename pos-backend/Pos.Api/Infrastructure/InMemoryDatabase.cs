using Pos.Api.Models;

namespace Pos.Api.Infrastructure
{
    public class InMemoryDatabase
    {
        private static List<Product> _products = new();
        private static List<Order> _orders = new();
        private static int _nextOrderId = 1;

        public static InMemoryDatabase Instance { get; } = new InMemoryDatabase();

        public void SeedData()
        {
            _products.AddRange(new List<Product>
            {
                 new Product { Id = 1, Name = "Keyboard", Price = 500_000 },
                 new Product { Id = 2, Name = "Mouse", Price = 300_000 },
                 new Product { Id = 3, Name = "Monitor", Price = 3_000_000 },
                 new Product { Id = 4, Name = "Headphone", Price = 1_200_000 },
                 new Product { Id = 5, Name = "Webcam", Price = 800_000 },
                 new Product { Id = 6, Name = "USB Hub", Price = 150_000 }
            });
        }

        public List<Product> GetProducts()
        {
            return _products;
        }

        public List<Order> GetOrders()
        {
            return _orders
            .OrderByDescending(o => o.CreatedAt)
            .ToList();
        }

        public void AddOrder(Order order)
        {
            order.Id = _nextOrderId++;
            order.OrderCode = $"ORD{order.Id:0000}";
            order.CreatedAt = DateTime.UtcNow;
            _orders.Add(order);
        }
    }
}
