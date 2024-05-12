
import { Product } from '../../features/products/models/products.model';

export interface ProductState {
  productData: Product[] | null;
  productDetail: Product | null;
}
