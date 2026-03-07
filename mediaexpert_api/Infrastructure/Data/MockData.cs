using mediaexpert_api.Domain.Entities;

namespace mediaexpert_api.Infrastructure.Data
{
    public static class MockData
    {
        public static List<Product> GetInitialProducts()
        {
            return new List<Product>
            {
                new Product { Id = 1, Code = "P001", Name = "Laptop Dell", Price = 3500.50m },
                new Product { Id = 2, Code = "P002", Name = "Myszka Logitech", Price = 120.00m },
                new Product { Id = 3, Code = "P003", Name = "Klawiatura mechaniczna", Price = 450.00m },
                new Product { Id = 4, Code = "P004", Name = "Monitor LG 27'", Price = 1200.00m },
                new Product { Id = 5, Code = "P005", Name = "Słuchawki Sony", Price = 800.00m }
            };
        }
    }
}
