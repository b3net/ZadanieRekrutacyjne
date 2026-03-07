using System.Collections.Concurrent;
using mediaexpert_api.Domain.Entities;
using mediaexpert_api.Domain.Interfaces;
using mediaexpert_api.Domain.Common;
using mediaexpert_api.Application.Common.Models;
using mediaexpert_api.Infrastructure.Data;

namespace mediaexpert_api.Infrastructure.Repositories
{
    public class ProductInMemoryRepository : IProductRepository
    {
        private readonly ConcurrentDictionary<int, Product> _products = new();
        private int _nextId = 1;

        public ProductInMemoryRepository()
        {
            var initialProducts = MockData.GetInitialProducts();
            foreach(var product in initialProducts)
            {
                _products.TryAdd(product.Id, product);
            }
            _nextId = (initialProducts.Any() ? initialProducts.Max(p => p.Id) : 0) + 1;
        }

        public PagedResult<Product> GetProducts(int pageNumber, int pageSize)
        {
            var allProducts = _products.Values.OrderByDescending(p => p.Id);
            var count = allProducts.Count();
            
            int totalPages = (int)Math.Ceiling(count / (double)pageSize);
            if (pageNumber > totalPages && count > 0)
            {
                pageNumber = 1;
            }

            var items = allProducts
                          .Skip((pageNumber - 1) * pageSize)
                          .Take(pageSize)
                          .ToList();

            return new PagedResult<Product>
            {
                Items = items,
                TotalCount = count,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        public bool IsCodeTaken(string code)
        {
            return _products.Values.Any(p => string.Equals(p.Code, code, StringComparison.OrdinalIgnoreCase));
        }

        public Product Add(Product product)
        {
            if (IsCodeTaken(product.Code))
            {
                throw new InvalidOperationException(ErrorKeys.PRODUCT_CODE_EXISTS);
            }

            product.Id = Interlocked.Increment(ref _nextId);
            _products.TryAdd(product.Id, product);
            return product;
        }
    }
}
