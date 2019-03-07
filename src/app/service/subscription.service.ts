import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {KeyValue} from '../model/KeyValue';

@Injectable()
export class SubscriptionService {
  private url = 'http://54.38.189.20:8080/subscription';
  // private url = 'http://localhost:9090';
  constructor(private http: HttpClient) { }

  getCart(cartId: number) {
    return this.http.get<KeyValue>(this.url + '/cart/' + cartId);
  }
  getCustomer(customerId: number) {
    return this.http.get<KeyValue>(this.url + '/customer/' + customerId);
  }

  createSubscription(token: string) {
    return this.http.post<string>(this.url + '/subscription/create', token);
  }
}
