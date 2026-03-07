using MediatR;
using mediaexpert_api.Domain.Entities;
using mediaexpert_api.Domain.Interfaces;

namespace mediaexpert_api.Application.Products.Commands
{
    public record AddProductCommand(string Code, string Name, decimal Price) : IRequest<Product>;

    public class AddProductCommandHandler : IRequestHandler<AddProductCommand, Product>
    {
        private readonly IProductRepository _repository;

        public AddProductCommandHandler(IProductRepository repository)
        {
            _repository = repository;
        }

        public Task<Product> Handle(AddProductCommand request, CancellationToken cancellationToken)
        {
            var product = new Product
            {
                Code = request.Code,
                Name = request.Name,
                Price = request.Price
            };

            var addedProduct = _repository.Add(product);
            return Task.FromResult(addedProduct);
        }
    }
}
