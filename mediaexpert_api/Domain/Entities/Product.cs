namespace mediaexpert_api.Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public decimal Price { get; set; }
    }
}
