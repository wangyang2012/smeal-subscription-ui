import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SubscriptionService {
  private url = 'http://54.38.189.20:8080/subscription/cart';
  constructor(private http: HttpClient) { }

  getCart(cartId: number) {
    return this.http.get<string>(this.url + '/' + cartId);
  }
}
