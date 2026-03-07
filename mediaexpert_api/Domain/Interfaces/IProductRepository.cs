using mediaexpert_api.Domain.Entities;
using mediaexpert_api.Application.Common.Models;

namespace mediaexpert_api.Domain.Interfaces
{
    public interface IProductRepository
    {
        PagedResult<Product> GetProducts(int pageNumber, int pageSize);
        Product Add(Product product);
        bool IsCodeTaken(string code);
    }
}
