import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {KeyValue} from '../model/KeyValue';

@Injectable()
export class SubscriptionService {
  private url = 'http://localhost:9090/cart';
  constructor(private http: HttpClient) { }

  getCart(cartId: number) {
    return this.http.get<KeyValue>(this.url + '/' + cartId);
  }
  test() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }
}
