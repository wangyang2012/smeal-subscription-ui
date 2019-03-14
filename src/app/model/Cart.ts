import {Product} from './Product';

export class Cart {
  id: number;
  idCustomer: number;
  products: Product[] = [];
}
