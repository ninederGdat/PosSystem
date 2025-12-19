using Microsoft.AspNetCore.SignalR;
using Pos.Api.DTOs.Requests;
using Pos.Api.DTOs.Responses;
using Pos.Api.Hubs;
using Pos.Api.Infrastructure;
using Pos.Api.Models;

namespace Pos.Api.Services
{
    public class OrderService : IOrderService
    {
        private readonly InMemoryDatabase _db;
        private readonly IHubContext<OrderHub> _hubContext;
        public OrderService(InMemoryDatabase db,
            IHubContext<OrderHub> hubContext
            )
        {
            _db = db;
            _hubContext = hubContext;
        }

        public async Task<OrderResponseDto> CreateOrderAsync(CreateOrderRequestDto request)
        {
            if (request.Items == null || !request.Items.Any())
                throw new BadHttpRequestException("Giỏ hàng không được rỗng");

            var products = _db.GetProducts();

            var orderItems = new List<OrderItem>();
            decimal totalAmount = 0;

            foreach (var item in request.Items)
            {
                if (item.Quantity <= 0)
                    throw new BadHttpRequestException("Số lượng sản phẩm phải lớn hơn 0");

                var product = products.FirstOrDefault(p => p.Id == item.ProductId);

                if (product == null)
                    throw new BadHttpRequestException($"Không tìm thấy sản phẩm với Id = {item.ProductId}");

                var orderItem = new OrderItem
                {
                    ProductId = product.Id,
                    ProductName = product.Name,
                    Price = product.Price,
                    Quantity = item.Quantity
                };

                totalAmount += orderItem.Price * orderItem.Quantity;

                orderItems.Add(orderItem);
            }

            var order = new Order
            {
                Items = orderItems,
                TotalAmount = totalAmount

            };

            _db.AddOrder(order);



            var response = new OrderResponseDto
            {
                OrderCode = order.OrderCode,
                TotalAmount = order.TotalAmount,
                CreatedAt = order.CreatedAt,
                Items = order.Items.Select(i => new OrderItemResponseDto
                {
                    ProductName = i.ProductName,
                    Price = i.Price,
                    Quantity = i.Quantity
                }).ToList()
            };

            await _hubContext.Clients.All.SendAsync("ReceiveNewOrder", response);

            return response;
        }


        public Task<List<Product>> GetProductsAsync()
        {
            return Task.FromResult(_db.GetProducts());
        }

        public async Task<List<OrderResponseDto>> GetOrdersAsync()
        {
            var orders = _db.GetOrders();

            var response = orders.Select(o => new OrderResponseDto
            {
                OrderCode = o.OrderCode,
                TotalAmount = o.TotalAmount,
                CreatedAt = o.CreatedAt,
                Items = o.Items.Select(i => new OrderItemResponseDto
                {
                    ProductName = i.ProductName,
                    Price = i.Price,
                    Quantity = i.Quantity
                }).ToList()
            }).ToList();

            return response;
        }
    }
}
