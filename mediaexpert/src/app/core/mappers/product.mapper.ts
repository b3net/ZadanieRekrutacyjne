import { ProductApiModel, ProductViewModel } from '../models/product.models';

export function mapToProductViewModel(apiModel: ProductApiModel): ProductViewModel {
  return {
    id: apiModel.id,
    code: apiModel.code,
    name: apiModel.name,
    price: apiModel.price
  };
}

export function mapToProductApiModel(viewModel: Partial<ProductViewModel>): Partial<ProductApiModel> {
  return {
    id: viewModel.id,
    code: viewModel.code,
    name: viewModel.name,
    price: viewModel.price
  };
}
