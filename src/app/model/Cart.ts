import {Product} from './Product';

export class Cart {
  id: number;
  idCustomer: number;
  totalTtc: String;
  products: Product[] = [];
}
