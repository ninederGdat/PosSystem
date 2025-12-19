using Pos.Api.DTOs.Requests;
using Pos.Api.DTOs.Responses;
using Pos.Api.Models;

namespace Pos.Api.Services
{
    public interface IOrderService
    {
        Task<List<Product>> GetProductsAsync();
        Task<OrderResponseDto> CreateOrderAsync(CreateOrderRequestDto request);
        Task<List<OrderResponseDto>> GetOrdersAsync();
    }
}
