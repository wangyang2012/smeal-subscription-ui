import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/Customer';
import {Cart} from '../model/Cart';
import {Subscription} from '../model/Subscription';

@Injectable()
export class SubscriptionService {
  private url = 'http://54.38.189.20:8080/subscription';
  // private url = 'http://localhost:9090';
  constructor(private http: HttpClient) { }

  getCart(cartId: number) {
    return this.http.get<Cart>(this.url + '/cart/' + cartId);
  }
  getCustomer(customerId: number, customerToken: string) {
    return this.http.put<Customer>(this.url + '/customer/' + customerId, customerToken);
  }

  createSubscription(sub: Subscription) {
    return this.http.post<string>(this.url + '/subscription/create', sub);
  }
}
