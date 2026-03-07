using FluentValidation;
using mediaexpert_api.Domain.Interfaces;
using mediaexpert_api.Domain.Common;

namespace mediaexpert_api.Application.Products.Commands
{
    public class AddProductCommandValidator : AbstractValidator<AddProductCommand>
    {
        private readonly IProductRepository _repository;

        public AddProductCommandValidator(IProductRepository repository)
        {
            _repository = repository;

            RuleFor(x => x.Code)
                .NotEmpty().WithMessage("Code is required")
                .Matches(@"^[a-zA-Z0-9]+$").WithMessage("Code must contain only letters and numbers without spaces or special characters")
                .Must(code => !_repository.IsCodeTaken(code)).WithMessage("Product code already exists")
                .WithState(x => ErrorKeys.PRODUCT_CODE_EXISTS);

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required");

            RuleFor(x => x.Price)
                .GreaterThanOrEqualTo(0).WithMessage("Price must be greater than or equal to zero")
                .Must(x => decimal.Round(x, 2) == x).WithMessage("Price can have at most two decimal places");
        }
    }
}
