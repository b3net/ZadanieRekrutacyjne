using MediatR;
using FluentValidation;
using mediaexpert_api.Application.Common.Models;
using mediaexpert_api.Domain.Entities;
using mediaexpert_api.Domain.Interfaces;

namespace mediaexpert_api.Application.Products.Queries
{
    public record GetProductsQuery : IRequest<PagedResult<Product>>
    {
        public int PageNumber { get; init; }
        public int PageSize { get; init; }

        public GetProductsQuery(int pageNumber, int pageSize)
        {
            PageNumber = pageNumber < 1 ? 1 : pageNumber;
            PageSize = pageSize < 1 ? 10 : (pageSize > 100 ? 100 : pageSize);
        }
    }

    public class GetProductsQueryValidator : AbstractValidator<GetProductsQuery>
    {
        public GetProductsQueryValidator()
        {
            RuleFor(x => x.PageNumber).GreaterThanOrEqualTo(1);
            RuleFor(x => x.PageSize).InclusiveBetween(1, 100);
        }
    }

    public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, PagedResult<Product>>
    {
        private readonly IProductRepository _repository;

        public GetProductsQueryHandler(IProductRepository repository)
        {
            _repository = repository;
        }

        public Task<PagedResult<Product>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
            var result = _repository.GetProducts(request.PageNumber, request.PageSize);
            return Task.FromResult(result);
        }
    }
}
