using Microsoft.AspNetCore.Mvc;
using Pos.Api.DTOs.Requests;
using Pos.Api.DTOs.Responses;
using Pos.Api.Models;
using Pos.Api.Services;

namespace Pos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PosController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public PosController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("products")]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _orderService.GetProductsAsync();
            return Ok(products);
        }

        [HttpPost("orders")]
        public async Task<ActionResult<OrderResponseDto>> CreateOrder(CreateOrderRequestDto dto)
        {
            var createdOrder = await _orderService.CreateOrderAsync(dto);
            return CreatedAtAction(nameof(GetOrders), createdOrder);
        }

        [HttpGet("orders")]
        public async Task<ActionResult<List<OrderResponseDto>>> GetOrders()
        {
            var orders = await _orderService.GetOrdersAsync();
            return Ok(orders);
        }
    }
}
