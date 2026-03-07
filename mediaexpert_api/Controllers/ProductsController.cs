using MediatR;
using mediaexpert_api.Application.Products.Commands;
using mediaexpert_api.Application.Products.Queries;
using mediaexpert_api.Application.Common.Models;
using mediaexpert_api.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace mediaexpert_api.Controllers
{
    public class ProductsController : ApiController
    {
        public ProductsController(IMediator mediator) : base(mediator) {}

        [HttpGet(Name = "GetProducts")]
        public async Task<ActionResult<PagedResult<Product>>> GetProducts([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var result = await Mediator.Send(new GetProductsQuery(page, pageSize));
            return Ok(result);
        }

        [HttpPost(Name = "AddProduct")]
        public async Task<ActionResult<Product>> AddProduct([FromBody] Product product)
        {
            var command = new AddProductCommand(product.Code, product.Name, product.Price);
            var addedProduct = await Mediator.Send(command);
            return CreatedAtAction(nameof(GetProducts), new { id = addedProduct.Id }, addedProduct);
        }
    }
}
